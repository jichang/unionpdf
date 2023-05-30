import { PdfDocumentObject } from '@unionpdf/models';
import React, { ReactNode, useContext } from 'react';

export interface PdfDocumentContextValue {
  version: number;
  setVersion: (version: number) => void;
  doc: PdfDocumentObject | null;
}

export const PdfDocumentContext = React.createContext<PdfDocumentContextValue>({
  version: 0,
  setVersion: () => {},
  doc: null,
});

export interface PdfDocumentContextProviderProps {
  version: number;
  setVersion: (version: number) => void;
  doc: PdfDocumentObject;
  children: ReactNode;
}

export function PdfDocumentContextProvider(
  props: PdfDocumentContextProviderProps
) {
  const { children, ...rest } = props;

  return (
    <PdfDocumentContext.Provider value={rest}>
      {children}
    </PdfDocumentContext.Provider>
  );
}

export function usePdfDocument() {
  return useContext(PdfDocumentContext);
}
