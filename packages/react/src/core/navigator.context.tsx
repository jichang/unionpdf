import React, { ReactNode, useContext } from 'react';
import { PdfNavigator } from './navigator';

export const PdfNavigatorContext = React.createContext<PdfNavigator | null>(
  null
);

export interface PdfNavigatorContextProviderProps {
  navigator: PdfNavigator;
  children: ReactNode;
}

export function PdfNavigatorContextProvider(
  props: PdfNavigatorContextProviderProps
) {
  const { children, navigator } = props;

  return (
    <PdfNavigatorContext.Provider value={navigator}>
      {children}
    </PdfNavigatorContext.Provider>
  );
}

export function usePdfNavigator() {
  return useContext(PdfNavigatorContext);
}
