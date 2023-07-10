import React from 'react';
import { PdfWidgetAnnoObject } from '@unionpdf/models';
import './widget.css';
import { Field } from '../form';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageWidgetAnnotation
 */
export interface PdfPageWidgetAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf widget annotation object
   */
  annotation: PdfWidgetAnnoObject;
}

/**
 * Pdf widget annotation component
 * @param props - properties of PdfPageWidgetAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageWidgetAnnotation(props: PdfPageWidgetAnnotationProps) {
  const { annotation } = props;

  return <Field field={annotation.field} />;
}
