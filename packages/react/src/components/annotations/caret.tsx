import React from 'react';
import './square.css';
import { PdfPageAnnotationProps } from '../common';
import { PdfCaretAnnoObject } from '@unionpdf/models';

/**
 * Properties of PdfPageCaretAnnotation
 */
export interface PdfPageCaretAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf caret annotation object
   */
  annotation: PdfCaretAnnoObject;
}

/**
 * Pdf caret annotation component
 * @param props - properties of PdfPageCaretAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageCaretAnnotation(props: PdfPageCaretAnnotationProps) {
  const { annotation } = props;
  return (
    <div
      className="pdf__page__annotation__caret"
      style={{ fontSize: annotation.rect.size.height }}
    >
      ,
    </div>
  );
}
