import {
  PdfAnnotationObject,
  ignore,
  PdfAnnotationSubtype,
} from '@unionpdf/models';
import React, { useEffect, useMemo, useState } from 'react';
import {
  PdfApplicationMode,
  usePdfApplication,
  usePdfDocument,
  usePdfEditor,
  usePdfEngine,
} from '../../core';
import {
  PdfPageAnnotationComponentContextProvider,
  PdfPageAnnotations,
} from '../annotations';
import { PdfEditorAnnotation, PdfEditorCanvas } from '../editor';
import { apply } from '../helpers/editor';
import './editor.css';
import { PdfPageLayerComponentProps } from './layer';

export interface PdfPageEditorLayerProps extends PdfPageLayerComponentProps {}

export function PdfPageEditorLayer(props: PdfPageEditorLayerProps) {
  const { isVisible, page, scaleFactor, rotation } = props;
  const { mode } = usePdfApplication();

  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const [annotations, setAnnotations] = useState<PdfAnnotationObject[]>([]);

  useEffect(() => {
    if (
      mode === PdfApplicationMode.Edit &&
      isVisible &&
      engine &&
      doc &&
      page
    ) {
      const task = engine.getPageAnnotations(doc, page, scaleFactor, rotation);
      task.wait(setAnnotations, ignore);

      return () => {
        task.abort();
      };
    }
  }, [isVisible, mode, engine, doc, page, scaleFactor, rotation]);

  const { query } = usePdfEditor();
  const operations = query(page.index) || [];

  const editableAnnotations = useMemo(() => {
    return apply(annotations, operations).filter(
      (annotation: PdfAnnotationObject) => {
        return annotation.type !== PdfAnnotationSubtype.WIDGET;
      }
    );
  }, [operations, annotations]);

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  return (
    <div className="pdf__page__layer pdf__page__layer--editor">
      <PdfPageAnnotationComponentContextProvider
        component={PdfEditorAnnotation}
      >
        <PdfPageAnnotations
          annotations={editableAnnotations}
          page={page}
          scaleFactor={scaleFactor}
          rotation={rotation}
        />
      </PdfPageAnnotationComponentContextProvider>
      <PdfEditorCanvas
        page={page}
        scaleFactor={scaleFactor}
        rotation={rotation}
      />
    </div>
  );
}
