import { PdfAnnotationObject, PdfAnnotationSubtype } from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { useCallback, useState } from 'react';
import './annotation.css';
import { calculateRectStyle } from '../helpers/annotation';
import { PdfPageAnnotation, PdfPageInkAnnotation } from '../annotations';
import classNames from 'classnames';
import { usePdfEditor } from './editor.context';

export interface PdfEditorAnnotationProps {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorAnnotation(props: PdfEditorAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;
  const style = calculateRectStyle(annotation.rect, scaleFactor, rotation);

  const { exec } = usePdfEditor();

  const handleKeyUp = useCallback(
    (evt: React.KeyboardEvent) => {
      if (evt.key === 'Delete') {
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
      const target = evt.nativeEvent.target as HTMLDivElement;
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.setData(
        'application/json',
        JSON.stringify({
          pageIndex: page.index,
          annotation,
          startPosition: {
            x: evt.nativeEvent.pageX,
            y: evt.nativeEvent.pageY,
          },
          cursorPosition: {
            x: evt.nativeEvent.offsetX,
            y: evt.nativeEvent.offsetY,
          },
        })
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
