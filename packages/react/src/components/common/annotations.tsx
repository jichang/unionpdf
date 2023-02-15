import React from 'react';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import { usePdfPageAnnotationComponent } from './annotations.context';

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
