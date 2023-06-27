import {
  PdfAnnotationObjectStatus,
  PdfAnnotationSubtype,
  PdfPageObjectType,
  Position,
  restoreOffset,
  restoreRect,
  transformSize,
} from '@unionpdf/models';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useLogger } from '../../core';
import {
  PdfPageAnnotations,
  PdfPageAnnotationComponentContextProvider,
} from '../common';
import { apply, calculateTransformation, clone } from '../helpers/editor';
import { rotateImageData } from '../helpers/image';
import { PdfPageEditorAnnotation } from './annotation';
import './annotations.css';
import { Operation, usePdfEditor } from './editor.context';
import { DraggableStampData } from './stamps';
import { usePdfEditorStamps } from './stamps.context';
import {
  AnnotationsContext,
  DraggableData,
  DraggableOption,
} from './annotations.context';

export const EDITOR_ANNOTATIONS_LOG_SOURCE = 'PdfEditorAnnotations';

export interface PdfPageEditorAnnotationsProps {
  page: PdfPageObject;
  annotations: PdfAnnotationObject[];
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageEditorAnnotations(props: PdfPageEditorAnnotationsProps) {
  const { page, annotations, scaleFactor, rotation } = props;

  const logger = useLogger();
  const { exec } = usePdfEditor();

  const { stamps } = usePdfEditorStamps();
  const [isDropTarget, setIsDropTarget] = useState(false);

  const handleDragEnter = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains('pdf__page__annotations--editor')) {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsDropTarget(true);
      }
    },
    [setIsDropTarget]
  );

  const handleDragOver = useCallback((evt: React.DragEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLElement;
    if (target.classList.contains('pdf__page__annotations--editor')) {
      evt.preventDefault();
    }
  }, []);

  const handleDragLeave = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains('pdf__page__annotations--editor')) {
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

        const imageData = rotateImageData(stamp.source, rotation);

        exec({
          id: `${Date.now()}.${Math.random()}`,
          action: 'create',
          page,
          annotation: {
            status: PdfAnnotationObjectStatus.Created,
            pageIndex: page.index,
            id: Date.now(),
            type: PdfAnnotationSubtype.STAMP,
            contents: [
              {
                type: PdfPageObjectType.IMAGE,
                imageData,
              },
            ],
            rect,
            appearances: {
              normal: '',
            },
          },
        });
      }
    },
    [exec, page, annotations, scaleFactor, rotation, stamps]
  );

  const draggableDataRef = useRef<DraggableData | null>(null);
  const [startPosition, setStartPosition] = useState<Position | null>();
  const [endPosition, setEndPosition] = useState<Position | null>(null);

  const applyUpdate = useCallback(
    (
      draggableData: DraggableData,
      startPosition: Position,
      endPosition: Position
    ) => {
      const offset = {
        x: endPosition.x - startPosition.x,
        y: endPosition.y - startPosition.y,
      };
      const { annotation, option } = draggableData;

      switch (option.type) {
        case 'mover':
          exec({
            id: `${Date.now()}.${Math.random()}`,
            action: 'transform',
            page,
            annotation,
            params: {
              offset: restoreOffset(offset, rotation, scaleFactor),
              scale: { width: 1, height: 1 },
            },
          });
          break;
        case 'resizer':
          const { rect } = annotation;

          const params = calculateTransformation(
            rect,
            offset,
            rotation,
            option.position
          );

          exec({
            id: `${Date.now()}.${Math.random()}`,
            action: 'transform',
            page,
            annotation,
            params,
          });
          break;
      }
    },
    [exec, page]
  );

  const handlePointerDown = useCallback(
    (
      evt: React.PointerEvent,
      annotation: PdfAnnotationObject,
      option: DraggableOption
    ) => {
      const position = {
        x: evt.pageX,
        y: evt.pageY,
      };
      draggableDataRef.current = {
        annotation,
        option,
      };
      setStartPosition(position);
    },
    [setStartPosition]
  );

  const handlePointerMove = useCallback(
    (evt: React.PointerEvent) => {
      if (draggableDataRef.current) {
        logger.debug(
          EDITOR_ANNOTATIONS_LOG_SOURCE,
          'PointerEvent',
          'pointer move',
          evt.nativeEvent
        );

        const endPosition = {
          x: evt.nativeEvent.pageX,
          y: evt.nativeEvent.pageY,
        };

        setEndPosition(endPosition);
      }
    },
    [logger, setEndPosition]
  );

  const handlePointerCancel = useCallback(
    (evt: React.PointerEvent) => {
      draggableDataRef.current = null;
      setStartPosition(null);
      setEndPosition(null);
    },
    [setStartPosition, setEndPosition]
  );

  const handlePointerUp = useCallback(
    (evt: React.PointerEvent) => {
      const draggableData = draggableDataRef.current;
      if (draggableData && startPosition && endPosition) {
        const endPosition = {
          x: evt.pageX,
          y: evt.pageY,
        };

        applyUpdate(draggableData, startPosition, endPosition);
      }
      draggableDataRef.current = null;
      setStartPosition(null);
      setEndPosition(null);
    },
    [applyUpdate, startPosition, endPosition, setStartPosition, setEndPosition]
  );

  const handlePointerLeave = useCallback(
    (evt: React.PointerEvent) => {
      const draggableData = draggableDataRef.current;
      if (draggableData && startPosition) {
        const endPosition = {
          x: evt.pageX,
          y: evt.pageY,
        };

        applyUpdate(draggableData, startPosition, endPosition);
      }
      draggableDataRef.current = null;
      setStartPosition(null);
      setEndPosition(null);
    },
    [applyUpdate, startPosition, setStartPosition, setEndPosition]
  );

  const handles = useMemo(() => {
    return {
      onPointerDown: handlePointerDown,
      onPointerCancel: handlePointerCancel,
      onPointerUp: handlePointerUp,
    };
  }, [handlePointerDown, handlePointerCancel, handlePointerUp]);

  const extraOperations = useMemo(() => {
    const operations: Operation[] = [];
    const draggableData = draggableDataRef.current;
    if (draggableData && startPosition && endPosition) {
      const { option, annotation } = draggableData;
      const offset = {
        x: endPosition.x - startPosition.x,
        y: endPosition.y - startPosition.y,
      };

      switch (option.type) {
        case 'mover':
          operations.push({
            id: `${Date.now()}.${Math.random()}`,
            action: 'transform',
            page,
            annotation,
            params: {
              offset: restoreOffset(offset, rotation, scaleFactor),
              scale: { width: 1, height: 1 },
            },
          });
          break;
        case 'resizer':
          const { rect } = annotation;

          const params = calculateTransformation(
            rect,
            offset,
            rotation,
            option.position
          );

          operations.push({
            id: `${Date.now()}.${Math.random()}`,
            action: 'transform',
            page,
            annotation,
            params,
          });
          break;
      }
    }

    return operations;
  }, [page, rotation, scaleFactor, startPosition, endPosition]);

  return (
    <AnnotationsContext.Provider value={handles}>
      <div
        tabIndex={0}
        className={classNames('pdf__page__annotations--editor', {
          'pdf__page__annotations--droptarget': isDropTarget,
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <PdfPageEditableAnnotations
          page={page}
          annotations={annotations}
          scaleFactor={scaleFactor}
          rotation={rotation}
          extraOperations={extraOperations}
        />
      </div>
    </AnnotationsContext.Provider>
  );
}

export interface PdfPageEditableAnnotationsProps {
  page: PdfPageObject;
  annotations: PdfAnnotationObject[];
  scaleFactor: number;
  rotation: Rotation;
  extraOperations: Operation[];
}

export function PdfPageEditableAnnotations(
  props: PdfPageEditableAnnotationsProps
) {
  const { page, annotations, scaleFactor, rotation, extraOperations } = props;

  const { queryByPageIndex } = usePdfEditor();
  const operations = queryByPageIndex(page.index) || [];

  const editableAnnotations = useMemo(() => {
    const allOperations: Operation[] = [...operations, ...extraOperations];

    return apply(annotations, allOperations).filter(
      (annotation: PdfAnnotationObject) => {
        return annotation.type !== PdfAnnotationSubtype.WIDGET;
      }
    );
  }, [page, operations, annotations, extraOperations]);

  return (
    <PdfPageAnnotationComponentContextProvider
      component={PdfPageEditorAnnotation}
    >
      <PdfPageAnnotations
        annotations={editableAnnotations}
        page={page}
        scaleFactor={scaleFactor}
        rotation={rotation}
      />
    </PdfPageAnnotationComponentContextProvider>
  );
}
