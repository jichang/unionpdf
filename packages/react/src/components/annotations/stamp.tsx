import React, { useEffect, useRef } from 'react';
import {
  PdfSegmentObjectType,
  PdfStampAnnoObject,
  PdfStampContentType,
} from '@unionpdf/models';
import { PdfPageAnnotationProps } from '../common';
import './stamp.css';

export interface PdfPageStampAnnotationProps extends PdfPageAnnotationProps {
  annotation: PdfStampAnnoObject;
}

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
          switch (content.type) {
            case PdfStampContentType.IMAGE:
              ctx.putImageData(content.imageData, 0, 0);
              break;
            case PdfStampContentType.PATH:
              {
                ctx.beginPath();
                const segmentCount = content.segments.length;
                let i = 0;
                while (i < segmentCount) {
                  const segment = content.segments[i];
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
                      const points = content.segments
                        .slice(i, i + 3)
                        .map((segment) => {
                          return segment.point;
                        });
                      if (points.length === 3) {
                        ctx.bezierCurveTo(
                          points[0].x,
                          points[0].y,
                          points[1].x,
                          points[1].y,
                          points[2].x,
                          points[2].y
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
      }
    }
  }, [annotation]);

  return (
    <canvas className="pdf__page__annotation__stamp" ref={canvasElemRef} />
  );
}
