import React from 'react';
import {
  PdfAnnotationObject,
  PdfPageObject,
  PdfPopupAnnoObject,
  Rotation,
} from '@unionpdf/models';
import './text.css';

export interface PdfPagePopupAnnotationProps {
  page: PdfPageObject;
  parent: PdfAnnotationObject;
  annotation: PdfPopupAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPagePopupAnnotation(props: PdfPagePopupAnnotationProps) {
  const { annotation } = props;

  return (
    <div className="pdf__annotation--popup">
      <span>{annotation.contents}</span>
    </div>
  );
}
