import React, { useEffect, useRef } from 'react';
import {
  PdfInkAnnoObject,
  transformPosition,
  transformRect,
} from '@unionpdf/models';
import './ink.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPageInkAnnotation
 */
export interface PdfPageInkAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf ink annotation object
   */
  annotation: PdfInkAnnoObject;
}

/**
 * Pdf ink annotation component
 * @param props - properties of PdfPageInkAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageInkAnnotation(props: PdfPageInkAnnotationProps) {
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

        ctx.lineJoin = 'round';
        annotation.inkList.forEach((inkList) => {
          if (inkList.points.length >= 2) {
            const startPoint = transformPosition(
              page.size,
              inkList.points[0],
              rotation,
              scaleFactor,
            );
            ctx.beginPath();
            ctx.moveTo(startPoint.x - origin.x, startPoint.y - origin.y);

            inkList.points
              .slice(1)
              .map((point) => {
                return transformPosition(
                  page.size,
                  point,
                  rotation,
                  scaleFactor,
                );
              })
              .forEach((point) => {
                ctx.lineTo(point.x - origin.x, point.y - origin.y);
                ctx.stroke();
              });
          }
        });
      }
    }
  }, [page, annotation, scaleFactor, rotation]);

  return (
    <canvas
      className="pdf__page__annotation__canvas pdf__page__annotation__canvas--ink"
      ref={canvasRef}
    />
  );
}
