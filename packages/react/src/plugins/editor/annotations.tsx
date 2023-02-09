import {
  PdfAnnotationObject,
  PdfPageObject,
  Position,
  Rotation,
} from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import {
  PdfPageAnnotationComponentContextProvider,
  PdfPageAnnotations,
} from '../annotations';
import { PdfEditorAnnotation } from './annotation';
import './annotations.css';
import { usePdfEditor } from './editor.context';

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
  const handleDrop = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.preventDefault();

      const data = evt.dataTransfer.getData('application/json');
      if (data) {
        const stopPosition = {
          x: evt.nativeEvent.pageX,
          y: evt.nativeEvent.pageY,
        };
        const { annotation, pageIndex, startPosition } = JSON.parse(data) as {
          annotation: PdfAnnotationObject;
          pageIndex: number;
          startPosition: Position;
        };

        if (page.index === pageIndex) {
          exec({
            id: `${Date.now()}.${Math.random}`,
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
        }
      }
    },
    [exec, page, annotations]
  );

  return (
    <PdfPageAnnotationComponentContextProvider component={PdfEditorAnnotation}>
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
