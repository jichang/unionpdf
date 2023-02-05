import { PdfAnnotationObject, PdfAnnotationSubtype } from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { useEffect, useRef } from 'react';
import { usePdfEditor } from '../../core';
import './annotation.css';
import { calculateRectStyle } from '../helpers/annotation';
import { PdfPageInkAnnotation } from '../annotations';

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

  let content = null;
  switch (annotation.type) {
    case PdfAnnotationSubtype.INK:
      content = (
        <PdfPageInkAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          scaleFactor={scaleFactor}
          rotation={rotation}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={style}
      className="pdf__editor__annotation"
      data-subtype={annotation.type}
      key={annotation.id}
    >
      {content}
    </div>
  );
}
