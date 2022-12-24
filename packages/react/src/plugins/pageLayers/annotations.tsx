import {
  ignore,
  PdfAnnotationObject,
  PdfPageObject,
  Rotation,
} from '@unionpdf/models';
import React, { useState, useEffect } from 'react';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';

export interface PdfPageAnnotationComponentProps<T = PdfAnnotationObject> {
  page: PdfPageObject;
  annotation: T;
  scaleFactor: number;
  rotation: Rotation;
}

export type PdfPageAnnotationComponent = (
  props: PdfPageAnnotationComponentProps
) => JSX.Element;

export interface PdfPageAnnotationsProps {
  isVisible: boolean;
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  annotationComponent: PdfPageAnnotationComponent;
}

export function PdfPageAnnotations(props: PdfPageAnnotationsProps) {
  const {
    isVisible,
    page,
    scaleFactor,
    rotation,
    annotationComponent: AnnotationComponent,
  } = props;
  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const [annotations, setAnnotations] = useState<PdfAnnotationObject[]>([]);

  useEffect(() => {
    if (engine && doc && page && isVisible) {
      const task = engine.getPageAnnotations(doc, page, scaleFactor, rotation);
      task.wait(setAnnotations, ignore);

      return () => {
        task.abort();
      };
    }
  }, [isVisible, engine, doc, page, scaleFactor, rotation]);

  console.log(annotations);

  return (
    <div className="pdf__page__layer pdf__page__layer--annotations">
      {annotations.map((annotation) => {
        return (
          <AnnotationComponent
            key={annotation.id}
            page={page}
            annotation={annotation}
            scaleFactor={scaleFactor}
            rotation={rotation}
          />
        );
      })}
    </div>
  );
}
