import React from 'react';
import {
  PdfPageAnnotation,
  PdfPageAnnotationComponentProps,
  PdfPageLinkAnnotation,
  PdfPageTextAnnotation,
  PdfPageWidgetAnnotation,
  usePdfPageAnnotationComponent,
} from '.';
import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  PdfAnnotationSubtypeName,
  PdfPageObject,
  Rotation,
} from '@unionpdf/models';
import classNames from 'classnames';

export function PdfPageDefaultAnnotation(
  props: PdfPageAnnotationComponentProps
) {
  const { page, annotation, rotation, scaleFactor } = props;
  let content = null;
  switch (annotation.type) {
    case PdfAnnotationSubtype.LINK:
      content = <PdfPageLinkAnnotation page={page} annotation={annotation} />;
      break;
    case PdfAnnotationSubtype.TEXT:
      content = <PdfPageTextAnnotation annotation={annotation} />;
      break;
    case PdfAnnotationSubtype.WIDGET:
      content = <PdfPageWidgetAnnotation annotation={annotation} />;
      break;
    default:
      content = <PdfPageAnnotation {...props} />;
  }

  return (
    <PdfPageAnnotation
      page={page}
      className={classNames(
        'pdf__annotation',
        `pdf__annotation--${PdfAnnotationSubtypeName[annotation.type]}`
      )}
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      {content}
    </PdfPageAnnotation>
  );
}

export interface PdfPageAnnotationsProps {
  annotations: PdfAnnotationObject[];
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageAnnotations(props: PdfPageAnnotationsProps) {
  const { annotations, page, scaleFactor, rotation } = props;

  const AnnotationComponent = usePdfPageAnnotationComponent();

  return (
    <>
      {annotations.map((annotation) => {
        return (
          <AnnotationComponent
            key={annotation.id}
            page={page}
            annotation={annotation}
            scaleFactor={scaleFactor}
            rotation={rotation}
          />
        );
      })}
    </>
  );
}
