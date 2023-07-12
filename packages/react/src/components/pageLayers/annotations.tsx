import { ignore, PdfAnnotationObject } from '@unionpdf/models';
import React, { useState, useEffect } from 'react';
import {
  usePdfEngine,
  usePdfDocument,
  usePdfApplication,
  PdfApplicationMode,
} from '../../core';
import { PdfPageLayerComponentProps } from './layer';
import { PdfPageAnnotations } from '../common';
import './annotations.css';

/**
 * Page layer used to render annotations
 * @param props - properties of PdfPageAnnotationsLayer
 * @returns
 */
export function PdfPageAnnotationsLayer(props: PdfPageLayerComponentProps) {
  const { isVisible, page, scaleFactor, rotation } = props;
  const engine = usePdfEngine();
  const { mode } = usePdfApplication();
  const { version, doc } = usePdfDocument();
  const [annotations, setAnnotations] = useState<PdfAnnotationObject[]>([]);

  useEffect(() => {
    if (
      mode !== PdfApplicationMode.Edit &&
      engine &&
      doc &&
      page &&
      isVisible
    ) {
      const task = engine.getPageAnnotations(doc, page, scaleFactor, rotation);
      task.wait(setAnnotations, ignore);

      return () => {
        task.abort();
      };
    }
  }, [mode, isVisible, engine, doc, version, page, scaleFactor, rotation]);

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
