import React from 'react';
import { PdfSquareAnnoObject } from '@unionpdf/models';
import './square.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageSqureAnnotation
 */
export interface PdfPageSquareAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf squre annotation object
   */
  annotation: PdfSquareAnnoObject;
}

/**
 * Pdf squre annotation component
 * @param props - properties of PdfPageSqureAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageSquareAnnotation(props: PdfPageSquareAnnotationProps) {
  return <div className="pdf__page__annotation__square" />;
}
