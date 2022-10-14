import React, { useCallback } from 'react';
import { PdfLinkAnnoObject, PdfPageObject, Rotation } from '@unionpdf/models';
import './link.css';
import { PdfPageAnnotationBase } from './annotation';
import { usePdfNavigator } from '@unionpdf/core';

export interface PdfPageLinkAnnotationProps {
  page: PdfPageObject;
  annotation: PdfLinkAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
  onClick?: (linkAnnoObject: PdfLinkAnnoObject) => void;
}

export function PdfPageLinkAnnotation(props: PdfPageLinkAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;
  const pdfNavigator = usePdfNavigator();

  const onClick = useCallback(() => {
    if (props.onClick) {
      props.onClick(annotation);
    } else {
      if (annotation.target.type === 'url') {
        window.open(annotation.target.url, '_blank');
      } else {
        pdfNavigator?.gotoPage(annotation.target, 'annotation');
      }
    }
  }, [pdfNavigator, page, annotation, props.onClick]);

  return (
    <PdfPageAnnotationBase
      role="link"
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
      onClick={onClick}
    >
      <span>{annotation.text}</span>
    </PdfPageAnnotationBase>
  );
}
