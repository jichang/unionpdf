import React from 'react';
import { PdfStrikeOutAnnoObject } from '@unionpdf/models';
import './strikeout.css';

export interface PdfPageStrikeOutAnnotationProps {
  annotation: PdfStrikeOutAnnoObject;
  width: number;
  height: number;
}

export function PdfPageStrikeOutAnnotation(
  props: PdfPageStrikeOutAnnotationProps
) {
  return <div className="pdf__annotation__strikeout"></div>;
}
