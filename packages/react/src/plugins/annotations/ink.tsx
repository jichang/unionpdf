import React, { useEffect, useRef } from 'react';
import { PdfInkAnnoObject } from '@unionpdf/models';
import './ink.css';

export interface PdfPageInkAnnotationProps {
  annotation: PdfInkAnnoObject;
  width: number;
  height: number;
}

export function PdfPageInkAnnotation(props: PdfPageInkAnnotationProps) {
  const { annotation, width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { x, y } = annotation.rect.origin;

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      const ctx = canvasElem.getContext('2d');
      if (ctx) {
        ctx.lineJoin = 'round';
        annotation.inkList.forEach((inkList) => {
          if (inkList.points.length >= 2) {
            const startPoint = inkList.points[0];
            ctx.beginPath();
            ctx.moveTo(startPoint.x - x, startPoint.y - y);

            inkList.points.slice(1).forEach((point) => {
              ctx.lineTo(point.x - x, point.y - y);
              ctx.stroke();
            });
          }
        });
      }
    }
  }, [annotation, x, y]);

  return (
    <canvas
      className="pdf__annotation__canvas"
      width={width}
      height={height}
      ref={canvasRef}
    />
  );
}
