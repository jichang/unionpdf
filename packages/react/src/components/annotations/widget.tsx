import React from 'react';
import { PdfWidgetAnnoObject } from '@unionpdf/models';
import './widget.css';
import { Field } from '../form';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageWidgetAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfWidgetAnnoObject;
}

export function PdfPageWidgetAnnotation(props: PdfPageWidgetAnnotationProps) {
  const { annotation } = props;

  return <Field field={annotation.field} />;
}
