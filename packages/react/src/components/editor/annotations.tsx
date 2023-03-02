import {
  PdfAnnotationSubtype,
  restoreOffset,
  restoreRect,
  transformPosition,
  transformSize,
} from '@unionpdf/models';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import { useLogger } from '../../core';
import {
  PdfPageAnnotations,
  PdfPageAnnotationComponentContextProvider,
} from '../common';
import { calculateTransformation, clone } from '../helpers/editor';
import { rotateImageData } from '../helpers/image';
import { PdfPageEditorAnnotation } from './annotation';
import './annotations.css';
import { usePdfDrag } from './drag.context';
import { usePdfEditor } from './editor.context';
import { DraggableStampData } from './stamps';
import { usePdfEditorStamps } from './stamps.context';

export const EDITOR_ANNOTATIONS_LOG_SOURCE = 'PdfEditorAnnotations';

export interface PdfEditorAnnotationsProps {
  page: PdfPageObject;
  annotations: PdfAnnotationObject[];
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorAnnotations(props: PdfEditorAnnotationsProps) {
  const { page, annotations, scaleFactor, rotation } = props;

  const logger = useLogger();
  const { exec, replace } = usePdfEditor();

  const { stamps } = usePdfEditorStamps();
  const [isDropTarget, setIsDropTarget] = useState(false);

  const handleDragEnter = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains('pdf__annotations--editor')) {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsDropTarget(true);
      }
    },
    [setIsDropTarget]
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
        setIsDropTarget(false);
      }
    },
    [setIsDropTarget]
  );

  const handleDrop = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();

      const data = evt.dataTransfer.getData('application/json');
      if (data) {
        const draggableData = JSON.parse(data) as DraggableStampData;

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
          action: 'create',
          annotation: {
            pageIndex: page.index,
            id: Date.now(),
            type: PdfAnnotationSubtype.STAMP,
            content,
            rect,
          },
        });
      }
    },
    [exec, page, annotations, scaleFactor, rotation, stamps]
  );

  const { draggableData } = usePdfDrag();

  const handlePointerMove = useCallback(
    (evt: React.PointerEvent) => {
      if (!draggableData) {
        return;
      }

      logger.debug(
        EDITOR_ANNOTATIONS_LOG_SOURCE,
        'PointerEvent',
        'pointer move',
        draggableData,
        evt.nativeEvent
      );

      switch (draggableData.type) {
        case 'mover':
          {
            const { startPosition, annotation } = draggableData;
            const endPosition = {
              x: evt.nativeEvent.pageX,
              y: evt.nativeEvent.pageY,
            };
            const offset = {
              x: endPosition.x - startPosition.x,
              y: endPosition.y - startPosition.y,
            };

            replace({
              id: `${Date.now()}.${Math.random()}`,
              action: 'transform',
              annotation,
              params: {
                offset: restoreOffset(offset, rotation, scaleFactor),
                scale: { width: 1, height: 1 },
              },
            });
          }
          break;
        case 'resizer':
          {
            const { startPosition, annotation, position } = draggableData;
            const endPosition = {
              x: evt.nativeEvent.pageX,
              y: evt.nativeEvent.pageY,
            };
            const offset = {
              x: endPosition.x - startPosition.x,
              y: endPosition.y - startPosition.y,
            };

            const { rect } = annotation;

            const transformation = calculateTransformation(
              rect,
              offset,
              rotation,
              position
            );

            replace({
              id: `${Date.now()}.${Math.random()}`,
              action: 'transform',
              annotation,
              params: transformation,
            });
          }
          break;
      }
    },
    [logger, page, draggableData, replace]
  );

  const handlePointerEnter = useCallback(
    (evt: React.PointerEvent) => {
      logger.debug(
        EDITOR_ANNOTATIONS_LOG_SOURCE,
        'pointer enter',
        draggableData,
        evt.nativeEvent
      );
      const target = evt.target as HTMLElement;
      if (!target.classList.contains('pdf__annotations--editor')) {
        return;
      }

      if (!draggableData || draggableData.type !== 'mover') {
        return;
      }

      const { annotation, startPosition, cursorPosition } = draggableData;

      const offset = {
        x: evt.pageX - evt.nativeEvent.offsetX - cursorPosition.x,
        y: evt.pageY - evt.nativeEvent.offsetY - cursorPosition.y,
      };

      const newAnnotation: PdfAnnotationObject = clone(annotation);
      newAnnotation.rect.origin = restoreOffset(offset, rotation, scaleFactor);

      exec({
        id: `${Date.now()}.${Math.random()}`,
        action: 'create',
        annotation: newAnnotation,
      });

      exec({
        id: `${Date.now()}.${Math.random()}`,
        action: 'transform',
        annotation: newAnnotation,
        params: {
          offset: { x: 0, y: 0 },
          scale: { width: 1, height: 1 },
        },
      });

      setIsDropTarget(true);
    },
    [logger, page, rotation, scaleFactor, draggableData, setIsDropTarget]
  );

  const handlePointerLeave = useCallback(
    (evt: React.PointerEvent) => {
      logger.debug(
        EDITOR_ANNOTATIONS_LOG_SOURCE,
        'pointer leave',
        draggableData,
        evt.nativeEvent
      );
      const target = evt.target as HTMLElement;
      if (!target.classList.contains('pdf__annotations--editor')) {
        return;
      }

      if (!draggableData || draggableData.type !== 'mover') {
        return;
      }

      exec({
        id: `${Date.now()}.${Math.random()}`,
        action: 'remove',
        annotation: draggableData.annotation,
      });

      setIsDropTarget(false);
    },
    [logger, setIsDropTarget, exec, draggableData]
  );

  return (
    <PdfPageAnnotationComponentContextProvider
      component={PdfPageEditorAnnotation}
    >
      <div
        className={classNames('pdf__annotations--editor', {
          'pdf__annotations--droptarget': isDropTarget,
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
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
