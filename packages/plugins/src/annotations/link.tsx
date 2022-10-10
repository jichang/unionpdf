import React from 'react';
import { PdfLinkAnnoObject, PdfPageObject, Rotation } from '@unionpdf/models';
import './link.css';
import { PdfPageAnnotation } from './annotation';

export interface PdfPageLinkAnnotationProps {
  page: PdfPageObject;
  annotation: PdfLinkAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageLinkAnnotation(props: PdfPageLinkAnnotationProps) {
  const { annotation, scaleFactor, rotation } = props;

  return (
    <PdfPageAnnotation
      role="link"
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      <span>{annotation.text}</span>
    </PdfPageAnnotation>
  );
}
