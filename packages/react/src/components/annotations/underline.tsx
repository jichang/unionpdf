import React from 'react';
import { PdfUnderlineAnnoObject } from '@unionpdf/models';
import './underline.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageUnderlineAnnotation
 */
export interface PdfPageUnderlineAnnotationProps
  extends PdfPageAnnotationProps {
  /**
   * Pdf underline annotation object
   */
  annotation: PdfUnderlineAnnoObject;
}

/**
 * Pdf underline annotation component
 * @param props - properties of PdfPageUnderlineAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageUnderlineAnnotation(
  props: PdfPageUnderlineAnnotationProps,
) {
  return <div className="pdf__page__annotation__underline" />;
}
