import React from 'react';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import { usePdfPageAnnotationComponent } from './annotations.context';

/**
 * Properties of PdfPageAnnotations
 */
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

/**
 * Page annotations components, used for rendering all annotations on pdf page
 * @param props - properties of PdfPageAnnotations
 * @returns
 *
 * @public
 */
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
