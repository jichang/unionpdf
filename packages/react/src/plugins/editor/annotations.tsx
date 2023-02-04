import {
  PdfAnnotationObject,
  ignore,
  PdfAnnotationSubtype,
} from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePdfDocument, usePdfEditor, usePdfEngine } from '../../core';
import './annotations.css';
import { apply } from '../helpers/editor';
import { calculateRectStyle } from '../helpers/annotation';

export interface PdfEditorAnnotationsProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorAnnotations(props: PdfEditorAnnotationsProps) {
  const { page, scaleFactor, rotation } = props;
  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const [annotations, setAnnotations] = useState<PdfAnnotationObject[]>([]);

  useEffect(() => {
    if (engine && doc && page) {
      const task = engine.getPageAnnotations(doc, page, scaleFactor, rotation);
      task.wait(setAnnotations, ignore);

      return () => {
        task.abort();
      };
    }
  }, [engine, doc, page, scaleFactor, rotation]);

  const { query } = usePdfEditor();
  const operations = query(page.index) || [];

  const editableAnnotations = useMemo(() => {
    return apply(annotations, operations).filter((annotation) => {
      return annotation.type !== PdfAnnotationSubtype.WIDGET;
    });
  }, [operations, annotations]);

  return (
    <>
      {editableAnnotations.map((annotation) => {
        return (
          <PdfEditorAnnotation
            key={annotation.id}
            page={page}
            annotation={annotation}
            scaleFactor={scaleFactor}
            rotation={rotation}
          />
        );
      })}
    </>
  );
}

export interface PdfEditorAnnotationProps {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfEditorAnnotation(props: PdfEditorAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;
  const style = calculateRectStyle(annotation.rect, scaleFactor, rotation);

  const containerRef = useRef<HTMLDivElement>(null);
  const { tool, exec } = usePdfEditor();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keyup', (evt) => {
        if (evt.key === 'Delete') {
          exec({
            id: `${Date.now()}.${Math.random}`,
            pageIndex: page.index,
            action: 'remove',
            annotation,
          });
        }
      });
    }
  }, [page, annotation, tool, exec]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={style}
      className="pdf__editor__annotation"
      key={annotation.id}
    >
      {annotation.id}
    </div>
  );
}
