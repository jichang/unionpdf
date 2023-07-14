import React, { useEffect, useRef } from 'react';
import {
  PdfPolylineAnnoObject,
  transformPosition,
  transformRect,
} from '@unionpdf/models';
import './polyline.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPagePolylineAnnotation
 */
export interface PdfPagePolylineAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf polyline annotation object
   */
  annotation: PdfPolylineAnnoObject;
}

/**
 * Pdf polyline annotation component
 * @param props - properties of PdfPagePolylineAnnotation
 * @returns
 *
 * @public
 */
export function PdfPagePolylineAnnotation(
  props: PdfPagePolylineAnnotationProps,
) {
  const { page, annotation, scaleFactor, rotation } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      const rect = transformRect(
        page.size,
        annotation.rect,
        rotation,
        scaleFactor,
      );
      const { origin, size } = rect;
      canvasElem.width = size.width;
      canvasElem.height = size.height;
      const ctx = canvasElem.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size.width, size.height);
        const { vertices } = annotation;
        if (vertices.length >= 2) {
          const startPoint = transformPosition(
            page.size,
            vertices[0],
            rotation,
            scaleFactor,
          );
          ctx.beginPath();
          ctx.moveTo(startPoint.x - origin.x, startPoint.y - origin.y);

          vertices
            .slice(1)
            .map((point) => {
              return transformPosition(page.size, point, rotation, scaleFactor);
            })
            .forEach((point) => {
              ctx.lineTo(point.x - origin.x, point.y - origin.y);
              ctx.stroke();
            });
        }
      }
    }
  }, [page, annotation, rotation, scaleFactor]);

  return (
    <canvas
      className="pdf__page__annotation__canvas--polyline"
      ref={canvasRef}
    />
  );
}
