import { PdfDocumentObject } from '@unionpdf/models';
import React, { ReactNode, useContext } from 'react';

/**
 * Type of value in document context
 */
export interface PdfDocumentContextValue {
  /**
   * File version
   */
  version: number;
  /**
   * Set the version of file, use this to trigger rerender after editing file
   * @param version - new file version
   * @returns
   */
  setVersion: (version: number) => void;
  /**
   * Pdf document
   */
  doc: PdfDocumentObject | null;
}

/**
 * Pdf document context
 */
export const PdfDocumentContext = React.createContext<PdfDocumentContextValue>({
  version: 0,
  setVersion: () => {},
  doc: null,
});

export interface PdfDocumentContextProviderProps
  extends PdfDocumentContextValue {
  children: ReactNode;
}
/**
 * Function componnent, inject properties into document context
 * @param props - component properties
 * @returns new pdf application component
 */
export function PdfDocumentContextProvider(
  props: PdfDocumentContextProviderProps,
) {
  const { children, ...rest } = props;

  return (
    <PdfDocumentContext.Provider value={rest}>
      {children}
    </PdfDocumentContext.Provider>
  );
}
/**
 * Retrieve document configuration
 * @returns document configuration in context
 *
 * @public
 */
export function usePdfDocument() {
  return useContext(PdfDocumentContext);
}
