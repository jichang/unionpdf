import React, { ReactNode, useContext } from 'react';
import { PdfLinkAnnoObject } from '@unionpdf/models';

export interface PdfLinkAnnoContextValue {
  onClick?: (
    evt: React.MouseEvent<HTMLAnchorElement>,
    link: PdfLinkAnnoObject,
  ) => void;
}

export const PdfLinkAnnoContext = React.createContext<PdfLinkAnnoContextValue>(
  {},
);

export interface PdfLinkAnnoContextProviderProps
  extends PdfLinkAnnoContextValue {
  children: ReactNode;
}

export function PdfLinkAnnoContextProvider(
  props: PdfLinkAnnoContextProviderProps,
) {
  const { children, onClick } = props;

  return (
    <PdfLinkAnnoContext.Provider value={{ onClick }}>
      {children}
    </PdfLinkAnnoContext.Provider>
  );
}

export function usePdfLinkAnnoContext() {
  return useContext(PdfLinkAnnoContext);
}
