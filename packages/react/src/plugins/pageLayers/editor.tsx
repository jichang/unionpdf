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
  usePdfEngine,
} from '../../core';
import { PdfEditorAnnotations, PdfEditorCanvas } from '../editor';
import { apply } from '../helpers/editor';
import './editor.css';
import { PdfPageLayerComponentProps } from './layer';
import { EditorTool, usePdfEditor } from '../editor/editor.context';

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

  const { tool, queryByPageIndex, undo, redo } = usePdfEditor();
  const operations = queryByPageIndex(page.index) || [];

  const editableAnnotations = useMemo(() => {
    return apply(annotations, operations).filter(
      (annotation: PdfAnnotationObject) => {
        return annotation.type !== PdfAnnotationSubtype.WIDGET;
      }
    );
  }, [operations, annotations]);

  useEffect(() => {
    if (mode === PdfApplicationMode.Edit) {
      const handleKey = (evt: KeyboardEvent) => {
        if (evt.metaKey) {
          if (evt.key === 'z') {
            evt.preventDefault();
            undo();
          } else if (evt.key === 'y') {
            evt.preventDefault();
            redo();
          }
        }
      };

      window.addEventListener('keydown', handleKey);

      return () => {
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [mode, undo, redo]);

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  return (
    <div className="pdf__page__layer pdf__page__layer--editor">
      <PdfEditorAnnotations
        page={page}
        annotations={editableAnnotations}
        scaleFactor={scaleFactor}
        rotation={rotation}
      />
      {tool === EditorTool.Pencil ? (
        <PdfEditorCanvas
          page={page}
          scaleFactor={scaleFactor}
          rotation={rotation}
        />
      ) : null}
    </div>
  );
}
