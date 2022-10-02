import React from 'react';
import { PdfTextAnnoObject } from '@onepdf/models';
import './text.css';

export interface PdfPageTextAnnotationProps {
  anno: PdfTextAnnoObject;
}

export function PdfPageTextAnnotation(props: PdfPageTextAnnotationProps) {
  const { anno } = props;

  return (
    <span
      tabIndex={0}
      style={{
        top: anno.rect.y,
        left: anno.rect.x,
        width: anno.rect.width,
        height: anno.rect.height,
      }}
      className="pdf__annotation--text"
    />
  );
}
