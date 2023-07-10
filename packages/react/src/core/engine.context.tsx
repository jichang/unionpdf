import React, { ReactNode, useContext } from 'react';
import { PdfEngine } from '@unionpdf/models';

export const PdfEngineContext = React.createContext<PdfEngine | null>(null);

/**
 * Properties of PdfEngineContextProvider
 *
 * @public
 */
export interface PdfEngineContextProviderProps {
  /**
   * Instance of pdf engine
   */
  engine: PdfEngine;
  children: ReactNode;
}

/**
 * Component for providing pdf engine in PdfEngineContext
 * @param props
 * @returns
 *
 * @public
 */
export function PdfEngineContextProvider(props: PdfEngineContextProviderProps) {
  const { children, engine } = props;

  return (
    <PdfEngineContext.Provider value={engine}>
      {children}
    </PdfEngineContext.Provider>
  );
}

/**
 * Retrieve pdf engine from PdfEngineContext
 * @returns pdf engine
 *
 * @public
 */
export function usePdfEngine() {
  return useContext(PdfEngineContext);
}
