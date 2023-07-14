import React from 'react';
import { PdfHighlightAnnoObject } from '@unionpdf/models';
import './highlight.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageHighlightAnnotation
 */
export interface PdfPageHighlightAnnotationProps
  extends PdfPageAnnotationProps {
  /**
   * Pdf highlight annotation object
   */
  annotation: PdfHighlightAnnoObject;
}

/**
 * Pdf highlight annotation component
 * @param props - properties of PdfPageHighlightAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageHighlightAnnotation(
  props: PdfPageHighlightAnnotationProps,
) {
  return <div className="pdf__page__annotation__highlight" />;
}
