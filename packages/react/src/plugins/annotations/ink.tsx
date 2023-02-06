import React, { useEffect, useRef } from 'react';
import { PdfInkAnnoObject } from '@unionpdf/models';
import './ink.css';

export interface PdfPageInkAnnotationProps {
  annotation: PdfInkAnnoObject;
  top: number;
  left: number;
  width: number;
  height: number;
}

export function PdfPageInkAnnotation(props: PdfPageInkAnnotationProps) {
  const { annotation, top, left, width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
            ctx.moveTo(startPoint.x - left, startPoint.y - top);

            inkList.points.slice(1).forEach((point) => {
              ctx.lineTo(point.x - left, point.y - top);
              ctx.stroke();
            });
          }
        });
      }
    }
  }, [annotation, top, left]);

  return <canvas width={width} height={height} ref={canvasRef} />;
}
