import React from 'react';
import { PdfTextAnnoObject } from '@unionpdf/models';
import './text.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageTextAnnotation
 */
export interface PdfPageTextAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf text annotation object
   */
  annotation: PdfTextAnnoObject;
}

/**
 * Pdf text annotation component
 * @param props - properties of PdfPageTextAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageTextAnnotation(props: PdfPageTextAnnotationProps) {
  const { annotation } = props;

  return <span>{annotation.contents}</span>;
}
