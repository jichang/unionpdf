import React, { createContext, ReactNode, useContext } from 'react';

export interface PdfPageAnnotationIconProps {
  name: string;
}

export interface PdfPageAnnotationPopupProps {
  isOpened: boolean;
}

export interface PdfPageAnnotationsContextValue {
  Popup?: (props: PdfPageAnnotationPopupProps) => JSX.Element;
}

export const PdfPageAnnotationsContext =
  createContext<PdfPageAnnotationsContextValue>({});

export interface PdfPageAnnotationsContextProviderProps
  extends PdfPageAnnotationsContextValue {
  children?: ReactNode;
}

export function PdfPageAnnotationsContextProvider(
  props: PdfPageAnnotationsContextProviderProps
) {
  const { children, ...rest } = props;

  return (
    <PdfPageAnnotationsContext.Provider value={rest}>
      {children}
    </PdfPageAnnotationsContext.Provider>
  );
}

export function usePdfPageAnnotationsContext() {
  return useContext(PdfPageAnnotationsContext);
}
