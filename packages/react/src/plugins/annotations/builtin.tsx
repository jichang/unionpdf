import React from 'react';
import {
  PdfPageAnnotationBase,
  PdfPageAnnotationComponentProps,
  PdfPageLinkAnnotation,
  PdfPageTextAnnotation,
  PdfPageWidgetAnnotation,
  usePdfPageAnnotationComponent,
} from '.';
import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  PdfPageObject,
  Rotation,
} from '@unionpdf/models';

export function PdfPageDefaultAnnotation(
  props: PdfPageAnnotationComponentProps
) {
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

export interface PdfPageAnnotationsProps {
  annotations: PdfAnnotationObject[];
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageAnnotations(props: PdfPageAnnotationsProps) {
  const { annotations, page, scaleFactor, rotation } = props;

  const AnnotationComponent = usePdfPageAnnotationComponent();

  return (
    <>
      {annotations.map((annotation) => {
        return (
          <AnnotationComponent
            key={annotation.id}
            page={page}
            annotation={annotation}
            scaleFactor={scaleFactor}
            rotation={rotation}
          />
        );
      })}
    </>
  );
}
