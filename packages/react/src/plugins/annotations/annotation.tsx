import React, { ComponentProps, useMemo } from 'react';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import './annotation.css';
import { calculateRectStyle } from '../helpers/annotation';

export interface PdfPageAnnotationBaseProps extends ComponentProps<'div'> {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageAnnotationBase(props: PdfPageAnnotationBaseProps) {
  const {
    page,
    annotation,
    scaleFactor,
    rotation,
    children,
    className,
    ...rest
  } = props;

  const style = useMemo(() => {
    return calculateRectStyle(annotation.rect, scaleFactor, rotation);
  }, [annotation, rotation, scaleFactor]);

  return (
    <div
      style={style}
      className={`pdf__annotation ${className || ''}`}
      data-page-index={page.index}
      {...rest}
    >
      {children}
    </div>
  );
}
