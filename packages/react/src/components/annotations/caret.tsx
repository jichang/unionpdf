import React from 'react';
import './square.css';
import { PdfPageAnnotationProps } from '../common';
import { PdfCaretAnnoObject } from '@unionpdf/models';

export interface PdfPageCaretAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfCaretAnnoObject;
}

export function PdfPageCaretAnnotation(props: PdfPageCaretAnnotationProps) {
  const { annotation } = props;
  return (
    <div
      className="pdf__annotation__caret"
      style={{ fontSize: annotation.rect.size.height }}
    >
      ,
    </div>
  );
}
