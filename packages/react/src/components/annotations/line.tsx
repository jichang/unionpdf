import React, { useEffect, useRef } from 'react';
import {
  PdfLineAnnoObject,
  transformPosition,
  transformRect,
} from '@unionpdf/models';
import './line.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageLineAnnotation
 */
export interface PdfPageLineAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf line annotation object
   */
  annotation: PdfLineAnnoObject;
}

/**
 * Pdf line annotation component
 * @param props - properties of PdfPageLineAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageLineAnnotation(props: PdfPageLineAnnotationProps) {
  const { page, annotation, rotation, scaleFactor } = props;
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
        ctx.lineJoin = 'round';
        const startPoint = transformPosition(
          page.size,
          annotation.startPoint,
          rotation,
          scaleFactor,
        );
        const endPoint = transformPosition(
          page.size,
          annotation.endPoint,
          rotation,
          scaleFactor,
        );
        ctx.beginPath();
        ctx.moveTo(startPoint.x - origin.x, startPoint.y - origin.y);
        ctx.lineTo(endPoint.x - origin.x, endPoint.y - origin.y);
        ctx.stroke();
      }
    }
  }, [page, annotation, rotation, scaleFactor]);

  return (
    <canvas className="pdf__page__annotation__canvas--line" ref={canvasRef} />
  );
}
