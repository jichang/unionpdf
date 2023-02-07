import { PdfAnnotationObject, PdfAnnotationSubtype } from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { useEffect, useRef } from 'react';
import './annotation.css';
import { calculateRectStyle } from '../helpers/annotation';
import { PdfPageAnnotation, PdfPageInkAnnotation } from '../annotations';
import classNames from 'classnames';
import { useDrag } from 'react-dnd';
import { usePdfEditor } from './editor.context';

export const ItemTypes = {
  Annotation: 'annotation',
};

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

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: ItemTypes.Annotation,
      collect: (monitor) => {
        return {
          isDragging: !!monitor.isDragging(),
        };
      },
    };
  });

  let content = null;
  switch (annotation.type) {
    case PdfAnnotationSubtype.INK:
      content = (
        <PdfPageInkAnnotation
          key={annotation.id}
          width={style.width}
          height={style.height}
          annotation={annotation}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <PdfPageAnnotation
      page={page}
      className={classNames('pdf__annotation--editor')}
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
      drag={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      {content}
    </PdfPageAnnotation>
  );
}
