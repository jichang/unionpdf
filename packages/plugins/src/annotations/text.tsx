import React, { useMemo } from 'react';
import {
  PdfPageObject,
  PdfTextAnnoObject,
  Rotation,
  swap,
} from '@onepdf/models';
import './text.css';

export interface PdfPageTextAnnotationProps {
  page: PdfPageObject;
  anno: PdfTextAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageTextAnnotation(props: PdfPageTextAnnotationProps) {
  const { anno, scaleFactor, rotation } = props;

  const style = useMemo(() => {
    const { origin, size } = anno.rect;

    const rotatedAnnoSize = rotation % 2 === 0 ? size : swap(size);
    const scaledAnnoSize = {
      width: rotatedAnnoSize.width * scaleFactor,
      height: rotatedAnnoSize.height * scaleFactor,
    };
    const scaledOrigin = {
      x: origin.x * scaleFactor,
      y: origin.y * scaleFactor,
    };

    switch (rotation) {
      case 0:
        return {
          top: scaledOrigin.y,
          left: scaledOrigin.x,
          width: scaledAnnoSize.width,
          height: scaledAnnoSize.height,
        };
      case 1:
        return {
          top: scaledOrigin.x,
          right: scaledOrigin.x,
          width: scaledAnnoSize.width,
          height: scaledAnnoSize.height,
        };
      case 2:
        return {
          bottom: scaledOrigin.y,
          right: scaledOrigin.x,
          width: scaledAnnoSize.width,
          height: scaledAnnoSize.height,
        };
      case 3:
        return {
          bottom: scaledOrigin.x,
          left: scaledOrigin.y,
          width: scaledAnnoSize.width,
          height: scaledAnnoSize.height,
        };
    }
  }, [anno, rotation, scaleFactor]);

  return <span tabIndex={0} style={style} className="pdf__annotation--text" />;
}
