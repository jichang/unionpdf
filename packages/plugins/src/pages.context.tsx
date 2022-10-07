import React, { createContext, useContext, ReactNode } from 'react';
import { PdfPageProps } from './pages';

export interface PdfPageLayerComponentProps extends PdfPageProps {}

export type PdfPageLayerComponent = (
  props: PdfPageLayerComponentProps
) => JSX.Element | null;

export type PdfPageLayerComponentsContextValue = {
  layerComponents: PdfPageLayerComponent[];
  addLayerComponent?: (layerComponent: PdfPageLayerComponent) => void;
  removeLayerComponent?: (layerComponent: PdfPageLayerComponent) => void;
};

export const PdfPageLayerComponentsContext =
  createContext<PdfPageLayerComponentsContextValue>({
    layerComponents: [],
    addLayerComponent: (layerComponent: PdfPageLayerComponent) => {},
    removeLayerComponent: (layerComponent: PdfPageLayerComponent) => {},
  });

export function usePdfPageLayerComponents() {
  return useContext(PdfPageLayerComponentsContext);
}

export interface PdfPageLayersContextProviderProps
  extends PdfPageLayerComponentsContextValue {
  children: ReactNode;
}

export function PdfPageLayersContextProvider(
  props: PdfPageLayersContextProviderProps
) {
  const { layerComponents, addLayerComponent, removeLayerComponent, children } =
    props;

  return (
    <PdfPageLayerComponentsContext.Provider
      value={{
        layerComponents,
        addLayerComponent,
        removeLayerComponent,
      }}
    >
      {children}
    </PdfPageLayerComponentsContext.Provider>
  );
}
