import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { PdfInkAnnoObject, PdfPageObject, Rotation } from '@unionpdf/models';
import './ink.css';
import { PdfPageAnnotationBase } from './annotation';
import { calculateRectStyle } from '../helpers/annotation';

export interface PdfPageInkAnnotationProps {
  page: PdfPageObject;
  annotation: PdfInkAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageInkAnnotation(props: PdfPageInkAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      const ctx = canvasElem.getContext('2d');
      if (ctx) {
        annotation.inkList.forEach((inkList) => {
          if (inkList.points.length >= 2) {
            const startPoint = inkList.points[0];
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);

            inkList.points.slice(1).forEach((point) => {
              ctx.lineTo(point.x, point.y);
              ctx.stroke();
            });
          }
        });
      }
    }
  }, [annotation]);

  const style = useMemo(() => {
    return calculateRectStyle(annotation.rect, scaleFactor, rotation);
  }, [annotation, rotation, scaleFactor]);

  return (
    <PdfPageAnnotationBase
      page={page}
      className="pdf__annotation--ink"
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      <canvas width={style.width} height={style.height} ref={canvasRef} />
    </PdfPageAnnotationBase>
  );
}
