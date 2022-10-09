import React from 'react';
import { PdfPageObject, PdfTextAnnoObject, Rotation } from '@unionpdf/models';
import './text.css';
import { PdfPageAnnotation } from './annotation';

export interface PdfPageTextAnnotationProps {
  page: PdfPageObject;
  annotation: PdfTextAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageTextAnnotation(props: PdfPageTextAnnotationProps) {
  const { annotation, scaleFactor, rotation } = props;

  return (
    <PdfPageAnnotation
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      <span tabIndex={0}>{annotation.text}</span>
    </PdfPageAnnotation>
  );
}
