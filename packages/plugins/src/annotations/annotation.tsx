import React, { ComponentProps, useMemo } from 'react';
import { PdfAnnotationObject, Rotation } from '@unionpdf/models';
import './annotation.css';
import { calculateAnnotationStyle } from '../helpers/annotation';

export interface PdfPageAnnotationBaseProps extends ComponentProps<'div'> {
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageAnnotationBase(props: PdfPageAnnotationBaseProps) {
  const { annotation, scaleFactor, rotation, children, className, ...rest } =
    props;

  const style = useMemo(() => {
    return calculateAnnotationStyle(annotation.rect, scaleFactor, rotation);
  }, [annotation, rotation, scaleFactor]);

  return (
    <div
      tabIndex={0}
      style={style}
      className={`pdf__annotation pdf__annotation--${annotation.type} ${
        className || ''
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
