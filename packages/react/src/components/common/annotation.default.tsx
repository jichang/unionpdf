import React from 'react';
import {
  PdfPageLinkAnnotation,
  PdfPageTextAnnotation,
  PdfPageWidgetAnnotation,
  PdfPagePopupAnnotation,
} from '../annotations';
import { PdfAnnotationSubtype } from '@unionpdf/models';
import { PdfPageAnnotationComponentProps } from './annotations.context';
import { PdfPageAnnotation } from './annotation';

/**
 * Default annotation component, it's used in view mode. It will render content
 * of 3 kinds of annotation
 *
 * Text - to support text selection
 * Link - to support navigation
 * Widgt - to support form filling
 *
 * @param props - properties for default annotation
 * @returns
 *
 * @public
 */
export function PdfPageDefaultAnnotation(
  props: PdfPageAnnotationComponentProps
) {
  const { page, annotation, rotation, scaleFactor } = props;
  let content = null;
  switch (annotation.type) {
    case PdfAnnotationSubtype.LINK:
      content = (
        <PdfPageLinkAnnotation
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.TEXT:
      content = (
        <PdfPageTextAnnotation
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.WIDGET:
      content = (
        <PdfPageWidgetAnnotation
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <PdfPageAnnotation
      page={page}
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      {content}
      {annotation.popup ? (
        <PdfPagePopupAnnotation
          page={page}
          parent={annotation}
          annotation={annotation.popup}
          scaleFactor={scaleFactor}
          rotation={rotation}
        />
      ) : null}
    </PdfPageAnnotation>
  );
}
