import React from 'react';
import { PdfTextAnnoObject } from '@unionpdf/models';
import './text.css';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageTextAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfTextAnnoObject;
}

export function PdfPageTextAnnotation(props: PdfPageTextAnnotationProps) {
  const { annotation } = props;

  return <span>{annotation.contents}</span>;
}
