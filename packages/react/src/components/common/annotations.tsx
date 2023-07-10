import React from 'react';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import { usePdfPageAnnotationComponent } from './annotations.context';

export interface PdfPageAnnotationsProps {
  /**
   * page object that annotation is belonged to
   */
  page: PdfPageObject;
  /**
   * pdf annotations on the pdf page
   */
  annotations: PdfAnnotationObject[];
  /**
   * scaling factor
   */
  scaleFactor: number;
  /**
   * Rotation angle
   */
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
