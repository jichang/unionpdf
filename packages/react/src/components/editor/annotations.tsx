import {
  PdfAnnotationSubtype,
  Position,
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
import { calculateTransformation, deserialize } from '../helpers/editor';
import { rotateImageData } from '../helpers/image';
import {
  DraggableAnnotationData,
  PdfPageAnnotationResizerPosition,
  PdfPageEditorAnnotation,
} from './annotation';
import './annotations.css';
import {
  CACHE_LOG_SOURCE,
  PdfAnnotationMark,
  usePdfCache,
} from './cache.context';
import { usePdfEditor } from './editor.context';
import { DraggableStampData } from './stamps';
import { usePdfEditorStamps } from './stamps.context';

export type DraggableData = DraggableStampData;

export enum PointerEventPurpose {
  None,
  Moving,
  Resizing,
}

export interface PdfEditorAnnotationsProps {
  page: PdfPageObject;
  annotations: PdfAnnotationObject[];
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorAnnotations(props: PdfEditorAnnotationsProps) {
  const { page, annotations, scaleFactor, rotation } = props;

  const logger = useLogger();
  const { setAnnotation, getAnnotation } = usePdfCache();
  const { exec, replace } = usePdfEditor();

  const { stamps } = usePdfEditorStamps();
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
          pageIndex: page.index,
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

  const pointerEventPurpose = useRef(PointerEventPurpose.None);
  const startPositionRef = useRef<Position | null>(null);

  const handlePointerDown = useCallback(
    (evt: React.PointerEvent) => {
      logger.debug(
        CACHE_LOG_SOURCE,
        'PointerEvent',
        'pointer down',
        evt.nativeEvent
      );
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

      const draggableType = target.dataset.draggableType;

      switch (draggableType) {
        case 'mover':
          pointerEventPurpose.current = PointerEventPurpose.Moving;
          break;
        case 'resizer':
          pointerEventPurpose.current = PointerEventPurpose.Resizing;
          break;
        default:
          pointerEventPurpose.current = PointerEventPurpose.None;
          break;
      }

      if (pointerEventPurpose.current === PointerEventPurpose.None) {
        return;
      }

      setAnnotation(PdfAnnotationMark.Dragging, annotation);

      startPositionRef.current = {
        x: evt.nativeEvent.pageX,
        y: evt.nativeEvent.pageY,
      };

      exec({
        id: `${Date.now()}.${Math.random()}`,
        pageIndex: page.index,
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
    [logger, page, annotations, exec, setAnnotation]
  );

  const handlePointerMove = useCallback(
    (evt: React.PointerEvent) => {
      if (pointerEventPurpose.current === PointerEventPurpose.None) {
        return;
      }

      const startPosition = startPositionRef.current;
      if (!startPosition) {
        return;
      }

      const annotation = getAnnotation(PdfAnnotationMark.Dragging);
      if (!annotation) {
        return;
      }

      const target = evt.nativeEvent.target as HTMLDivElement;
      if (pointerEventPurpose.current === PointerEventPurpose.Moving) {
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
          pageIndex: page.index,
          action: 'transform',
          annotation,
          params: {
            offset: restoreOffset(offset, rotation, scaleFactor),
            scale: { width: 1, height: 1 },
          },
        });
      } else if (pointerEventPurpose.current === PointerEventPurpose.Resizing) {
        const endPosition = {
          x: evt.nativeEvent.pageX,
          y: evt.nativeEvent.pageY,
        };
        const offset = {
          x: endPosition.x - startPosition.x,
          y: endPosition.y - startPosition.y,
        };

        const { rect } = annotation;

        const resizerPosition = Number(
          target.dataset.resizerPosition
        ) as PdfPageAnnotationResizerPosition;

        const transformation = calculateTransformation(
          rect,
          offset,
          rotation,
          resizerPosition
        );

        replace({
          id: `${Date.now()}.${Math.random()}`,
          pageIndex: page.index,
          action: 'transform',
          annotation,
          params: transformation,
        });
      }

      logger.debug(
        CACHE_LOG_SOURCE,
        'PointerEvent',
        'pointer move',
        evt.nativeEvent
      );
    },
    [logger, page, getAnnotation, replace]
  );

  const handlePointerUp = useCallback(
    (evt: React.PointerEvent) => {
      if (pointerEventPurpose.current === PointerEventPurpose.None) {
        return;
      }

      pointerEventPurpose.current = PointerEventPurpose.None;
      startPositionRef.current = null;
      setAnnotation(PdfAnnotationMark.Dragging, undefined);
    },
    [setAnnotation]
  );

  const handlePointerEnter = useCallback((evt: React.PointerEvent) => {
    if (pointerEventPurpose.current === PointerEventPurpose.None) {
      return;
    }

    console.log('pointer enter', evt.nativeEvent);
  }, []);

  const handlePointerLeave = useCallback((evt: React.PointerEvent) => {
    if (pointerEventPurpose.current === PointerEventPurpose.None) {
      return;
    }

    console.log('pointer leave', evt.nativeEvent);
  }, []);

  const handlePointerOut = useCallback((evt: React.PointerEvent) => {
    if (pointerEventPurpose.current === PointerEventPurpose.None) {
      return;
    }

    console.log('pointer out', evt.nativeEvent);
  }, []);
  const handlePointerCancel = useCallback((evt: React.PointerEvent) => {
    if (pointerEventPurpose.current === PointerEventPurpose.None) {
      return;
    }

    console.log('pointer cancel', evt.nativeEvent);
  }, []);

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
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerOut={handlePointerOut}
        onPointerCancel={handlePointerCancel}
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
