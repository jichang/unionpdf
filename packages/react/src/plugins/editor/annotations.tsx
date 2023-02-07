import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import {
  PdfPageAnnotationComponentContextProvider,
  PdfPageAnnotations,
} from '../annotations';
import { ItemTypes, PdfEditorAnnotation } from './annotation';
import './annotations.css';

export interface PdfEditorAnnotationsProps {
  page: PdfPageObject;
  annotations: PdfAnnotationObject[];
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorAnnotations(props: PdfEditorAnnotationsProps) {
  const { page, annotations, scaleFactor, rotation } = props;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Annotation,
      drop: () => {},
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
        };
      },
    }),
    []
  );

  return (
    <PdfPageAnnotationComponentContextProvider component={PdfEditorAnnotation}>
      <div
        className={classNames('pdf__annotations--editor', {
          'pdf__annotations--droptarget': isOver,
        })}
        ref={drop}
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
