import React, { useEffect, useRef } from 'react';
import { PdfCircleAnnoObject } from '@unionpdf/models';
import './circle.css';

export interface PdfPageCircleAnnotationProps {
  annotation: PdfCircleAnnoObject;
  width: number;
  height: number;
}

export function PdfPageCircleAnnotation(props: PdfPageCircleAnnotationProps) {
  return <div className="pdf__annotation__circle" />;
}
