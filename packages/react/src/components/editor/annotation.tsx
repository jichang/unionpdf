import { PdfAnnotationObject, PdfAnnotationSubtype } from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { ComponentProps, useCallback } from 'react';
import './annotation.css';
import {
  PdfPageInkAnnotation,
  PdfPageLineAnnotation,
  PdfPagePolygonAnnotation,
  PdfPagePolylineAnnotation,
  PdfPageHighlightAnnotation,
  PdfPageStampAnnotation,
  PdfPageCircleAnnotation,
  PdfPageSquareAnnotation,
  PdfPageFreeTextAnnotation,
  PdfPageSquigglyAnnotation,
  PdfPageUnderlineAnnotation,
  PdfPageCaretAnnotation,
  PdfPageStrikeOutAnnotation,
} from '../annotations';
import classNames from 'classnames';
import { PdfAnnotationTool, usePdfEditor } from './editor.context';
import { PdfPageAnnotation } from '../common';
import { Position } from '@unionpdf/models';
import { usePdfDrag } from './drag.context';

export const ResizablePdfAnnotationSubTypes = [
  PdfAnnotationSubtype.INK,
  PdfAnnotationSubtype.LINE,
  PdfAnnotationSubtype.STAMP,
  PdfAnnotationSubtype.POLYGON,
  PdfAnnotationSubtype.POLYLINE,
];

export interface PdfPageEditorAnnotationProps {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageEditorAnnotation(props: PdfPageEditorAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;

  const { annotationTool, exec } = usePdfEditor();

  const handleKeyUp = useCallback(
    (evt: React.KeyboardEvent) => {
      if (evt.key === 'Delete' || evt.key === 'Backspace') {
        exec({
          id: `${Date.now()}.${Math.random()}`,
          action: 'remove',
          annotation,
        });
      }
    },
    [annotation, page, exec]
  );

  let content: React.ReactElement | null = null;
  switch (annotation.type) {
    case PdfAnnotationSubtype.INK:
      content = (
        <PdfPageInkAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.POLYGON:
      content = (
        <PdfPagePolygonAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.POLYLINE:
      content = (
        <PdfPagePolylineAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.LINE:
      content = (
        <PdfPageLineAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.HIGHLIGHT:
      content = (
        <PdfPageHighlightAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.STAMP:
      content = (
        <PdfPageStampAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.CIRCLE:
      content = (
        <PdfPageCircleAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.SQUARE:
      content = (
        <PdfPageSquareAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.SQUIGGLY:
      content = (
        <PdfPageSquigglyAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.UNDERLINE:
      content = (
        <PdfPageUnderlineAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.CARET:
      content = (
        <PdfPageCaretAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.STRIKEOUT:
      content = (
        <PdfPageStrikeOutAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.FREETEXT:
      content = (
        <PdfPageFreeTextAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    default:
      content = null;
  }

  const isSelection = annotationTool === PdfAnnotationTool.Selection;
  const isResizable = ResizablePdfAnnotationSubTypes.includes(annotation.type);

  return (
    <PdfPageAnnotation
      page={page}
      className={classNames('pdf__annotation--editor')}
      annotation={annotation}
      scaleFactor={scaleFactor}
      tabIndex={0}
      rotation={rotation}
      onKeyUp={handleKeyUp}
    >
      <PdfPageAnnotationMover annotation={annotation}>
        {content}
      </PdfPageAnnotationMover>
      {isSelection && isResizable ? (
        <>
          <PdfPageAnnotationResizer
            annotation={annotation}
            position={ResizerPosition.TopLeft}
          />
          <PdfPageAnnotationResizer
            annotation={annotation}
            position={ResizerPosition.TopRight}
          />
          <PdfPageAnnotationResizer
            annotation={annotation}
            position={ResizerPosition.BottomRight}
          />
          <PdfPageAnnotationResizer
            annotation={annotation}
            position={ResizerPosition.BottomLeft}
          />
        </>
      ) : null}
    </PdfPageAnnotation>
  );
}

export interface PdfDraggableMoverData {
  type: 'mover';
  annotation: PdfAnnotationObject;
  startPosition: Position;
  cursorPosition: Position;
}

export interface PdfPageAnnotationMoverProps extends ComponentProps<'div'> {
  annotation: PdfAnnotationObject;
}

export function PdfPageAnnotationMover(props: PdfPageAnnotationMoverProps) {
  const { annotation, className, children, ...rest } = props;

  const { exec } = usePdfEditor();
  const { setDraggableData } = usePdfDrag();

  const handlePointerDown = useCallback(
    (evt: React.PointerEvent) => {
      const startPosition = {
        x: evt.pageX,
        y: evt.pageY,
      };
      const cursorPosition = {
        x: evt.nativeEvent.offsetX,
        y: evt.nativeEvent.offsetY,
      };

      setDraggableData({
        type: 'mover',
        annotation,
        startPosition,
        cursorPosition,
      });

      exec({
        id: `${Date.now()}.${Math.random()}`,
        action: 'transform',
        annotation,
        params: {
          offset: { x: 0, y: 0 },
          scale: { width: 1, height: 1 },
        },
      });
    },
    [annotation, setDraggableData]
  );

  const handlePointerUp = useCallback(() => {
    setDraggableData(null);
  }, [setDraggableData]);

  const handlePointerCancel = useCallback(() => {
    setDraggableData(null);
  }, [setDraggableData]);

  return (
    <div
      className={classNames('pdf__annotation__mover', className)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      {...rest}
    >
      {children}
    </div>
  );
}

export enum ResizerPosition {
  TopLeft = 0,
  TopRight = 1,
  BottomRight = 2,
  BottomLeft = 3,
}

export interface PdfDraggableResizerData {
  type: 'resizer';
  annotation: PdfAnnotationObject;
  startPosition: Position;
  cursorPosition: Position;
  position: ResizerPosition;
}

export interface PdfPageAnnotationResizerProps
  extends ComponentProps<'button'> {
  annotation: PdfAnnotationObject;
  position: ResizerPosition;
}

export const ResizerPositionClassName = {
  [ResizerPosition.TopLeft]: 'topleft',
  [ResizerPosition.TopRight]: 'topright',
  [ResizerPosition.BottomRight]: 'bottomright',
  [ResizerPosition.BottomLeft]: 'bottomleft',
};

export function PdfPageAnnotationResizer(props: PdfPageAnnotationResizerProps) {
  const { annotation, position, className, children, ...rest } = props;

  const { exec } = usePdfEditor();
  const { setDraggableData } = usePdfDrag();

  const handlePointerDown = useCallback(
    (evt: React.PointerEvent) => {
      const startPosition = {
        x: evt.pageX,
        y: evt.pageY,
      };

      const cursorPosition = {
        x: evt.nativeEvent.offsetX,
        y: evt.nativeEvent.offsetY,
      };

      setDraggableData({
        type: 'resizer',
        annotation,
        startPosition,
        cursorPosition,
        position,
      });

      exec({
        id: `${Date.now()}.${Math.random()}`,
        action: 'transform',
        annotation,
        params: {
          offset: { x: 0, y: 0 },
          scale: { width: 1, height: 1 },
        },
      });
    },
    [annotation, position, exec, setDraggableData]
  );

  const handlePointerUp = useCallback(() => {
    setDraggableData(null);
  }, [setDraggableData]);

  const handlePointerCancel = useCallback(() => {
    setDraggableData(null);
  }, [setDraggableData]);

  return (
    <button
      className={classNames(
        'pdf__annotation__resizer',
        `pdf__annotation__resizer--${ResizerPositionClassName[position]}`,
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      {...rest}
    >
      +
    </button>
  );
}
