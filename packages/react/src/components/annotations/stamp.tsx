import React from 'react';
import { PdfStampAnnoObject } from '@unionpdf/models';
import { PdfPageAnnotationProps, PdfStamp } from '../common';
import './stamp.css';

export interface PdfPageStampAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfStampAnnoObject;
}

export function PdfPageStampAnnotation(props: PdfPageStampAnnotationProps) {
  const { annotation } = props;

  return (
    <PdfStamp index={annotation.id} stamp={{ source: annotation.content }} />
  );
}
