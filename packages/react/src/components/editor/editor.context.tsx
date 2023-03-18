import { PdfAnnotationObject, Position, Size } from '@unionpdf/models';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLogger, usePdfDocument, usePdfEngine } from '../../core';
import { PdfDragContextProvider } from './drag.context';

export const EDITOR_CONTEXT_LOG_SOURCE = 'PdfEditorContext';

export enum PdfEditorTool {
  Annotation,
  Extract,
  Stamp,
}

export enum PdfAnnotationTool {
  Selection,
  Pencil,
}

export type Operation =
  | {
      id: string;
      action: 'create' | 'remove';
      annotation: PdfAnnotationObject;
    }
  | {
      id: string;
      action: 'transform';
      annotation: PdfAnnotationObject;
      params: {
        offset: Position;
        scale: Size;
      };
    };

export interface PdfEditorStacks {
  undo: Operation[];
  redo: Operation[];
  pages: Record<string, Operation[]>;
}

export enum StackStatus {
  Empty,
  Pending,
}

export interface PdfEditorContextValue {
  tool: PdfEditorTool;
  setTool: (tool: PdfEditorTool) => void;
  annotationTool: PdfAnnotationTool;
  setAnnotationTool: (tool: PdfAnnotationTool) => void;
  queryStatus: () => StackStatus;
  queryByPageIndex: (pageIndex: number) => Operation[];
  exec: (operation: Operation) => void;
  replace: (operation: Operation) => void;
  undo: () => void;
  redo: () => void;
  commit: () => void;
}

export const PdfEditorContext = React.createContext<PdfEditorContextValue>({
  tool: PdfEditorTool.Annotation,
  setTool: (tool: PdfEditorTool) => {},
  annotationTool: PdfAnnotationTool.Selection,
  setAnnotationTool: (tool: PdfAnnotationTool) => {},
  queryStatus: () => {
    return StackStatus.Empty;
  },
  queryByPageIndex: (pageIndex: number) => {
    return [];
  },
  exec: (operation: Operation) => {},
  replace: (operation: Operation) => {},
  undo: () => {},
  redo: () => {},
  commit: () => {},
});

export interface PdfEditorContextProviderProps {
  children: ReactNode;
}

