import { PdfAnnotationSubtype } from '@unionpdf/models';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import {
  PdfPageAnnotations,
  PdfPageAnnotationComponentContextProvider,
} from '../common';
import { DraggableAnnotationData, PdfPageEditorAnnotation } from './annotation';
import './annotations.css';
import { usePdfEditor } from './editor.context';
import { DraggableStampData } from './stamps';
import { usePdfEditorStamps } from './stamps.context';

export type DraggableData = DraggableAnnotationData | DraggableStampData;

export interface PdfEditorAnnotationsProps {
  page: PdfPageObject;
  annotations: PdfAnnotationObject[];
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorAnnotations(props: PdfEditorAnnotationsProps) {
  const { page, annotations, scaleFactor, rotation } = props;

  const [isOver, setIsOver] = useState(false);

  const handleDragEnter = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains('pdf__annotations--editor')) {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsOver(true);
      }
    },
    [setIsOver]
  );

  const handleDragOver = useCallback((evt: React.DragEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains('pdf__annotations--editor')) {
      evt.preventDefault();
    }
  }, []);

  const handleDragLeave = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains('pdf__annotations--editor')) {
        evt.preventDefault();
        setIsOver(false);
      }
    },
    [setIsOver]
  );

  const { exec } = usePdfEditor();
  const { stamps } = usePdfEditorStamps();
  const handleDrop = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();

      const data = evt.dataTransfer.getData('application/json');
      if (data) {
        const stopPosition = {
          x: evt.nativeEvent.pageX,
          y: evt.nativeEvent.pageY,
        };
        const draggableData = JSON.parse(data) as DraggableData;

        if (draggableData.type === 'annotation') {
          const { pageIndex, annotation, startPosition, cursorPosition } =
            draggableData;
          if (page.index === pageIndex) {
            exec({
              id: `${Date.now()}.${Math.random()}`,
              pageIndex: page.index,
              action: 'transform',
              annotation,
              tranformation: {
                type: 'translate',
                offset: {
                  x: stopPosition.x - startPosition.x,
                  y: stopPosition.y - startPosition.y,
                },
              },
            });
          } else {
            exec({
              id: `${Date.now()}.${Math.random()}`,
              pageIndex: pageIndex,
              action: 'remove',
              annotation,
            });
            exec({
              id: `${Date.now()}.${Math.random()}`,
              pageIndex: page.index,
              action: 'create',
              annotation,
            });
            exec({
              id: `${Date.now()}.${Math.random()}`,
              pageIndex: page.index,
              action: 'transform',
              annotation,
              tranformation: {
                type: 'translate',
                offset: {
                  x:
                    evt.nativeEvent.offsetX -
                    annotation.rect.origin.x -
                    cursorPosition.x,
                  y:
                    evt.nativeEvent.offsetY -
                    annotation.rect.origin.y -
                    cursorPosition.y,
                },
              },
            });
          }
        } else if (draggableData.type === 'stamp') {
          const { index, cursorPosition } = draggableData;
          const stamp = stamps[index];

          exec({
            id: `${Date.now()}.${Math.random()}`,
            pageIndex: page.index,
            action: 'create',
            annotation: {
              id: Date.now(),
              type: PdfAnnotationSubtype.STAMP,
              content: stamp.source,
              rect: {
                origin: {
                  x: evt.nativeEvent.offsetX - cursorPosition.x,
                  y: evt.nativeEvent.offsetY - cursorPosition.y,
                },
                size: {
                  width: stamp.source.width,
                  height: stamp.source.height,
                },
              },
            },
          });
        }
      }
    },
    [exec, page, annotations, stamps]
  );

  return (
    <PdfPageAnnotationComponentContextProvider
      component={PdfPageEditorAnnotation}
    >
      <div
        className={classNames('pdf__annotations--editor', {
          'pdf__annotations--droptarget': isOver,
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <PdfPageAnnotations
          annotations={annotations}
          page={page}
          scaleFactor={scaleFactor}
          rotation={rotation}
        />
      </div>
    </PdfPageAnnotationComponentContextProvider>
  );
}
