import React from 'react';
import { PdfHighlightAnnoObject } from '@unionpdf/models';
import './highlight.css';

export interface PdfPageHighlightAnnotationProps {
  annotation: PdfHighlightAnnoObject;
  width: number;
  height: number;
}

export function PdfPageHighlightAnnotation(
  props: PdfPageHighlightAnnotationProps
) {
  return <div className="pdf__annotation__highlight" />;
}
