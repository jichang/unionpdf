import React from 'react';
import { PdfSquigglyAnnoObject } from '@unionpdf/models';
import './squiggly.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageSqugglyAnnotation
 */
export interface PdfPageSquigglyAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf squggly annotation object
   */
  annotation: PdfSquigglyAnnoObject;
}

/**
 * Pdf squggly annotation component
 * @param props - properties of PdfPageSqugglyAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageSquigglyAnnotation(
  props: PdfPageSquigglyAnnotationProps
) {
  return <div className="pdf__page__annotation__squiggly" />;
}
