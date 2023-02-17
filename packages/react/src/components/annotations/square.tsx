import React, { useEffect, useRef } from 'react';
import { PdfSquareAnnoObject } from '@unionpdf/models';
import './square.css';

export interface PdfPageSquareAnnotationProps {
  annotation: PdfSquareAnnoObject;
  width: number;
  height: number;
}

export function PdfPageSquareAnnotation(props: PdfPageSquareAnnotationProps) {
  return <div className="pdf__annotation__square" />;
}
