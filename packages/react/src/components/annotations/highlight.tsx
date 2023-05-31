import React from 'react';
import { PdfHighlightAnnoObject } from '@unionpdf/models';
import './highlight.css';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageHighlightAnnotationProps
  extends PdfPageAnnotationProps {
  annotation: PdfHighlightAnnoObject;
}

export function PdfPageHighlightAnnotation(
  props: PdfPageHighlightAnnotationProps
) {
  return <div className="pdf__page__annotation__highlight" />;
}
