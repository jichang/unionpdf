import { PdfAnnotationObject, PdfAnnotationSubtype } from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { ComponentProps, useCallback } from 'react';
import './annotation.css';
import {
  PdfPageInkAnnotation,
  PdfPageLineAnnotation,
  PdfPagePolygonAnnotation,
  PdfPagePolylineAnnotation,
  PdfPageHighlightAnnotation,
  PdfPageStampAnnotation,
  PdfPageCircleAnnotation,
  PdfPageSquareAnnotation,
  PdfPageFreeTextAnnotation,
  PdfPageSquigglyAnnotation,
  PdfPageUnderlineAnnotation,
  PdfPageCaretAnnotation,
  PdfPageStrikeOutAnnotation,
} from '../annotations';
import classNames from 'classnames';
import { PdfAnnotationTool, usePdfEditor } from './editor.context';
import { PdfPageAnnotation } from '../common';
import { Position } from '@unionpdf/models';

export const ResizablePdfAnnotationSubTypes = [
  PdfAnnotationSubtype.INK,
  PdfAnnotationSubtype.LINE,
  PdfAnnotationSubtype.STAMP,
  PdfAnnotationSubtype.POLYGON,
  PdfAnnotationSubtype.POLYLINE,
];

export enum PdfPageAnnotationResizerPosition {
  TopLeft = 0,
  TopRight = 1,
  BottomRight = 2,
  BottomLeft = 3,
}

export interface DraggableAnnotationData {
  type: 'annotation';
  annotation: string;
  pageIndex: number;
  startPosition: Position;
}

export interface PdfPageEditorAnnotationProps {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageEditorAnnotation(props: PdfPageEditorAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;

  const { annotationTool, exec } = usePdfEditor();

  const handleKeyUp = useCallback(
    (evt: React.KeyboardEvent) => {
      if (evt.key === 'Delete' || evt.key === 'Backspace') {
        exec({
          id: `${Date.now()}.${Math.random()}`,
          pageIndex: page.index,
          action: 'remove',
          annotation,
        });
      }
    },
    [annotation, page, exec]
  );

  let content: React.ReactElement | null = null;
  switch (annotation.type) {
    case PdfAnnotationSubtype.INK:
      content = (
        <PdfPageInkAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.POLYGON:
      content = (
        <PdfPagePolygonAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.POLYLINE:
      content = (
        <PdfPagePolylineAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.LINE:
      content = (
        <PdfPageLineAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.HIGHLIGHT:
      content = (
        <PdfPageHighlightAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.STAMP:
      content = (
        <PdfPageStampAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.CIRCLE:
      content = (
        <PdfPageCircleAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.SQUARE:
      content = (
        <PdfPageSquareAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.SQUIGGLY:
      content = (
        <PdfPageSquigglyAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.UNDERLINE:
      content = (
        <PdfPageUnderlineAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.CARET:
      content = (
        <PdfPageCaretAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.STRIKEOUT:
      content = (
        <PdfPageStrikeOutAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    case PdfAnnotationSubtype.FREETEXT:
      content = (
        <PdfPageFreeTextAnnotation
          key={annotation.id}
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <PdfPageAnnotation
      page={page}
      className={classNames('pdf__annotation--editor')}
      annotation={annotation}
      scaleFactor={scaleFactor}
      tabIndex={0}
      rotation={rotation}
      onKeyUp={handleKeyUp}
    >
      {content}
      <div
        data-annotation-id={annotation.id}
        data-draggable-type="mover"
        className="pdf__annotation__mover"
      />
      {annotationTool === PdfAnnotationTool.Selection &&
      ResizablePdfAnnotationSubTypes.includes(annotation.type) ? (
        <>
          <PdfPageAnnotationResizer
            annotation={annotation}
            position={PdfPageAnnotationResizerPosition.TopLeft}
          />
          <PdfPageAnnotationResizer
            annotation={annotation}
            position={PdfPageAnnotationResizerPosition.TopRight}
          />
          <PdfPageAnnotationResizer
            annotation={annotation}
            position={PdfPageAnnotationResizerPosition.BottomRight}
          />
          <PdfPageAnnotationResizer
            annotation={annotation}
            position={PdfPageAnnotationResizerPosition.BottomLeft}
          />
        </>
      ) : null}
    </PdfPageAnnotation>
  );
}

export interface PdfPageAnnotationResizerProps
  extends ComponentProps<'button'> {
  annotation: PdfAnnotationObject;
  position: PdfPageAnnotationResizerPosition;
}

export const PdfPageAnnotationResizerPositionClassName = {
  [PdfPageAnnotationResizerPosition.TopLeft]: 'topleft',
  [PdfPageAnnotationResizerPosition.TopRight]: 'topright',
  [PdfPageAnnotationResizerPosition.BottomRight]: 'bottomright',
  [PdfPageAnnotationResizerPosition.BottomLeft]: 'bottomleft',
};

export function PdfPageAnnotationResizer(props: PdfPageAnnotationResizerProps) {
  const { annotation, position, className, children, ...rest } = props;

  return (
    <button
      data-annotation-id={annotation.id}
      data-draggable-type="resizer"
      data-resizer-position={position}
      className={classNames(
        'pdf__annotation__resizer',
        `pdf__annotation__resizer--${PdfPageAnnotationResizerPositionClassName[position]}`,
        className
      )}
      {...rest}
    >
      +
    </button>
  );
}
