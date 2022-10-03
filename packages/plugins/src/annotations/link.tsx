import React, { useMemo } from 'react';
import { PdfLinkAnnoObject, PdfPageObject, Rotation } from '@onepdf/models';
import './link.css';

export interface PdfPageLinkAnnotationProps {
  page: PdfPageObject;
  anno: PdfLinkAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageLinkAnnotation(props: PdfPageLinkAnnotationProps) {
  const { page, anno, scaleFactor, rotation } = props;

  const style = useMemo(() => {
    const origin = {};
    const size = {};

    return {};
  }, [page, anno, rotation, scaleFactor]);

  return (
    <a style={style} className="pdf__annotation--link" href={anno.url}>
      {anno.text}
    </a>
  );
}
