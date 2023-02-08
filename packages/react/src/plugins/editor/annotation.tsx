import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  Position,
} from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { useCallback, useRef, useState } from 'react';
import './annotation.css';
import { calculateRectStyle } from '../helpers/annotation';
import { PdfPageAnnotation, PdfPageInkAnnotation } from '../annotations';
import classNames from 'classnames';
import { usePdfEditor } from './editor.context';

export const ItemTypes = {
  Annotation: 'annotation',
};

export interface PdfEditorAnnotationProps {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorAnnotation(props: PdfEditorAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;
  const style = calculateRectStyle(annotation.rect, scaleFactor, rotation);

  const containerRef = useRef<HTMLDivElement>(null);
  const { tool, exec } = usePdfEditor();

  const handleKeyUp = useCallback(
    (evt: React.KeyboardEvent) => {
      if (evt.key === 'Delete') {
        exec({
          id: `${Date.now()}.${Math.random}`,
          pageIndex: page.index,
          action: 'remove',
          annotation,
        });
      }
    },
    [annotation, page, exec]
  );

  const [isDragging, setIsDragging] = useState(false);
  const startPointRef = useRef<Position | null>();

  const handleDragStart = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      startPointRef.current = {
        x: evt.screenX,
        y: evt.screenY,
      };
      evt.dataTransfer.dropEffect = 'move';
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const handleDrag = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.dataTransfer.dropEffect = 'move';
    },
    [setIsDragging]
  );

  const handleDragEnd = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      if (startPointRef.current) {
        const offset = {
          x: evt.screenX - startPointRef.current.x,
          y: evt.screenY - startPointRef.current.y,
        };

        exec({
          id: `${Date.now()}.${Math.random}`,
          pageIndex: page.index,
          action: 'transition',
          annotation,
          offset,
        });
      }
      setIsDragging(false);
    },
    [setIsDragging, annotation, page, exec]
  );

  let content = null;
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
    default:
      content = null;
  }

  return (
    <PdfPageAnnotation
      page={page}
      className={classNames('pdf__annotation--editor', {
        'pdf__annotation--dragging': isDragging,
      })}
      annotation={annotation}
      scaleFactor={scaleFactor}
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
