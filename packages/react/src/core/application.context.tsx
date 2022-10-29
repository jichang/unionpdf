import React, { ReactNode, useContext } from 'react';

export enum PdfApplicationMode {
  Read,
  Edit,
}

export interface PdfApplicationContextValue {
  mode: PdfApplicationMode;
}

export const PdfApplicationContext =
  React.createContext<PdfApplicationContextValue>({
    mode: PdfApplicationMode.Read,
  });

export interface PdfApplicationContextProviderProps
  extends PdfApplicationContextValue {
  children: ReactNode;
}

export function PdfApplicationContextProvider(
  props: PdfApplicationContextProviderProps
) {
  const { children, mode } = props;

  return (
    <PdfApplicationContext.Provider value={{ mode }}>
      {children}
    </PdfApplicationContext.Provider>
  );
}

export function usePdfApplication() {
  return useContext(PdfApplicationContext);
}