export function PdfEditorContextProvider(props: PdfEditorContextProviderProps) {
  const { children } = props;

  const logger = useLogger();
  const [tool, setTool] = useState(PdfEditorTool.Annotation);
  const [annotationTool, setAnnotationTool] = useState(
    PdfAnnotationTool.Selection
  );

  const [stacks, setStacks] = useState<PdfEditorStacks>({
    undo: [],
    redo: [],
    pages: {},
  });

  const queryStatus = useCallback(() => {
    if (stacks.undo.length === 0) {
      return StackStatus.Empty;
    } else {
      return StackStatus.Pending;
    }
  }, [stacks]);

  const queryByPageIndex = useCallback(
    (pageIndex: number) => {
      const pageStack = stacks.pages[pageIndex];
      if (!pageStack || pageStack.length === 0) {
        return [];
      }

      return pageStack;
    },
    [stacks]
  );

  const exec = useCallback(
    (operation: Operation) => {
      logger.debug(
        EDITOR_CONTEXT_LOG_SOURCE,
        'operation',
        'exec operation: ',
        operation
      );
      setStacks((stacks) => {
        const { annotation } = operation;
        const { undo, redo, pages } = stacks;
        const pageStack = pages[annotation.pageIndex] || [];

        return {
          undo: [...undo, operation],
          redo,
          pages: {
            ...pages,
            [annotation.pageIndex]: [...pageStack, operation],
          },
        };
      });
    },
    [logger, setStacks]
  );

  const replace = useCallback(
    (operation: Operation) => {
      logger.debug(
        EDITOR_CONTEXT_LOG_SOURCE,
        'operation',
        'replace operation: ',
        operation
      );
      setStacks((stacks) => {
        const { undo, redo, pages } = stacks;
        if (undo.length === 0) {
          return stacks;
        }

        const { annotation } = operation;
        const rest = undo.slice(0, undo.length - 1);
        const pageStack = pages[annotation.pageIndex];
        const pageStackRest = pageStack.slice(0, pageStack.length - 1);

        return {
          undo: [...rest, operation],
          redo,
          pages: {
            ...pages,
            [annotation.pageIndex]: [...pageStackRest, operation],
          },
        };
      });
    },
    [logger, setStacks]
  );

  const undo = useCallback(() => {
    setStacks((stacks) => {
      logger.debug(EDITOR_CONTEXT_LOG_SOURCE, 'operation', 'undo operation');
      const { undo, redo, pages } = stacks;

      if (undo.length === 0) {
        return stacks;
      }

      const operation = undo[undo.length - 1];
      const { annotation } = operation;
      const pageStack = pages[annotation.pageIndex] || [];

      return {
        undo: undo.slice(0, undo.length - 1),
        redo: [...redo, operation],
        pages: {
          ...pages,
          [annotation.pageIndex]: pageStack.filter((_operation) => {
            return _operation.id !== operation.id;
          }),
        },
      };
    });
  }, [logger, setStacks]);

  const redo = useCallback(() => {
    setStacks((stacks) => {
      logger.debug(EDITOR_CONTEXT_LOG_SOURCE, 'operation', 'redo operation');
      const { undo, redo, pages } = stacks;

      if (redo.length === 0) {
        return stacks;
      }

      const operation = redo[redo.length - 1];
      const { annotation } = operation;
      const pageStack = pages[annotation.pageIndex] || [];

      return {
        undo: [...undo, operation],
        redo: redo.slice(0, redo.length - 1),
        pages: {
          ...pages,
          [annotation.pageIndex]: [...pageStack, operation],
        },
      };
    });
  }, [logger, setStacks]);

  const engine = usePdfEngine();
  const doc = usePdfDocument();

  const commit = useCallback(() => {
    logger.debug(EDITOR_CONTEXT_LOG_SOURCE, 'operation', 'commit operation');
    const { undo } = stacks;

    if (undo.length === 0) {
      return;
    }

    const commitOperations = undo.reduce((operations, operation) => {
      let result: Operation[] = [];
      switch (operation.action) {
        case 'create':
          result = [...operations, operation];
          break;
        case 'remove':
          {
            const index = operations.findIndex((_operation) => {
              return _operation.annotation.id === operation.annotation.id;
            });
            if (index === -1) {
              result = [...operations, operation];
            } else {
              if (operations[index].action === 'create') {
                result = operations.filter((_operation) => {
                  return _operation.annotation.id !== operation.annotation.id;
                });
              } else {
                result = operations.filter((_operation) => {
                  return _operation.annotation.id === operation.annotation.id;
                });
                result.push(operation);
              }
            }
          }
          break;
        case 'transform':
          result = operations.map((_operation) => {
            if (operation.annotation.id !== operation.annotation.id) {
              return _operation;
            }

            let result = _operation;
            switch (_operation.action) {
              case 'create':
                result.annotation.rect = {
                  origin: {
                    x:
                      result.annotation.rect.origin.x +
                      operation.params.offset.x,
                    y:
                      result.annotation.rect.origin.y +
                      operation.params.offset.y,
                  },
                  size: {
                    width:
                      result.annotation.rect.size.width *
                      operation.params.scale.width,
                    height:
                      result.annotation.rect.size.height *
                      operation.params.scale.height,
                  },
                };
                break;
              case 'remove':
                break;
              case 'transform':
                result = {
                  ..._operation,
                  params: {
                    offset: {
                      x: _operation.params.offset.x + operation.params.offset.x,
                      y: _operation.params.offset.x + operation.params.offset.y,
                    },
                    scale: {
                      width:
                        _operation.params.scale.width *
                        operation.params.scale.width,
                      height:
                        _operation.params.scale.height *
                        operation.params.scale.height,
                    },
                  },
                };
                break;
            }

            return result;
          });
          break;
      }

      return result;
    }, [] as Operation[]);

    // engine.update(commitOperation);

    setStacks({
      undo: [],
      redo: [],
      pages: {},
    });
  }, [logger, stacks, engine, setStacks]);

  useEffect(() => {
    return () => {
      setStacks({
        undo: [],
        redo: [],
        pages: {},
      });
    };
  }, [doc]);

  return (
    <PdfEditorContext.Provider
      value={{
        tool,
        setTool,
        annotationTool,
        setAnnotationTool,
        queryStatus,
        queryByPageIndex,
        exec,
        replace,
        undo,
        redo,
        commit,
      }}
    >
      <PdfDragContextProvider>{children}</PdfDragContextProvider>
    </PdfEditorContext.Provider>
  );
}

export function usePdfEditor() {
  return useContext(PdfEditorContext);
}
