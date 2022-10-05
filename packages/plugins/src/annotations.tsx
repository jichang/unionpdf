import { usePdfEngine } from '@onepdf/core';
import { PdfAnnotationObject } from '@onepdf/models';
import React, { useState, useEffect } from 'react';
import { usePdfPageAnnotationComponents } from './annotations.contex';
import { PdfPageProps } from './pages';

export interface PdfPageAnnotationsProps extends PdfPageProps {}

export function PdfPageAnnotations(props: PdfPageAnnotationsProps) {
  const { page, scaleFactor, rotation } = props;
  const engine = usePdfEngine();
  const [annotations, setAnnotations] = useState<PdfAnnotationObject[]>([]);
  const { annotationComponents } = usePdfPageAnnotationComponents();

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
    <>
      {annotations.map((annotation, index) => {
        switch (annotation.type) {
          case 'link': {
            const PdfLinkAnno = annotationComponents.link;
            return (
              <div key={index} className="pdf__annotation">
                <PdfLinkAnno
                  page={page}
                  scaleFactor={scaleFactor}
                  rotation={rotation}
                  anno={annotation}
                />
              </div>
            );
          }
          case 'text': {
            const PdfTextAnno = annotationComponents.text;
            return (
              <div key={index} className="pdf__annotation">
                <PdfTextAnno
                  page={page}
                  scaleFactor={scaleFactor}
                  rotation={rotation}
                  anno={annotation}
                />
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}
