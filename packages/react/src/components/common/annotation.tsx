import React, { ComponentProps, useMemo } from 'react';
import {
  PdfAnnotationObject,
  PdfAnnotationSubtypeName,
  PdfPageObject,
  Rotation,
  transformRect,
} from '@unionpdf/models';
import './annotation.css';
import classNames from 'classnames';

/**
 * Properties of PdfPageAnnotation
 */
export interface PdfPageAnnotationProps extends ComponentProps<'div'> {
  /**
   * page object that annotation is belonged to
   */
  page: PdfPageObject;
  /**
   * pdf annotation object
   */
  annotation: PdfAnnotationObject;
  /**
   * scaling factor
   */
  scaleFactor: number;
  /**
   * Rotation angle
   */
  rotation: Rotation;
}

/**
 * Base component for annotation, it will handle the positioning
 * @param props - properties of PdfPageAnnotation
 * @returns
 */
export function PdfPageAnnotation(props: PdfPageAnnotationProps) {
  const {
    page,
    annotation,
    scaleFactor,
    rotation,
    children,
    className,
    style: styleProp,
    ...rest
  } = props;

  const style = useMemo(() => {
    const rect = transformRect(
      page.size,
      annotation.rect,
      rotation,
      scaleFactor
    );

    return {
      ...styleProp,
      top: rect.origin.y,
      left: rect.origin.x,
      width: rect.size.width,
      height: rect.size.height,
    };
  }, [page, annotation, rotation, scaleFactor, styleProp]);

  return (
    <div
      style={style}
      data-subtype={annotation.type}
      className={classNames(
        'pdf__page__annotation',
        `pdf__page__annotation--${PdfAnnotationSubtypeName[annotation.type]}`,
        className
      )}
      data-page-index={page.index}
      {...rest}
    >
      {children}
    </div>
  );
}
