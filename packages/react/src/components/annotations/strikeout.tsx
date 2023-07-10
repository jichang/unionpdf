import React from 'react';
import { PdfStrikeOutAnnoObject } from '@unionpdf/models';
import './strikeout.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageStrokeOutAnnotation
 */
export interface PdfPageStrikeOutAnnotationProps
  extends PdfPageAnnotationProps {
  /**
   * Pdf strokeout annotation object
   */
  annotation: PdfStrikeOutAnnoObject;
}

/**
 * Pdf strokeout annotation component
 * @param props - properties of PdfPageStrokeOutAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageStrikeOutAnnotation(
  props: PdfPageStrikeOutAnnotationProps
) {
  return <div className="pdf__page__annotation__strikeout"></div>;
}
