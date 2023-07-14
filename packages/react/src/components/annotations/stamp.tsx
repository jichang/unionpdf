import React, { useEffect, useRef } from 'react';
import {
  PdfSegmentObjectType,
  PdfStampAnnoObject,
  PdfPageObjectType,
  PdfImageObject,
  PdfFormObject,
  PdfPathObject,
} from '@unionpdf/models';
import { PdfPageAnnotationProps } from '../common';
import './stamp.css';

/**
 * Properties of PdfPageStampAnnotation
 */
export interface PdfPageStampAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf stamp annotation object
   */
  annotation: PdfStampAnnoObject;
}

/**
 * Pdf stamp annotation component
 * @param props - properties of PdfPageStampAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageStampAnnotation(props: PdfPageStampAnnotationProps) {
  const { annotation } = props;

  const canvasElemRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem) {
      const { size } = annotation.rect;
      canvasElem.width = size.width;
      canvasElem.height = size.height;
      const ctx = canvasElem.getContext('2d');

      if (ctx) {
        ctx.resetTransform();
        ctx?.clearRect(0, 0, size.width, size.height);

        for (const content of annotation.contents) {
          renderObject(ctx, content);
        }
      }
    }
  }, [annotation]);

  return (
    <canvas className="pdf__page__annotation__stamp" ref={canvasElemRef} />
  );
}

export function renderObject(
  ctx: CanvasRenderingContext2D,
  object: PdfImageObject | PdfFormObject | PdfPathObject,
) {
  switch (object.type) {
    case PdfPageObjectType.FORM:
      for (const subObject of object.objects) {
        renderObject(ctx, subObject);
      }
      break;
    case PdfPageObjectType.IMAGE:
      ctx.putImageData(object.imageData, 0, 0);
      break;
    case PdfPageObjectType.PATH:
      {
        ctx.beginPath();
        const segmentCount = object.segments.length;
        let i = 0;
        while (i < segmentCount) {
          const segment = object.segments[i];
          switch (segment.type) {
            case PdfSegmentObjectType.MOVETO:
              ctx.moveTo(segment.point.x, segment.point.y);
              i++;
              break;
            case PdfSegmentObjectType.LINETO:
              ctx.lineTo(segment.point.x, segment.point.y);
              i++;
              break;
            case PdfSegmentObjectType.BEZIERTO:
              const points = object.segments.slice(i, i + 3).map((segment) => {
                return segment.point;
              });
              if (points.length === 3) {
                ctx.bezierCurveTo(
                  points[0].x,
                  points[0].y,
                  points[1].x,
                  points[1].y,
                  points[2].x,
                  points[2].y,
                );
              }
              i = i + 3;
              break;
            default:
              i++;
          }
        }
        ctx.stroke();
      }
      break;
  }
}
