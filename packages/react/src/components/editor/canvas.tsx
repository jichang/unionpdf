import {
  PdfAnnotationObjectStatus,
  PdfAnnotationSubtype,
  PdfPageObject,
  restorePosition,
  Rotation,
  transformSize,
} from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef } from 'react';
import { calculateBoundingRect } from '../helpers/editor';
import { PdfAnnotationTool, usePdfEditor } from './editor.context';
import './canvas.css';
import { Drawable, DrawableHandle, DrawablePath } from '../common';
import { restoreRect } from '@unionpdf/models';

/**
 * Properties of PdfEditorCanvas
 */
export interface PdfPageEditorCanvasProps {
  /**
   * page object that annotation is belonged to
   */
  page: PdfPageObject;
  /**
   * scaling factor
   */
  scaleFactor: number;
  /**
   * Rotation angle
   */
  rotation: Rotation;
}

/**
 * Pdf editor canvas for pdf page, used for drawing path on pdf page
 * @param props - properties of PdfEditorCanvas
 * @returns
 *
 * @public
 */
export function PdfPageEditorCanvas(props: PdfPageEditorCanvasProps) {
  const { page, scaleFactor, rotation } = props;

  const style = useMemo(() => {
    const size = transformSize(page.size, rotation, scaleFactor);
    return {
      width: size.width,
      height: size.height,
    };
  }, [page, rotation, scaleFactor]);

  const drawableRef = useRef<DrawableHandle | null>(null);

  const { exec, annotationTool } = usePdfEditor();

  const addPath = useCallback(
    (path: DrawablePath) => {
      const pageSize = transformSize(page.size, rotation, scaleFactor);
      const rect = restoreRect(
        pageSize,
        calculateBoundingRect([path]),
        rotation,
        scaleFactor,
      );
      exec({
        id: `${Date.now()}.${Math.random()}`,
        action: 'create',
        page,
        annotation: {
          status: PdfAnnotationObjectStatus.Created,
          pageIndex: page.index,
          id: Date.now(),
          type: PdfAnnotationSubtype.INK,
          rect,
          inkList: [
            {
              points: path.points.map((point) => {
                return restorePosition(pageSize, point, rotation, scaleFactor);
              }),
            },
          ],
          appearances: {
            normal: '',
            rollover: '',
            down: '',
          },
        },
      });
      drawableRef.current?.clearCanvas();
    },
    [page, exec, rotation, scaleFactor],
  );

  return (
    <Drawable
      className={classNames(
        'pdf__editor__canvas',
        annotationTool === PdfAnnotationTool.Pencil
          ? 'pdf__editor__canvas--active'
          : 'pdf__editor__canvas--inactive',
      )}
      data-testid={`pdf__editor__canvas__${page.index}`}
      componentRef={drawableRef}
      width={style.width}
      height={style.height}
      onAddPath={addPath}
    />
  );
}
