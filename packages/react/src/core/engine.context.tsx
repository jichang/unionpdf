import React, { ReactNode, useContext } from 'react';
import { PdfEngine } from '@unionpdf/models';

export const PdfEngineContext = React.createContext<PdfEngine | null>(null);

export interface PdfEngineContextProviderProps {
  engine: PdfEngine;
  children: ReactNode;
}

export function PdfEngineContextProvider(props: PdfEngineContextProviderProps) {
  const { children, engine } = props;

  return (
    <PdfEngineContext.Provider value={engine}>
      {children}
    </PdfEngineContext.Provider>
  );
}

export function usePdfEngine() {
  return useContext(PdfEngineContext);
}
