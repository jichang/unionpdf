import React from 'react';
import { PdfCaretAnnoObject } from '@unionpdf/models';
import './square.css';

export interface PdfPageCaretAnnotationProps {
  annotation: PdfCaretAnnoObject;
  width: number;
  height: number;
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
