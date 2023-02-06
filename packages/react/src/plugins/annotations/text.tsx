import React from 'react';
import { PdfTextAnnoObject } from '@unionpdf/models';
import './text.css';

export interface PdfPageTextAnnotationProps {
  annotation: PdfTextAnnoObject;
}

export function PdfPageTextAnnotation(props: PdfPageTextAnnotationProps) {
  const { annotation } = props;

  return <span>{annotation.contents}</span>;
}
