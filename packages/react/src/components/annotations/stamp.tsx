import React, { useEffect, useRef } from 'react';
import {
  PdfSegmentObjectType,
  PdfStampAnnoObject,
  PdfPageObjectType,
  PdfImageObject,
  PdfFormObject,
  PdfPathObject,
  PdfSegmentObject,
  Rect,
  Position,
  PdfTransformMatrix,
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
          renderObject(ctx, content, annotation.rect);
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
  rect: Rect,
) {
  switch (object.type) {
    case PdfPageObjectType.FORM:
      for (const subObject of object.objects) {
        renderObject(ctx, subObject, rect);
      }
      break;
    case PdfPageObjectType.IMAGE:
      {
        const matrix = object.matrix;
        ctx.putImageData(object.imageData, 0, 0, 0, 0, matrix.a, matrix.d);
      }
      break;
    case PdfPageObjectType.PATH:
      {
        ctx.beginPath();

        const matrix = object.matrix;
        const segmentCount = object.segments.length;
        let i = 0;
        while (i < segmentCount) {
          const segment = object.segments[i];
          switch (segment.type) {
            case PdfSegmentObjectType.MOVETO:
              {
                const point = transform(segment.point, matrix, rect);
                ctx.moveTo(point.x, point.y);
              }
              i++;
              break;
            case PdfSegmentObjectType.LINETO:
              {
                const point = transform(segment.point, matrix, rect);
                ctx.lineTo(point.x, point.y);
              }
              i++;
              break;
            case PdfSegmentObjectType.BEZIERTO:
              const points = object.segments.slice(i, i + 3).map((segment) => {
                return segment.point;
              });
              if (points.length === 3) {
                const point0 = transform(points[0], matrix, rect);
                const point1 = transform(points[1], matrix, rect);
                const point2 = transform(points[2], matrix, rect);
                ctx.bezierCurveTo(
                  point0.x,
                  point0.y,
                  point1.x,
                  point1.y,
                  point2.x,
                  point2.y,
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

export function transform(
  point: Position,
  matrix: PdfTransformMatrix,
  rect: Rect,
) {
  return {
    x: (point.x + matrix.e) * matrix.a,
    y: rect.size.height - (point.y + matrix.f) * matrix.d,
  };
}
