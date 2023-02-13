import React, { useEffect, useRef } from 'react';
import { PdfPolygonAnnoObject } from '@unionpdf/models';
import './polygon.css';

export interface PdfPagePolygonAnnotationProps {
  annotation: PdfPolygonAnnoObject;
  width: number;
  height: number;
}

export function PdfPagePolygonAnnotation(props: PdfPagePolygonAnnotationProps) {
  const { annotation, width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { x, y } = annotation.rect.origin;

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      const ctx = canvasElem.getContext('2d');
      if (ctx) {
        ctx.lineJoin = 'round';
        const { vertices } = annotation;
        if (vertices.length >= 2) {
          const startPoint = vertices[0];
          ctx.beginPath();
          ctx.moveTo(startPoint.x - x, startPoint.y - y);

          vertices.slice(1).forEach((point) => {
            ctx.lineTo(point.x - x, point.y - y);
            ctx.stroke();
          });

          ctx.closePath();
        }
      }
    }
  }, [annotation, x, y, width, height]);

  return (
    <canvas
      className="pdf__annotation__canvas"
      width={width}
      height={height}
      ref={canvasRef}
    />
  );
}
