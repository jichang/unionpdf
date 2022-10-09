import React, { ComponentProps, useMemo } from 'react';
import { PdfAnnotationObject, Rotation, swap } from '@unionpdf/models';
import './annotation.css';

export interface PdfPageAnnotationProps extends ComponentProps<'div'> {
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageAnnotation(props: PdfPageAnnotationProps) {
  const { annotation, scaleFactor, rotation, children } = props;

  const style = useMemo(() => {
    const { origin, size } = annotation.rect;

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
  }, [annotation, rotation, scaleFactor]);

  return (
    <div
      style={style}
      className={`pdf__annotation pdf__annotation--${annotation.type}`}
    >
      {children}
    </div>
  );
}
