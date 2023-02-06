import React, { useMemo } from 'react';
import {
  PdfAnnotationObject,
  PdfPageObject,
  PdfPopupAnnoObject,
  Rotation,
} from '@unionpdf/models';
import './popup.css';
import { calculateRectStyle } from '../helpers/annotation';

export interface PdfPagePopupAnnotationProps {
  page: PdfPageObject;
  parent: PdfAnnotationObject;
  annotation: PdfPopupAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPagePopupAnnotation(props: PdfPagePopupAnnotationProps) {
  const { annotation, scaleFactor, rotation } = props;

  const style = useMemo(() => {
    return calculateRectStyle(annotation.rect, scaleFactor, rotation);
  }, [annotation, rotation, scaleFactor]);

  return (
    <div
      data-subtype={annotation.type}
      className="pdf__annotation pdf__annotation--popup"
      style={style}
    >
      <span>{annotation.contents}</span>
    </div>
  );
}
