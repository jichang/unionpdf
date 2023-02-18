import React from 'react';
import { PdfStrikeOutAnnoObject } from '@unionpdf/models';
import './strikeout.css';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageStrikeOutAnnotationProps
  extends PdfPageAnnotationProps {
  annotation: PdfStrikeOutAnnoObject;
}

export function PdfPageStrikeOutAnnotation(
  props: PdfPageStrikeOutAnnotationProps
) {
  return <div className="pdf__annotation__strikeout"></div>;
}
