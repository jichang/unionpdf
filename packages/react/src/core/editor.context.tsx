import { PdfPageObject } from '@unionpdf/models';
import React, { ReactNode, useCallback, useContext, useState } from 'react';

export enum EditorTool {
  Selection,
  Pencil,
  AddTextBox,
  AddImage,
  AddSignature,
}

export interface Operation {
  action: 'create' | 'update' | 'remove';
  id: number;
  pageIndex: number;
}

export interface PdfEditorStacks {
  undo: Operation[];
  redo: Operation[];
  committed: Operation[];
}

export interface PdfEditorContextVale {
  tool: EditorTool;
  setTool: (tool: EditorTool) => void;
  stacks: PdfEditorStacks;
  exec: (operation: Operation) => void;
  undo: () => void;
  redo: () => void;
  commit: () => void;
}

export const PdfEditorContext = React.createContext<PdfEditorContextVale>({
  tool: EditorTool.Selection,
  setTool: (tool: EditorTool) => {},
  stacks: {
    undo: [],
    redo: [],
    committed: [],
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
  const { children, ...rest } = props;

  const [tool, setTool] = useState(EditorTool.Selection);

  const [stacks, setStacks] = useState<PdfEditorStacks>({
    undo: [],
    redo: [],
    committed: [],
  });

  const exec = useCallback(
    (operation: Operation) => {
      setStacks((stacks) => {
        const { undo, redo, committed } = stacks;

        return {
          undo: [...undo, operation],
          redo,
          committed,
        };
      });
    },
    [setStacks]
  );

  const undo = useCallback(() => {
    setStacks((stacks) => {
      const { undo, redo, committed } = stacks;
      const operation = undo[undo.length - 1];

      return {
        undo: undo.slice(0, undo.length - 1),
        redo: [...redo, operation],
        committed,
      };
    });
  }, [setStacks]);

  const redo = useCallback(() => {
    setStacks((stacks) => {
      const { undo, redo, committed } = stacks;
      const operation = redo[redo.length - 1];

      return {
        undo: [...undo, operation],
        redo: redo.slice(0, redo.length - 1),
        committed,
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
      };
    });
  }, [setStacks]);

  return (
    <PdfEditorContext.Provider
      value={{
        tool,
        setTool,
        stacks,
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
