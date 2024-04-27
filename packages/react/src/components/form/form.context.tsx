import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  PdfAnnotationObject,
  PdfPageObject,
  Position,
  Size,
} from '@unionpdf/models';
import { useLogger, usePdfDocument, usePdfEngine } from '../../core';

export const FORM_CONTEXT_LOG_SOURCE = 'PdfFormContext';

/**
 * Value in PdfFormContext
 */
export interface PdfFormContextValue {
  values: Record<string, string>;
}

export const PdfFormContext = React.createContext<PdfFormContextValue>({
  values: {},
});

/**
 * Properties of PdfFormContextProvider
 */
export interface PdfFormContextProviderProps {
  /**
   * Children nodes
   */
  children: ReactNode;
}

/**
 * Provider of PdfFormContext, used to maintaining Form status and data
 * @param props - properties of PdfFormContextProvider
 * @returns
 *
 * @public
 */
export function PdfFormContextProvider(props: PdfFormContextProviderProps) {
  const { children } = props;

  return (
    <PdfFormContext.Provider
      value={{
        values: {},
      }}
    >
      {children}
    </PdfFormContext.Provider>
  );
}

export function usePdfForm() {
  return useContext(PdfFormContext);
}
