import { usePdfEngine } from '@unionpdf/core';
import {
  PdfAnnotationObject,
  PdfLinkAnnoObject,
  PdfPageObject,
  PdfTextAnnoObject,
  Rotation,
} from '@unionpdf/models';
import React, { useState, useEffect } from 'react';

export interface PdfPageAnnotationObjects {
  link: PdfLinkAnnoObject;
  text: PdfTextAnnoObject;
}

export interface PdfPageAnnotationComponentProps<
  T extends keyof PdfPageAnnotationObjects
> {
  page: PdfPageObject;
  annotation: PdfPageAnnotationObjects[T];
  scaleFactor: number;
  rotation: Rotation;
}

export type PdfPageAnnotationComponent<
  T extends keyof PdfPageAnnotationObjects
> = (props: PdfPageAnnotationComponentProps<T>) => JSX.Element;

export type PdfPageAnnotationComponents = {
  [T in keyof PdfPageAnnotationObjects]: PdfPageAnnotationComponent<T>;
};

export interface PdfPageAnnotationsProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  components: Partial<PdfPageAnnotationComponents>;
}

export function PdfPageAnnotations(props: PdfPageAnnotationsProps) {
  const { page, scaleFactor, rotation, components } = props;
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
      {annotations.map((annotation, index) => {
        switch (annotation.type) {
          case 'link': {
            const PdfLinkAnno = components.link;
            if (PdfLinkAnno) {
              return (
                <PdfLinkAnno
                  key={index}
                  page={page}
                  scaleFactor={scaleFactor}
                  rotation={rotation}
                  annotation={annotation}
                />
              );
            } else {
              return null;
            }
          }
          case 'text': {
            const PdfTextAnno = components.text;
            if (PdfTextAnno) {
              return (
                <PdfTextAnno
                  key={index}
                  page={page}
                  scaleFactor={scaleFactor}
                  rotation={rotation}
                  annotation={annotation}
                />
              );
            } else {
              return null;
            }
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
