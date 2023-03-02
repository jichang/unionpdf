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
  committed: Operation[];
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
    committed: [],
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
      logger.debug(EDITOR_CONTEXT_LOG_SOURCE, 'exec operation: ', operation);
      setStacks((stacks) => {
        const { annotation } = operation;
        const { undo, redo, committed, pages } = stacks;
        const pageStack = pages[annotation.pageIndex] || [];

        return {
          undo: [...undo, operation],
          redo,
          committed,
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
      logger.debug(EDITOR_CONTEXT_LOG_SOURCE, 'replace operation: ', operation);
      setStacks((stacks) => {
        const { undo, redo, committed, pages } = stacks;
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
          committed,
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
      logger.debug(EDITOR_CONTEXT_LOG_SOURCE, 'undo operation');
      const { undo, redo, committed, pages } = stacks;

      if (undo.length === 0) {
        return stacks;
      }

      const operation = undo[undo.length - 1];
      const { annotation } = operation;
      const pageStack = pages[annotation.pageIndex] || [];

      return {
        undo: undo.slice(0, undo.length - 1),
        redo: [...redo, operation],
        committed,
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
      logger.debug(EDITOR_CONTEXT_LOG_SOURCE, 'redo operation');
      const { undo, redo, committed, pages } = stacks;

      if (redo.length === 0) {
        return stacks;
      }

      const operation = redo[redo.length - 1];
      const { annotation } = operation;
      const pageStack = pages[annotation.pageIndex] || [];

      return {
        undo: [...undo, operation],
        redo: redo.slice(0, redo.length - 1),
        committed,
        pages: {
          ...pages,
          [annotation.pageIndex]: [...pageStack, operation],
        },
      };
    });
  }, [logger, setStacks]);

  const doc = usePdfDocument();

  const commit = useCallback(() => {
    logger.debug(EDITOR_CONTEXT_LOG_SOURCE, 'commit operation');
    setStacks((stacks) => {
      const { undo, committed } = stacks;

      if (undo.length === 0) {
        return stacks;
      }

      return {
        undo: [],
        redo: [],
        committed: [...committed, ...undo],
        pages: {},
      };
    });
  }, [logger, setStacks]);

  useEffect(() => {
    return () => {
      setStacks({
        undo: [],
        redo: [],
        committed: [],
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
