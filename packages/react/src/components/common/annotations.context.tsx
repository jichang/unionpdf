import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import React, { ComponentProps, ComponentType, useContext } from 'react';
import { PdfPageDefaultAnnotation } from './annotation.default';

/**
 * Properties of PdfPageAnnotationComponent, it will be passed to customized annotation
 * component
 */
export interface PdfPageAnnotationComponentProps extends ComponentProps<'div'> {
  /**
   * page object that annotation is belonged to
   */
  page: PdfPageObject;
  /**
   * pdf annotation object
   */
  annotation: PdfAnnotationObject;
  /**
   * scaling factor
   */
  scaleFactor: number;
  /**
   * Rotation angle
   */
  rotation: Rotation;
}

/**
 * Type of pdf annotation component
 */
export type PdfPageAnnotationComponent =
  ComponentType<PdfPageAnnotationComponentProps>;

/**
 * contenxt of pdf annotation component
 */
export const PdfPageAnnotationComponentContext =
  React.createContext<PdfPageAnnotationComponent>(PdfPageDefaultAnnotation);

/**
 * Properties of PdfPageAnnotationComponentContextProvider
 */
export interface PdfPageAnnotationComponentContexProviderProps
  extends ComponentProps<'div'> {
  /**
   * Customized annotation component
   */
  component: PdfPageAnnotationComponent;
}

/**
 * Provider for page annotation component context
 * @param props - properties of PdfPageAnnotationComponentContextProvider
 * @returns
 */
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

/**
 * Retrieve pdf annotation component in context
 * @returns pdf annotation component
 */
export function usePdfPageAnnotationComponent() {
  return useContext(PdfPageAnnotationComponentContext);
}
