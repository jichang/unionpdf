import React from 'react';
import { PdfFreeTextAnnoObject } from '@unionpdf/models';
import './freetext.css';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageFreeTextAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfFreeTextAnnoObject;
}

export function PdfPageFreeTextAnnotation(
  props: PdfPageFreeTextAnnotationProps
) {
  const { annotation } = props;

  return (
    <span style={{ fontSize: annotation.rect.size.height }}>
      {annotation.contents}
    </span>
  );
}
