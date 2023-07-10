import React, { useMemo } from 'react';
import {
  PdfAnnotationObject,
  PdfPopupAnnoObject,
  transformRect,
} from '@unionpdf/models';
import './popup.css';
import { PdfPageAnnotationProps } from '../common';

/**
 * Properties of PdfPagePopupAnnotation
 */
export interface PdfPagePopupAnnotationProps extends PdfPageAnnotationProps {
  parent: PdfAnnotationObject;
  /**
   * Pdf popup annotation object
   */
  annotation: PdfPopupAnnoObject;
}

/**
 * Pdf popup annotation component
 * @param props - properties of PdfPagePopupAnnotation
 * @returns
 *
 * @public
 */
export function PdfPagePopupAnnotation(props: PdfPagePopupAnnotationProps) {
  const { page, parent, annotation, scaleFactor, rotation } = props;

  const style = useMemo(() => {
    const rect = transformRect(
      page.size,
      annotation.rect,
      rotation,
      scaleFactor
    );

    return {
      top: rect.origin.y,
      left: rect.origin.x,
      width: rect.size.width,
      height: rect.size.height,
    };
  }, [parent, annotation, rotation, scaleFactor]);

  return (
    <div
      data-subtype={annotation.type}
      className="pdf__page__annotation pdf__page__annotation--popup"
      style={style}
    >
      <span>{annotation.contents}</span>
    </div>
  );
}
