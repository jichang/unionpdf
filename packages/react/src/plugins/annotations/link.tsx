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
import { usePdfLinkAnnoContext } from './link.context';

export interface PdfPageLinkAnnotationProps {
  page: PdfPageObject;
  annotation: PdfLinkAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageLinkAnnotation(props: PdfPageLinkAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;
  const { gotoPage } = usePdfNavigator();

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

  const context = usePdfLinkAnnoContext();

  const onClick = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      if (context.onClick) {
        context.onClick(evt, annotation);
      }

      if (evt.isDefaultPrevented()) {
        return;
      }

      evt.preventDefault();

      if (!annotation.target) {
        return;
      }

      if (annotation.target.type === 'action') {
        switch (annotation.target.action.type) {
          case PdfActionType.Goto:
            gotoPage(
              { destination: annotation.target.action.destination },
              'annotation'
            );
            break;
          case PdfActionType.URI:
            window.open(annotation.target.action.uri, '_blank');
            break;
        }
      } else {
        gotoPage({ destination: annotation.target.destination }, 'annotation');
      }
    },
    [gotoPage, page, annotation, context.onClick]
  );

  return (
    <PdfPageAnnotationBase
      page={page}
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
