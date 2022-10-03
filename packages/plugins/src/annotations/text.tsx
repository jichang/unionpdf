import React, { useMemo } from 'react';
import { PdfPageObject, PdfTextAnnoObject, Rotation } from '@onepdf/models';
import './text.css';

export interface PdfPageTextAnnotationProps {
  page: PdfPageObject;
  anno: PdfTextAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageTextAnnotation(props: PdfPageTextAnnotationProps) {
  const { page, anno, scaleFactor, rotation } = props;

  const style = useMemo(() => {
    const origin = {};
    const size = {};

    return {};
  }, [page, anno, rotation, scaleFactor]);
  return <span tabIndex={0} style={style} className="pdf__annotation--text" />;
}
