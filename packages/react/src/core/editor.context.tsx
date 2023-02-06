import { PdfAnnotationObject } from '@unionpdf/models';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePdfDocument } from './document.context';

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

export interface PdfEditorStackEntry {
  id: string;
  pageIndex: number;
}

export interface PdfEditorStacks {
  undo: PdfEditorStackEntry[];
  redo: PdfEditorStackEntry[];
  committed: PdfEditorStackEntry[];
  operations: Record<string, Operation[]>;
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
    operations: {},
  });

  const query = useCallback(
    (pageIndex: number) => {
      return stacks.operations[pageIndex];
    },
    [stacks]
  );

  const exec = useCallback(
    (operation: Operation) => {
      setStacks((stacks) => {
        const { undo, redo, committed, operations } = stacks;
        const pageOperations = operations[operation.pageIndex] || [];

        return {
          undo: [...undo, { id: operation.id, pageIndex: operation.pageIndex }],
          redo,
          committed,
          operations: {
            ...operations,
            [operation.pageIndex]: [...pageOperations, operation],
          },
        };
      });
    },
    [setStacks]
  );

  const undo = useCallback(() => {
    setStacks((stacks) => {
      const { undo, redo, committed, operations } = stacks;
      const operation = undo[undo.length - 1];
      const pageOperations = operations[operation.pageIndex] || [];

      return {
        undo: undo.slice(0, undo.length - 1),
        redo: [...redo, operation],
        committed,
        operations: {
          ...operations,
          [operation.pageIndex]: pageOperations.filter((_operation) => {
            return _operation.id !== operation.id;
          }),
        },
      };
    });
  }, [setStacks]);

  const redo = useCallback(() => {
    setStacks((stacks) => {
      const { undo, redo, committed, operations } = stacks;
      const operation = redo[undo.length - 1];
      const pageOperations = operations[operation.pageIndex] || [];

      return {
        undo: [...undo, operation],
        redo: redo.slice(0, redo.length - 1),
        committed,
        operations: {
          ...operations,
          [operation.pageIndex]: [...pageOperations, operation],
        },
      };
    });
  }, [setStacks]);

  const commit = useCallback(() => {
    setStacks((stacks) => {
      const { undo, committed } = stacks;

      return {
        undo: [],
        redo: [],
        committed: [...committed, ...undo],
        operations: {},
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
        operations: {},
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
