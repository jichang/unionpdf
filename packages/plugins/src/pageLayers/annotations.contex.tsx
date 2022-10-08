import {
  PdfLinkAnnoObject,
  PdfPageObject,
  PdfTextAnnoObject,
  Rotation,
} from '@unionpdf/models';
import React, { createContext, useContext } from 'react';
import { PdfPageLinkAnnotation } from '../annotations/link';
import { PdfPageTextAnnotation } from '../annotations/text';

export interface PdfPageAnnotationComponentProps<T> {
  page: PdfPageObject;
  anno: T;
  scaleFactor: number;
  rotation: Rotation;
}

export type PdfPageAnnotationComponent<T> = (
  props: PdfPageAnnotationComponentProps<T>
) => JSX.Element;

export interface PdfPageAnnotationComponents {
  link: PdfPageAnnotationComponent<PdfLinkAnnoObject>;
  text: PdfPageAnnotationComponent<PdfTextAnnoObject>;
}

export type PdfPageAnnotationComponentsContextValue = {
  annotationComponents: PdfPageAnnotationComponents;
  addAnnotationComponent?: <T extends keyof PdfPageAnnotationComponents>(
    type: T,
    annotationComponent: PdfPageAnnotationComponent<T>
  ) => void;
  removeAnnotationComponent?: <T extends keyof PdfPageAnnotationComponents>(
    type: T,
    annotationComponent: PdfPageAnnotationComponent<T>
  ) => void;
};

export const DEFAULT_PDF_PAGE_ANNOTATION_COMPONENTS = {
  link: PdfPageLinkAnnotation,
  text: PdfPageTextAnnotation,
};

export const PdfPageAnnotationComponentsContext =
  createContext<PdfPageAnnotationComponentsContextValue>({
    annotationComponents: DEFAULT_PDF_PAGE_ANNOTATION_COMPONENTS,
  });

export function usePdfPageAnnotationComponents() {
  return useContext(PdfPageAnnotationComponentsContext);
}

export interface PdfPageAnnotationComponentsContextProviderProps {
  annotationComponents: Partial<PdfPageAnnotationComponents>;
  children: React.ReactNode;
}

export function PdfPageAnnotationComponentsContextProvider(
  props: PdfPageAnnotationComponentsContextProviderProps
) {
  const { children } = props;

  const annotationComponents = {
    ...DEFAULT_PDF_PAGE_ANNOTATION_COMPONENTS,
    ...props.annotationComponents,
  };

  return (
    <PdfPageAnnotationComponentsContext.Provider
      value={{
        annotationComponents,
      }}
    >
      {children}
    </PdfPageAnnotationComponentsContext.Provider>
  );
}
