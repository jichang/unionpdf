import React, { useEffect, useRef } from 'react';
import {
  PdfPolygonAnnoObject,
  transformPosition,
  transformRect,
} from '@unionpdf/models';
import './polygon.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPagePolygoneAnnotation
 */
export interface PdfPagePolygonAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf caret annotation object
   */
  annotation: PdfPolygonAnnoObject;
}

/**
 * Pdf caret annotation component
 * @param props - properties of PdfPagePolygoneAnnotation
 * @returns
 *
 * @public
 */
export function PdfPagePolygonAnnotation(props: PdfPagePolygonAnnotationProps) {
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

          ctx.closePath();
        }
      }
    }
  }, [page, annotation, rotation, scaleFactor]);

  return (
    <canvas
      className="pdf__page__annotation__canvas--polygon"
      ref={canvasRef}
    />
  );
}
