import React, { ReactNode, useCallback, useContext, useState } from 'react';

export interface PdfDocumentDecoration {
  /**
   * page index of decoration
   */
  pageIndex: number;
  /**
   * index of decoration
   */
  index: number;
  /**
   * type of decoration
   */
  type: string;
  /**
   * source of decoration
   */
  source: string;
  /**
   * payload of decoration
   */
  payload: unknown;
}

/**
 * Type of value in decorations context
 *
 * Plugins can use this for adding extra decorations to pdf document, like highlight search result, etc.
 *
 */
export interface PdfDecorationsContextValue {
  decorations: PdfDocumentDecoration[];
  addDecoration: (decoration: PdfDocumentDecoration) => void;
  removeDecoration: (decoration: PdfDocumentDecoration) => void;
}

/**
 * Pdf document context
 */
export const PdfDecorationsContext =
  React.createContext<PdfDecorationsContextValue>({
    decorations: [],
    addDecoration: () => {},
    removeDecoration: () => {},
  });

export interface PdfDecorationsContextProviderProps {
  children: ReactNode;
}
/**
 * Function componnent, inject properties into document context
 * @param props - component properties
 * @returns new pdf application component
 */
export function PdfDecorationsContextProvider(
  props: PdfDecorationsContextProviderProps,
) {
  const { children } = props;

  const [decorations, setDecorations] = useState<PdfDocumentDecoration[]>([]);

  const addDecoration = useCallback((decoration: PdfDocumentDecoration) => {
    setDecorations((decorations) => {
      return [...decorations, decoration];
    });
  }, []);

  const removeDecoration = useCallback((decoration: PdfDocumentDecoration) => {
    setDecorations((decorations) => {
      return decorations.filter((_decoration) => {
        return !(
          decoration.pageIndex === _decoration.pageIndex &&
          decoration.index === _decoration.index &&
          decoration.type === _decoration.type &&
          decoration.source === _decoration.source
        );
      });
    });
  }, []);

  return (
    <PdfDecorationsContext.Provider
      value={{ decorations, addDecoration, removeDecoration }}
    >
      {children}
    </PdfDecorationsContext.Provider>
  );
}
/**
 * Retrieve document decorations
 * @returns document decorations
 *
 * @public
 */
export function usePdfDocumentDecorations() {
  return useContext(PdfDecorationsContext);
}
