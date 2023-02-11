import {
  PdfAnnotationSubtype,
  PdfPageObject,
  Position,
  Rotation,
} from '@unionpdf/models';
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef } from 'react';
import { calculateRectStyle } from '../helpers/annotation';
import { calculateBoundingRect } from '../helpers/editor';
import { PdfAnnotationTool, usePdfEditor } from './editor.context';
import './canvas.css';

export interface PdfEditorCanvasProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorCanvas(props: PdfEditorCanvasProps) {
  const { page, scaleFactor, rotation } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const style = useMemo(() => {
    return calculateRectStyle(
      { origin: { x: 0, y: 0 }, size: page.size },
      scaleFactor,
      rotation
    );
  }, [page, scaleFactor, rotation]);

  const { exec, annotationTool } = usePdfEditor();

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      const ctx = canvasElem.getContext('2d');
      if (!ctx) {
        return;
      }

      let isDrawing = false;
      let points: Position[] = [];
      const startDrawing = (evt: PointerEvent) => {
        if (isDrawing) {
          return;
        }

        isDrawing = true;
        points.push({
          x: evt.offsetX,
          y: evt.offsetY,
        });
        ctx.beginPath();
        ctx.moveTo(evt.offsetX, evt.offsetY);
      };

      const draw = (evt: PointerEvent) => {
        if (!isDrawing) {
          return;
        }

        points.push({
          x: evt.offsetX,
          y: evt.offsetY,
        });
        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.stroke();
      };

      const stopDrawing = (evt: PointerEvent) => {
        if (!isDrawing) {
          return;
        }

        points.push({
          x: evt.offsetX,
          y: evt.offsetY,
        });

        ctx.save();

        ctx.clearRect(0, 0, style.width, style.height);

        ctx.restore();

        const inkList = [{ points: [...points] }];

        exec({
          id: `${Date.now()}.${Math.random()}`,
          pageIndex: page.index,
          action: 'create',
          annotation: {
            id: Date.now(),
            type: PdfAnnotationSubtype.INK,
            rect: calculateBoundingRect(inkList),
            inkList,
          },
        });

        points = [];

        isDrawing = false;
      };
      canvasElem.addEventListener('pointerdown', startDrawing);

      canvasElem.addEventListener('pointerup', stopDrawing);
      canvasElem.addEventListener('pointerleave', stopDrawing);
      canvasElem.addEventListener('pointerout', stopDrawing);

      canvasElem.addEventListener('pointermove', draw);

      return () => {
        canvasElem.removeEventListener('pointerdown', startDrawing);

        canvasElem.removeEventListener('pointerup', stopDrawing);
        canvasElem.removeEventListener('pointerleave', stopDrawing);
        canvasElem.removeEventListener('pointerout', stopDrawing);

        canvasElem.removeEventListener('pointermove', draw);
      };
    }
  }, [page, exec]);

  return (
    <canvas
      className={classNames(
        'pdf__editor__canvas',
        annotationTool === PdfAnnotationTool.Pencil
          ? 'pdf__editor__canvas--active'
          : 'pdf__editor__canvas--inactive'
      )}
      width={style.width}
      height={style.height}
      ref={canvasRef}
    />
  );
}
