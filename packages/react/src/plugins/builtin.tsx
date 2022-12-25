import React, { ReactNode } from 'react';
import { PdfPageContentComponentProps } from './pages';
import {
  PdfPageAnnotationComponentProps,
  PdfPageAnnotations,
  PdfPageCanvas,
  PdfPageText,
} from './pageLayers';
import {
  PdfPageAnnotationBase,
  PdfPageLinkAnnotation,
  PdfPageTextAnnotation,
  PdfPageWidgetAnnotation,
} from './annotations';
import { PdfAnnotationSubtype } from '@unionpdf/models';

function PdfFullFledgedPageAnnotation(props: PdfPageAnnotationComponentProps) {
  const { page, annotation, rotation, scaleFactor } = props;
  switch (annotation.type) {
    case PdfAnnotationSubtype.LINK:
      return (
        <PdfPageLinkAnnotation
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
    case PdfAnnotationSubtype.TEXT:
      return (
        <PdfPageTextAnnotation
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
    case PdfAnnotationSubtype.WIDGET:
      return (
        <PdfPageWidgetAnnotation
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
    default:
      return <PdfPageAnnotationBase {...props} />;
  }
}

export interface PdfFullFledgedPageContentProps
  extends PdfPageContentComponentProps {}

export function PdfFullFledgedPageContent(
  props: PdfFullFledgedPageContentProps
) {
  return (
    <>
      <PdfPageCanvas {...props} />
      <PdfPageText {...props} />
      <PdfPageAnnotations
        {...props}
        annotationComponent={PdfFullFledgedPageAnnotation}
      />
    </>
  );
}
