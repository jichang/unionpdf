import {
  PdfAnnotationSubtype,
  PdfPageObject,
  Position,
  Rotation,
} from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { calculateRectStyle } from '../helpers/annotation';
import { calculateBoundingRect } from '../helpers/editor';
import { PdfAnnotationTool, usePdfEditor } from './editor.context';
import './canvas.css';
import { Drawable, DrawablePath } from '../common';

export interface PdfEditorCanvasProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorCanvas(props: PdfEditorCanvasProps) {
  const { page, scaleFactor, rotation } = props;

  const style = useMemo(() => {
    return calculateRectStyle(
      { origin: { x: 0, y: 0 }, size: page.size },
      scaleFactor,
      rotation
    );
  }, [page, scaleFactor, rotation]);

  const { exec, annotationTool } = usePdfEditor();

  const addPath = useCallback(
    (path: DrawablePath) => {
      exec({
        id: `${Date.now()}.${Math.random()}`,
        pageIndex: page.index,
        action: 'create',
        annotation: {
          id: Date.now(),
          type: PdfAnnotationSubtype.INK,
          rect: calculateBoundingRect([path]),
          inkList: [path],
        },
      });
    },
    [page, exec]
  );

  return (
    <Drawable
      className={classNames(
        'pdf__editor__canvas',
        annotationTool === PdfAnnotationTool.Pencil
          ? 'pdf__editor__canvas--active'
          : 'pdf__editor__canvas--inactive'
      )}
      width={style.width}
      height={style.height}
      onAddPath={addPath}
    />
  );
}
