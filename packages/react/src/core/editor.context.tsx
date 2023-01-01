import React, { ReactNode, useContext } from 'react';

export interface Decoration {
  id: number;
}

export interface PdfEditorContextVale {
  decorations: Record<string, Decoration[]>;
  addDecoration: (decoration: Decoration) => void;
  removeDecoration: (decoration: Decoration) => void;
}

export const PdfEditorContext = React.createContext<PdfEditorContextVale>({
  decorations: {},
  addDecoration: () => {},
  removeDecoration: () => {},
});

export interface PdfEditorContextProviderProps extends PdfEditorContextVale {
  children: ReactNode;
}

export function PdfEditorContextProvider(props: PdfEditorContextProviderProps) {
  const { children, ...rest } = props;

  return (
    <PdfEditorContext.Provider value={rest}>
      {children}
    </PdfEditorContext.Provider>
  );
}

export function usePdfEditor() {
  return useContext(PdfEditorContext);
}
