import { PdfDocumentObject } from '@unionpdf/models';
import React, { ReactNode, useContext } from 'react';

export const PdfDocumentContext = React.createContext<PdfDocumentObject | null>(
  null
);

export interface PdfDocumentContextProviderProps {
  doc: PdfDocumentObject;
  children: ReactNode;
}

export function PdfDocumentContextProvider(
  props: PdfDocumentContextProviderProps
) {
  const { children, doc } = props;

  return (
    <PdfDocumentContext.Provider value={doc}>
      {children}
    </PdfDocumentContext.Provider>
  );
}

export function usePdfDocument() {
  return useContext(PdfDocumentContext);
}
