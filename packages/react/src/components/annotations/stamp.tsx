import React from 'react';
import { PdfStampAnnoObject } from '@unionpdf/models';
import { PdfStamp } from '../common';
import './stamp.css';

export interface PdfPageStampAnnotationProps {
  annotation: PdfStampAnnoObject;
  width: number;
  height: number;
}

export function PdfPageStampAnnotation(props: PdfPageStampAnnotationProps) {
  const { annotation } = props;

  return (
    <PdfStamp index={annotation.id} stamp={{ source: annotation.content }} />
  );
}
