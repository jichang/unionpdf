import React from 'react';
import { PdfSquareAnnoObject } from '@unionpdf/models';
import './square.css';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageSquareAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfSquareAnnoObject;
}

export function PdfPageSquareAnnotation(props: PdfPageSquareAnnotationProps) {
  return <div className="pdf__page__annotation__square" />;
}
