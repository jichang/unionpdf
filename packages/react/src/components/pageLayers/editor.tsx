import { PdfAnnotationObject, ignore } from '@unionpdf/models';
import React, { useEffect, useState } from 'react';
import {
  PdfApplicationMode,
  usePdfApplication,
  usePdfDocument,
  usePdfEngine,
} from '../../core';
import { PdfPageEditorAnnotations, PdfEditorCanvas } from '../editor';
import { PdfPageLayerComponentProps } from './layer';
import { PdfAnnotationTool, usePdfEditor } from '../editor/editor.context';
import './editor.css';

export interface PdfPageEditorLayerProps extends PdfPageLayerComponentProps {}

export function PdfPageEditorLayer(props: PdfPageEditorLayerProps) {
  const { isVisible, page, scaleFactor, rotation } = props;
  const { mode } = usePdfApplication();

  const engine = usePdfEngine();
  const { version, doc } = usePdfDocument();
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
  }, [isVisible, mode, engine, version, doc, page, scaleFactor, rotation]);

  const { annotationTool } = usePdfEditor();

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  return (
    <div className="pdf__page__layer pdf__page__layer--editor">
      <PdfPageEditorAnnotations
        page={page}
        annotations={annotations}
        scaleFactor={scaleFactor}
        rotation={rotation}
      />
      {annotationTool === PdfAnnotationTool.Pencil ? (
        <PdfEditorCanvas
          page={page}
          scaleFactor={scaleFactor}
          rotation={rotation}
        />
      ) : null}
    </div>
  );
}
