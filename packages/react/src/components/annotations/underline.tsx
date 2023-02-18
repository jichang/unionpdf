import React from 'react';
import { PdfUnderlineAnnoObject } from '@unionpdf/models';
import './underline.css';
import { PdfPageAnnotationProps } from '../common';

export interface PdfPageUnderlineAnnotationProps
  extends PdfPageAnnotationProps {
  annotation: PdfUnderlineAnnoObject;
}

export function PdfPageUnderlineAnnotation(
  props: PdfPageUnderlineAnnotationProps
) {
  return <div className="pdf__annotation__underline" />;
}
