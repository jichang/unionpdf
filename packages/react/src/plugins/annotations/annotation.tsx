import React, { ComponentProps, useMemo } from 'react';
import { PdfAnnotationObject, PdfPageObject, Rotation } from '@unionpdf/models';
import './annotation.css';
import { calculateRectStyle } from '../helpers/annotation';
import { PdfPagePopupAnnotation } from './popup';
import classNames from 'classnames';

export interface PdfPageAnnotationProps extends ComponentProps<'div'> {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageAnnotation(props: PdfPageAnnotationProps) {
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
      data-subtype={annotation.type}
      className={classNames('pdf__annotation', className)}
      data-page-index={page.index}
      {...rest}
    >
      {children}
      {annotation.popup ? (
        <PdfPagePopupAnnotation
          page={page}
          parent={annotation}
          annotation={annotation.popup}
          scaleFactor={scaleFactor}
          rotation={rotation}
        />
      ) : null}
    </div>
  );
}
