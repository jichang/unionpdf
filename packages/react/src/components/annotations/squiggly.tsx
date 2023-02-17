import React from 'react';
import { PdfSquigglyAnnoObject } from '@unionpdf/models';
import './squiggly.css';

export interface PdfPageSquigglyAnnotationProps {
  annotation: PdfSquigglyAnnoObject;
  width: number;
  height: number;
}

export function PdfPageSquigglyAnnotation(
  props: PdfPageSquigglyAnnotationProps
) {
  return <div className="pdf__annotation__squiggly" />;
}
