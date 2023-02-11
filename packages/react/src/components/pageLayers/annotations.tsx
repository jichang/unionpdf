import { ignore, PdfAnnotationObject } from '@unionpdf/models';
import React, { useState, useEffect } from 'react';
import { usePdfEngine, usePdfDocument } from '../../core';
import { PdfPageLayerComponentProps } from './layer';
import { PdfPageAnnotations } from '../annotations';
import './annotations.css';

export function PdfPageAnnotationsLayer(props: PdfPageLayerComponentProps) {
  const { isVisible, page, scaleFactor, rotation } = props;
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

  return (
    <div className="pdf__page__layer pdf__page__layer--annotations">
      <PdfPageAnnotations
        page={page}
        scaleFactor={scaleFactor}
        rotation={rotation}
        annotations={annotations}
      />
    </div>
  );
}
