import {
  PdfAnnotationSubtype,
  restoreOffset,
  restoreRect,
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
import { calculateTransformation } from '../helpers/editor';
import { rotateImageData } from '../helpers/image';
import { PdfPageEditorAnnotation } from './annotation';
import './annotations.css';
import { DraggableType, ResizerPosition, usePdfDrag } from './drag.context';
import { LOG_SOURCE, usePdfEditor } from './editor.context';
import { DraggableStampData } from './stamps';
import { usePdfEditorStamps } from './stamps.context';

export type DraggableData = DraggableStampData;

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
        const draggableData = JSON.parse(data) as DraggableData;

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

  const {
    setAnnotation,
    setDraggableType,
    setResizerPosition,
    setStartPosition,
    draggableType,
    resizerPosition,
    annotation,
    startPosition,
  } = usePdfDrag();

  const handlePointerDown = useCallback(
    (evt: React.PointerEvent) => {
      const target = evt.nativeEvent.target as HTMLDivElement;

      const annotationId = target.dataset.annotationId;
      if (!annotationId) {
        return;
      }

      const annotation = annotations.find((annotation) => {
        return annotation.id === Number(annotationId);
      });
      if (!annotation) {
        return;
      }

      const draggableTypeName = target.dataset.draggableType;

      let draggableType = DraggableType.None;
      switch (draggableTypeName) {
        case 'mover':
          draggableType = DraggableType.Mover;
          break;
        case 'resizer':
          draggableType = DraggableType.Resizer;
          break;
        default:
          break;
      }

      if (draggableType === DraggableType.None) {
        return;
      }

      logger.debug(
        EDITOR_ANNOTATIONS_LOG_SOURCE,
        'PointerEvent',
        'pointer down',
        evt.nativeEvent
      );

      setDraggableType(draggableType);
      if (draggableType === DraggableType.Resizer) {
        const resizerPositionName = target.dataset.resizerPosition;
        const resizerPosition = Number(resizerPositionName) as ResizerPosition;
        setResizerPosition(resizerPosition);
      }

      setAnnotation(annotation);

      setStartPosition({
        x: evt.nativeEvent.pageX,
        y: evt.nativeEvent.pageY,
      });

      exec({
        id: `${Date.now()}.${Math.random()}`,
        action: 'transform',
        annotation,
        params: {
          offset: {
            x: 0,
            y: 0,
          },
          scale: {
            width: 1,
            height: 1,
          },
        },
      });
    },
    [
      logger,
      page,
      annotations,
      exec,
      setAnnotation,
      setDraggableType,
      setResizerPosition,
      setStartPosition,
    ]
  );

  const handlePointerMove = useCallback(
    (evt: React.PointerEvent) => {
      if (draggableType === DraggableType.None) {
        return;
      }

      if (!startPosition) {
        return;
      }

      if (!annotation) {
        return;
      }

      logger.debug(
        EDITOR_ANNOTATIONS_LOG_SOURCE,
        'PointerEvent',
        'pointer move',
        draggableType,
        evt.pageX,
        evt.pageY,
        startPosition
      );

      if (draggableType === DraggableType.Mover) {
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
      } else if (draggableType === DraggableType.Resizer) {
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
          resizerPosition
        );

        replace({
          id: `${Date.now()}.${Math.random()}`,
          action: 'transform',
          annotation,
          params: transformation,
        });
      }
    },
    [
      logger,
      page,
      annotation,
      draggableType,
      startPosition,
      resizerPosition,
      replace,
    ]
  );

  const handlePointerUp = useCallback(
    (evt: React.PointerEvent) => {
      logger.debug(
        EDITOR_ANNOTATIONS_LOG_SOURCE,
        'PointerEvent',
        'pointer up',
        evt.nativeEvent
      );

      if (draggableType === DraggableType.None) {
        return;
      }

      setDraggableType(DraggableType.None);
      setStartPosition(null);
      setAnnotation(null);
    },
    [logger, draggableType, setDraggableType, setStartPosition, setAnnotation]
  );

  const handlePointerCancel = useCallback(
    (evt: React.PointerEvent) => {
      logger.debug(
        EDITOR_ANNOTATIONS_LOG_SOURCE,
        'pointer cancel',
        evt.nativeEvent
      );

      setDraggableType(DraggableType.None);
      setStartPosition(null);
      setAnnotation(null);
    },
    [logger, setDraggableType, setStartPosition, setAnnotation]
  );

  const handlePointerEnter = useCallback(
    (evt: React.PointerEvent) => {
      if (draggableType !== DraggableType.Mover || !annotation) {
        return;
      }
      console.log('pointer enter', evt.nativeEvent);

      const newAnnotation: PdfAnnotationObject = {
        ...annotation,
        id: Date.now(),
        pageIndex: page.index,
        rect: {
          origin: {
            x: 0,
            y: 0,
          },
          size: {
            width: annotation.rect.size.width,
            height: annotation.rect.size.height,
          },
        },
      };

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

      setAnnotation(newAnnotation);
      setIsDropTarget(true);
    },
    [setIsDropTarget, draggableType, page, annotation, setAnnotation]
  );

  const handlePointerLeave = useCallback(
    (evt: React.PointerEvent) => {
      if (draggableType !== DraggableType.Mover || !annotation) {
        return;
      }

      console.log('pointer leave', evt.nativeEvent);

      exec({
        id: `${Date.now()}.${Math.random()}`,
        action: 'remove',
        annotation,
      });

      setIsDropTarget(false);
    },
    [setIsDropTarget, exec, annotation]
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
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerCancel={handlePointerCancel}
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
