import React from 'react';
import { PdfCircleAnnoObject } from '@unionpdf/models';
import './circle.css';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageCircleAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfCircleAnnoObject;
}

export function PdfPageCircleAnnotation(props: PdfPageCircleAnnotationProps) {
  return <div className="pdf__annotation__circle" />;
}
