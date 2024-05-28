import React, { ReactNode } from 'react';
import {
  UIStringsContextProvider,
  UIComponentsContextProvider,
  UIStrings,
  UIComponents,
} from '..';
import { strings } from './strings';
import { components } from './components';

export * from './strings';
export * from './components';

export interface PdfNativeAdapterProviderProps {
  strings?: UIStrings;
  components?: UIComponents;
  children: ReactNode;
}

export function PdfNativeAdapterProvider(props: PdfNativeAdapterProviderProps) {
  const { children } = props;

  return (
    <UIStringsContextProvider strings={props.strings || strings}>
      <UIComponentsContextProvider components={props.components || components}>
        {children}
      </UIComponentsContextProvider>
    </UIStringsContextProvider>
  );
}
