import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import React, { ComponentProps, ComponentType, useContext } from 'react';
import { PdfPageAnnotationBase } from '../annotations/annotation';

export interface PdfPageAnnotationComponentProps extends ComponentProps<'div'> {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export type PdfPageAnnotationComponent =
  ComponentType<PdfPageAnnotationComponentProps>;

export const PdfPageAnnotationComponentContext =
  React.createContext<PdfPageAnnotationComponent>(PdfPageAnnotationBase);

export interface PdfPageAnnotationComponentContexProviderProps
  extends ComponentProps<'div'> {
  component: PdfPageAnnotationComponent;
}

export function PdfPageAnnotationComponentContextProvider(
  props: PdfPageAnnotationComponentContexProviderProps
) {
  const { children, component } = props;
  return (
    <PdfPageAnnotationComponentContext.Provider value={component}>
      {children}
    </PdfPageAnnotationComponentContext.Provider>
  );
}

export function usePdfPageAnnotationComponent() {
  return useContext(PdfPageAnnotationComponentContext);
}
