import { PdfAnnotationObject } from '@unionpdf/models';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePdfDocument } from '../../core';

export enum EditorTool {
  Selection,
  Pencil,
  AddTextBox,
  AddImage,
  AddSignature,
}

export interface Operation {
  id: string;
  pageIndex: number;
  action: 'create' | 'update' | 'remove';
  annotation: PdfAnnotationObject;
}

export interface PdfEditorStacks {
  undo: Operation[];
  redo: Operation[];
  committed: Operation[];
  pages: Record<string, Operation[]>;
}

export interface PdfEditorContextVale {
  tool: EditorTool;
  setTool: (tool: EditorTool) => void;
  query: (pageIndex: number) => Operation[];
  exec: (operation: Operation) => void;
  undo: () => void;
  redo: () => void;
  commit: () => void;
}

export const PdfEditorContext = React.createContext<PdfEditorContextVale>({
  tool: EditorTool.Selection,
  setTool: (tool: EditorTool) => {},
  query: (pageIndex: number) => {
    return [];
  },
  exec: (operation: Operation) => {},
  undo: () => {},
  redo: () => {},
  commit: () => {},
});

export interface PdfEditorContextProviderProps {
  children: ReactNode;
}

export function PdfEditorContextProvider(props: PdfEditorContextProviderProps) {
  const { children } = props;

  const [tool, setTool] = useState(EditorTool.Selection);

  const [stacks, setStacks] = useState<PdfEditorStacks>({
    undo: [],
    redo: [],
    committed: [],
    pages: {},
  });

  const query = useCallback(
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
      setStacks((stacks) => {
        const { undo, redo, committed, pages } = stacks;
        const pageStack = pages[operation.pageIndex] || [];

        return {
          undo: [...undo, operation],
          redo,
          committed,
          pages: {
            ...pages,
            [operation.pageIndex]: [...pageStack, operation],
          },
        };
      });
    },
    [setStacks]
  );

  const undo = useCallback(() => {
    setStacks((stacks) => {
      const { undo, redo, committed, pages } = stacks;

      if (undo.length === 0) {
        return stacks;
      }

      const operation = undo[undo.length - 1];
      const pageStack = pages[operation.pageIndex] || [];

      return {
        undo: undo.slice(0, undo.length - 1),
        redo: [...redo, operation],
        committed,
        pages: {
          ...pages,
          [operation.pageIndex]: pageStack.filter((_operation) => {
            return _operation.id !== operation.id;
          }),
        },
      };
    });
  }, [setStacks]);

  const redo = useCallback(() => {
    setStacks((stacks) => {
      const { undo, redo, committed, pages } = stacks;

      if (redo.length === 0) {
        return stacks;
      }

      const operation = redo[redo.length - 1];
      const pageStack = pages[operation.pageIndex] || [];

      return {
        undo: [...undo, operation],
        redo: redo.slice(0, redo.length - 1),
        committed,
        pages: {
          ...pages,
          [operation.pageIndex]: [...pageStack, operation],
        },
      };
    });
  }, [setStacks]);

  const commit = useCallback(() => {
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
  }, [setStacks]);

  const doc = usePdfDocument();

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
        query,
        exec,
        undo,
        redo,
        commit,
      }}
    >
      {children}
    </PdfEditorContext.Provider>
  );
}

export function usePdfEditor() {
  return useContext(PdfEditorContext);
}
