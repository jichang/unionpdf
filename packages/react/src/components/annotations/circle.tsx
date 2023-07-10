import React from 'react';
import { PdfCircleAnnoObject } from '@unionpdf/models';
import './circle.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageCircleAnnotation
 */
export interface PdfPageCircleAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf circle annotation object
   */
  annotation: PdfCircleAnnoObject;
}

/**
 * Pdf circle annotation component
 * @param props - properties of PdfPageCircleAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageCircleAnnotation(props: PdfPageCircleAnnotationProps) {
  return <div className="pdf__page__annotation__circle" />;
}
