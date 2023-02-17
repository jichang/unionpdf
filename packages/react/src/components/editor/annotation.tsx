import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  PdfAnnotationSubtypeName,
} from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { useCallback, useState } from 'react';
import './annotation.css';
import { calculateRectStyle } from '../helpers/annotation';
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
import { usePdfEditor } from './editor.context';
import { PdfPageAnnotation } from '../common';
import { Position } from '@unionpdf/models';
import { serialze } from '../helpers/editor';

export interface DraggableAnnotationData {
  type: 'annotation';
  annotation: string;
  pageIndex: number;
  startPosition: Position;
  cursorPosition: Position;
}

export interface PdfPageEditorAnnotationProps {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageEditorAnnotation(props: PdfPageEditorAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;
  const style = calculateRectStyle(annotation.rect, scaleFactor, rotation);

  const { exec } = usePdfEditor();

  const handleKeyUp = useCallback(
    (evt: React.KeyboardEvent) => {
      if (evt.key === 'Delete' || evt.key === 'Backspace') {
        exec({
          id: `${Date.now()}.${Math.random()}`,
          pageIndex: page.index,
          action: 'remove',
          annotation,
        });
      }
    },
    [annotation, page, exec]
  );

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const draggableData = {
        type: 'annotation',
        pageIndex: page.index,
        annotation: serialze(annotation),
        startPosition: {
          x: evt.nativeEvent.pageX,
          y: evt.nativeEvent.pageY,
        },
        cursorPosition: {
          x: evt.nativeEvent.offsetX,
          y: evt.nativeEvent.offsetY,
        },
      };
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.setData(
        'application/json',
        JSON.stringify(draggableData)
      );
    },
    [page, annotation]
  );

  const handleDrag = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.dataTransfer.dropEffect = 'move';
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const handleDragEnd = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      setIsDragging(false);
    },
    [setIsDragging]
  );

  let content: React.ReactElement | null = null;
  switch (annotation.type) {
    case PdfAnnotationSubtype.INK:
      content = (
        <PdfPageInkAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.INK:
      content = (
        <PdfPageInkAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.POLYGON:
      content = (
        <PdfPagePolygonAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.POLYLINE:
      content = (
        <PdfPagePolylineAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.LINE:
      content = (
        <PdfPageLineAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.HIGHLIGHT:
      content = (
        <PdfPageHighlightAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.STAMP:
      content = (
        <PdfPageStampAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.CIRCLE:
      content = (
        <PdfPageCircleAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.SQUARE:
      content = (
        <PdfPageSquareAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.SQUIGGLY:
      content = (
        <PdfPageSquigglyAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.UNDERLINE:
      content = (
        <PdfPageUnderlineAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.CARET:
      content = (
        <PdfPageCaretAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.STRIKEOUT:
      content = (
        <PdfPageStrikeOutAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    case PdfAnnotationSubtype.FREETEXT:
      content = (
        <PdfPageFreeTextAnnotation
          key={annotation.id}
          annotation={annotation}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <PdfPageAnnotation
      page={page}
      className={classNames(
        'pdf__annotation--editor',
        `pdf__annotation--${PdfAnnotationSubtypeName[annotation.type]}`,
        {
          'pdf__annotation--dragging': isDragging,
        }
      )}
      annotation={annotation}
      scaleFactor={scaleFactor}
      tabIndex={0}
      rotation={rotation}
      onKeyUp={handleKeyUp}
      draggable={true}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      {content}
    </PdfPageAnnotation>
  );
}
