import React from 'react';
import {
  PdfPageLinkAnnotation,
  PdfPageTextAnnotation,
  PdfPageWidgetAnnotation,
  PdfPagePopupAnnotation,
} from '../annotations';
import {
  PdfAnnotationSubtype,
  PdfAnnotationSubtypeName,
} from '@unionpdf/models';
import classNames from 'classnames';
import { PdfPageAnnotationComponentProps } from './annotations.context';
import { PdfPageAnnotation } from './annotation';

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
      className={classNames(
        'pdf__annotation',
        `pdf__annotation--${PdfAnnotationSubtypeName[annotation.type]}`
      )}
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
