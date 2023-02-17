import React from 'react';
import { PdfUnderlineAnnoObject } from '@unionpdf/models';
import './underline.css';

export interface PdfPageUnderlineAnnotationProps {
  annotation: PdfUnderlineAnnoObject;
  width: number;
  height: number;
}

export function PdfPageUnderlineAnnotation(
  props: PdfPageUnderlineAnnotationProps
) {
  return <div className="pdf__annotation__underline" />;
}
