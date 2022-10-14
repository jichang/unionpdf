import { usePdfEngine } from '@unionpdf/core';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import React, { useState, useEffect } from 'react';

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
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  annotationComponent: PdfPageAnnotationComponent;
}

export function PdfPageAnnotations(props: PdfPageAnnotationsProps) {
  const {
    page,
    scaleFactor,
    rotation,
    annotationComponent: AnnotationComponent,
  } = props;
  const engine = usePdfEngine();
  const [annotations, setAnnotations] = useState<PdfAnnotationObject[]>([]);

  useEffect(() => {
    if (engine && page) {
      const abortController = new AbortController();
      const load = async () => {
        const result = engine.getPageAnnotations(page, abortController.signal);
        if (result instanceof Promise) {
          result.then(setAnnotations);
        } else {
          setAnnotations(result);
        }
      };

      load();

      return () => {
        abortController.abort();
      };
    }
  }, [engine, page]);

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
