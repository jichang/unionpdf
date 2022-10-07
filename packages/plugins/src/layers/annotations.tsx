import { usePdfEngine } from '@onepdf/core';
import { PdfAnnotationObject } from '@onepdf/models';
import React, { useState, useEffect } from 'react';
import { PdfPageLayerComponentProps } from '../pages.context';
import { usePdfPageAnnotationComponents } from './annotations.contex';

export interface PdfPageAnnotationsProps extends PdfPageLayerComponentProps {}

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
    <div className="pdf__page__layer pdf__page__layer--annotations">
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
    </div>
  );
}
