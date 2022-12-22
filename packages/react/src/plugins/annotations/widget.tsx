import React from 'react';
import { PdfPageObject, PdfWidgetAnnoObject, Rotation } from '@unionpdf/models';
import './widget.css';
import { PdfPageAnnotationBase } from './annotation';
import { Field } from '../form';

export interface PdfPageWidgetAnnotationProps {
  page: PdfPageObject;
  annotation: PdfWidgetAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageWidgetAnnotation(props: PdfPageWidgetAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;

  return (
    <PdfPageAnnotationBase
      page={page}
      className="pdf__annotation--widget"
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      <Field field={annotation.field} />
    </PdfPageAnnotationBase>
  );
}
