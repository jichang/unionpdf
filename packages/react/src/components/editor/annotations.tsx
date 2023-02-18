import {
  PdfAnnotationSubtype,
  restoreOffset,
  restoreRect,
  transformSize,
} from '@unionpdf/models';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import {
  PdfPageAnnotations,
  PdfPageAnnotationComponentContextProvider,
} from '../common';
import { deserialize } from '../helpers/editor';
import { rotateImageData } from '../helpers/image';
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
        const draggableData = JSON.parse(data) as DraggableData;

        if (draggableData.type === 'annotation') {
          const { pageIndex, startPosition } = draggableData;
          const annotation = deserialize(draggableData.annotation);

          const isDroppedInSamePage = page.index === pageIndex;

          const stopPosition = {
            x: evt.nativeEvent.offsetX,
            y: evt.nativeEvent.offsetY,
          };
          const offset = {
            x: stopPosition.x - startPosition.x,
            y: stopPosition.y - startPosition.y,
          };
          console.log(startPosition, stopPosition, offset);
          if (isDroppedInSamePage) {
            exec({
              id: `${Date.now()}.${Math.random()}`,
              pageIndex: page.index,
              action: 'transform',
              annotation,
              tranformation: {
                type: 'translate',
                offset: restoreOffset(offset, rotation, scaleFactor),
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
                offset: restoreOffset(offset, rotation, scaleFactor),
              },
            });
          }
        } else if (draggableData.type === 'stamp') {
          const { index, cursorPosition } = draggableData;
          const stamp = stamps[index];
          const size = {
            width: stamp.source.width,
            height: stamp.source.height,
          };
          const origin = {
            x: evt.nativeEvent.offsetX - cursorPosition.x,
            y: evt.nativeEvent.offsetY - cursorPosition.y,
          };
          const rect = restoreRect(
            transformSize(page.size, rotation, scaleFactor),
            {
              origin,
              size,
            },
            rotation,
            scaleFactor
          );

          const content = rotateImageData(stamp.source, rotation);

          exec({
            id: `${Date.now()}.${Math.random()}`,
            pageIndex: page.index,
            action: 'create',
            annotation: {
              id: Date.now(),
              type: PdfAnnotationSubtype.STAMP,
              content,
              rect,
            },
          });
        }
      }
    },
    [exec, page, annotations, scaleFactor, rotation, stamps]
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
