import React, { useEffect, useRef } from 'react';
import { PdfLineAnnoObject } from '@unionpdf/models';
import './line.css';

export interface PdfPageLineAnnotationProps {
  annotation: PdfLineAnnoObject;
  width: number;
  height: number;
}

export function PdfPageLineAnnotation(props: PdfPageLineAnnotationProps) {
  const { annotation, width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { x, y } = annotation.rect.origin;

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      const ctx = canvasElem.getContext('2d');
      if (ctx) {
        ctx.lineJoin = 'round';
        const { startPoint, endPoint } = annotation;
        ctx.beginPath();
        ctx.moveTo(startPoint.x - x, startPoint.y - y);
        ctx.lineTo(endPoint.x - x, endPoint.y - y);
        ctx.stroke();
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
