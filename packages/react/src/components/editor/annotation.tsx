import { PdfAnnotationObject, PdfAnnotationSubtype } from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, { ComponentProps, useCallback, useEffect, useRef } from 'react';
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
import { ResizerPosition, useAnnotationsContext } from './annotations.context';
import { useUIComponents } from '../../adapters';

export const ResizablePdfAnnotationSubTypes = [
  PdfAnnotationSubtype.INK,
  PdfAnnotationSubtype.LINE,
  PdfAnnotationSubtype.STAMP,
  PdfAnnotationSubtype.POLYGON,
  PdfAnnotationSubtype.POLYLINE,
];

export interface PdfPageEditorAnnotationProps {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageEditorAnnotation(props: PdfPageEditorAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;

  const { annotationTool, exec, copy } = usePdfEditor();

  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent) => {
      if (evt.key === 'c' && (evt.ctrlKey || evt.metaKey)) {
        copy(annotation);
      }
    },
    [annotation, copy]
  );

  const handleKeyUp = useCallback(
    (evt: React.KeyboardEvent) => {
      if (evt.key === 'Delete' || evt.key === 'Backspace') {
        exec({
          id: `${Date.now()}.${Math.random()}`,
          action: 'remove',
          page,
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

  const isSelection = annotationTool === PdfAnnotationTool.Selection;
  const isResizable = ResizablePdfAnnotationSubTypes.includes(annotation.type);

  return (
    <PdfPageAnnotation
      page={page}
      className={classNames('pdf__page__annotation--editor')}
      annotation={annotation}
      rotation={rotation}
      scaleFactor={scaleFactor}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <PdfPageAnnotationMover
        page={page}
        annotation={annotation}
        rotation={rotation}
        scaleFactor={scaleFactor}
      >
        {content}
      </PdfPageAnnotationMover>
      {isSelection && isResizable ? (
        <>
          <PdfPageAnnotationResizer
            page={page}
            annotation={annotation}
            rotation={rotation}
            scaleFactor={scaleFactor}
            position={ResizerPosition.TopLeft}
          />
          <PdfPageAnnotationResizer
            page={page}
            annotation={annotation}
            rotation={rotation}
            scaleFactor={scaleFactor}
            position={ResizerPosition.TopRight}
          />
          <PdfPageAnnotationResizer
            page={page}
            annotation={annotation}
            rotation={rotation}
            scaleFactor={scaleFactor}
            position={ResizerPosition.BottomRight}
          />
          <PdfPageAnnotationResizer
            page={page}
            annotation={annotation}
            rotation={rotation}
            scaleFactor={scaleFactor}
            position={ResizerPosition.BottomLeft}
          />
        </>
      ) : null}
    </PdfPageAnnotation>
  );
}

export interface PdfPageAnnotationMoverProps extends ComponentProps<'div'> {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageAnnotationMover(props: PdfPageAnnotationMoverProps) {
  const {
    page,
    annotation,
    rotation,
    scaleFactor,
    className,
    children,
    ...rest
  } = props;

  const { onPointerDown, onPointerCancel, onPointerUp } =
    useAnnotationsContext();

  const handlePointerDown = React.useCallback(
    (evt: React.PointerEvent) => {
      onPointerDown(evt, annotation, { type: 'mover' });
    },
    [annotation, onPointerDown]
  );

  const handlePointerUp = React.useCallback(
    (evt: React.PointerEvent) => {
      onPointerUp(evt);
    },
    [onPointerUp]
  );

  const handlePointerCancel = React.useCallback(
    (evt: React.PointerEvent) => {
      onPointerCancel(evt);
    },
    [onPointerCancel]
  );

  return (
    <div
      className={classNames('pdf__page__annotation__mover', className)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface PdfPageAnnotationResizerProps
  extends ComponentProps<'button'> {
  page: PdfPageObject;
  annotation: PdfAnnotationObject;
  scaleFactor: number;
  rotation: Rotation;
  position: ResizerPosition;
}

export const ResizerPositionClassName = {
  [ResizerPosition.TopLeft]: 'topleft',
  [ResizerPosition.TopRight]: 'topright',
  [ResizerPosition.BottomRight]: 'bottomright',
  [ResizerPosition.BottomLeft]: 'bottomleft',
};

export function PdfPageAnnotationResizer(props: PdfPageAnnotationResizerProps) {
  const {
    page,
    annotation,
    rotation,
    scaleFactor,
    position,
    className,
    children,
    ...rest
  } = props;

  const { onPointerDown, onPointerCancel, onPointerUp } =
    useAnnotationsContext();

  const handlePointerDown = React.useCallback(
    (evt: React.PointerEvent) => {
      onPointerDown(evt, annotation, { type: 'resizer', position });
    },
    [annotation, position, onPointerDown]
  );

  const handlePointerUp = React.useCallback(
    (evt: React.PointerEvent) => {
      onPointerUp(evt);
    },
    [onPointerUp]
  );

  const handlePointerCancel = React.useCallback(
    (evt: React.PointerEvent) => {
      onPointerCancel(evt);
    },
    [onPointerCancel]
  );

  const { IconButton } = useUIComponents();

  return (
    <IconButton
      className={classNames(
        'pdf__page__annotation__resizer',
        `pdf__page__annotation__resizer--${ResizerPositionClassName[position]}`,
        className
      )}
      type="button"
      iconName="Drag"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      {...rest}
    />
  );
}
