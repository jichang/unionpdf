import React from 'react';
import { PdfFreeTextAnnoObject } from '@unionpdf/models';
import './freetext.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageFreeTextAnnotation
 */
export interface PdfPageFreeTextAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf freetext annotation object
   */
  annotation: PdfFreeTextAnnoObject;
}

/**
 * Pdf freetext annotation component
 * @param props - properties of PdfPageFreeTextAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageFreeTextAnnotation(
  props: PdfPageFreeTextAnnotationProps,
) {
  const { annotation } = props;

  return (
    <span style={{ fontSize: annotation.rect.size.height }}>
      {annotation.contents}
    </span>
  );
}
