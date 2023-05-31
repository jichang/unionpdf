import React from 'react';
import { PdfSquigglyAnnoObject } from '@unionpdf/models';
import './squiggly.css';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageSquigglyAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfSquigglyAnnoObject;
}

export function PdfPageSquigglyAnnotation(
  props: PdfPageSquigglyAnnotationProps
) {
  return <div className="pdf__page__annotation__squiggly" />;
}
