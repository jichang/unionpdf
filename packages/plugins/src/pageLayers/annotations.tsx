import { usePdfDocument, usePdfEngine } from '@unionpdf/core';
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
      const abortController = new AbortController();
      const load = async () => {
        const result = engine.getPageAnnotations(
          doc,
          page,
          scaleFactor,
          rotation,
          abortController.signal
        );
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
  }, [isVisible, engine, doc, page, scaleFactor, rotation]);

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
