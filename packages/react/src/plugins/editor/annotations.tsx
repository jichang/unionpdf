import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import {
  PdfPageAnnotationComponentContextProvider,
  PdfPageAnnotations,
} from '../annotations';
import { PdfEditorAnnotation } from './annotation';
import './annotations.css';

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

  const handleDrop = useCallback((evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
  }, []);

  const handleDragLeave = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains('pdf__annotations--editor')) {
        setIsOver(false);
      }
    },
    [setIsOver]
  );

  return (
    <PdfPageAnnotationComponentContextProvider component={PdfEditorAnnotation}>
      <div
        className={classNames('pdf__annotations--editor', {
          'pdf__annotations--droptarget': isOver,
        })}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
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
