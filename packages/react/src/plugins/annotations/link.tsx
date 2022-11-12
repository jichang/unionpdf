import React, { useCallback, useMemo } from 'react';
import {
  PdfActionType,
  PdfLinkAnnoObject,
  PdfPageObject,
  Rotation,
} from '@unionpdf/models';
import './link.css';
import { PdfPageAnnotationBase } from './annotation';
import { usePdfNavigator } from '../../core/navigator.context';

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

  const href = useMemo(() => {
    if (!annotation.target) {
      return '#';
    }

    if (annotation.target.type === 'action') {
      switch (annotation.target.action.type) {
        case PdfActionType.Goto:
          return `#${annotation.target.action.destination.pageIndex}`;
        case PdfActionType.URI:
          return annotation.target.action.uri;
      }
    } else {
      return `#${annotation.target.destination.pageIndex}`;
    }
  }, [annotation]);

  const onClick = useCallback(
    (evt: React.MouseEvent) => {
      if (props.onClick) {
        props.onClick(annotation);
      } else {
        evt.preventDefault();

        if (!annotation.target) {
          return;
        }

        if (annotation.target.type === 'action') {
          switch (annotation.target.action.type) {
            case PdfActionType.Goto:
              pdfNavigator?.gotoPage(
                { pageIndex: annotation.target.action.destination.pageIndex },
                'annotation'
              );
              break;
            case PdfActionType.URI:
              window.open(annotation.target.action.uri, '_blank');
              break;
          }
        } else {
          pdfNavigator?.gotoPage(
            { pageIndex: annotation.target.destination.pageIndex },
            'annotation'
          );
        }
      }
    },
    [pdfNavigator, page, annotation, props.onClick]
  );

  return (
    <PdfPageAnnotationBase
      className="pdf__annotation--link"
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      <a
        target="_blank"
        title={annotation.text}
        href={href}
        onClick={onClick}
      />
    </PdfPageAnnotationBase>
  );
}
