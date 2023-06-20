import React, { ReactNode } from 'react';
import { UIStringsContextProvider, UIComponentsContextProvider } from '..';
import { strings } from './strings';
import { components } from './components';

export * from './strings';
export * from './components';

export interface PdfNativeAdapterProviderProps {
  children: ReactNode;
}

export function PdfNativeAdapterProvider(props: PdfNativeAdapterProviderProps) {
  const { children } = props;

  return (
    <UIStringsContextProvider strings={strings}>
      <UIComponentsContextProvider components={components}>
        {children}
      </UIComponentsContextProvider>
    </UIStringsContextProvider>
  );
}
