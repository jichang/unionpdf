import { PdfPageObject, Rotation } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EditorTool, usePdfEditor } from '../../core';
import { calculateRectStyle } from '../helpers/annotation';
import './canvas.css';

export interface PdfEditorCanvasProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorCanvas(props: PdfEditorCanvasProps) {
  const { page, scaleFactor, rotation } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      const ctx = canvasElem.getContext('2d');
      if (!ctx) {
        return;
      }

      let isDrawing = false;
      const handlePointerDown = (evt: PointerEvent) => {
        if (isDrawing) {
          return;
        }

        isDrawing = true;

        setPoints((points) => {
          return [
            {
              x: evt.offsetX,
              y: evt.offsetY,
            },
          ];
        });
        ctx.beginPath();
        ctx.moveTo(evt.offsetX, evt.offsetY);
      };
      const handlePointerMove = (evt: PointerEvent) => {
        if (!isDrawing) {
          return;
        }

        setPoints((points) => {
          return [
            ...points,
            {
              x: evt.offsetX,
              y: evt.offsetY,
            },
          ];
        });
        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.stroke();
      };
      const handlePointerUp = (evt: PointerEvent) => {
        if (!isDrawing) {
          return;
        }

        isDrawing = false;

        setPoints((points) => {
          return [
            ...points,
            {
              x: evt.offsetX,
              y: evt.offsetY,
            },
          ];
        });
        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.stroke();
      };
      canvasElem.addEventListener('pointerdown', handlePointerDown);

      canvasElem.addEventListener('pointerup', handlePointerUp);

      canvasElem.addEventListener('pointermove', handlePointerMove);

      return () => {
        canvasElem.removeEventListener('pointerdown', handlePointerDown);

        canvasElem.removeEventListener('pointerup', handlePointerUp);

        canvasElem.removeEventListener('pointermove', handlePointerMove);
      };
    }
  }, [setPoints]);

  const style = useMemo(() => {
    return calculateRectStyle(
      { origin: { x: 0, y: 0 }, size: page.size },
      scaleFactor,
      rotation
    );
  }, [page, scaleFactor, rotation]);

  const { tool } = usePdfEditor();

  return (
    <canvas
      className={classNames(
        'pdf__editor__canvas',
        tool === EditorTool.Pencil
          ? 'pdf__editor__canvas--active'
          : 'pdf__editor__canvas--inactive'
      )}
      width={style.width}
      height={style.height}
      ref={canvasRef}
    />
  );
}
