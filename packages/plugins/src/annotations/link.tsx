import React, { useMemo } from 'react';
import {
  PdfLinkAnnoObject,
  PdfPageObject,
  Rotation,
  swap,
} from '@onepdf/models';
import './link.css';

export interface PdfPageLinkAnnotationProps {
  page: PdfPageObject;
  anno: PdfLinkAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageLinkAnnotation(props: PdfPageLinkAnnotationProps) {
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

  return (
    <a style={style} className="pdf__annotation--link" href={anno.url}>
      {anno.text}
    </a>
  );
}
