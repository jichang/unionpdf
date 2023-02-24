import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  PdfAnnotationSubtypeName,
} from '@unionpdf/models';
import { PdfPageObject, Rotation } from '@unionpdf/models';
import React, {
  ComponentProps,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { usePdfEditor } from './editor.context';
import { PdfPageAnnotation } from '../common';
import { Position } from '@unionpdf/models';
import { calculateTransformation, serialze } from '../helpers/editor';

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

  const { exec } = usePdfEditor();

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

  const [isDraggingMover, setIsDraggingMover] = useState(false);

  const handleDragMoverStart = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const target = evt.nativeEvent.target as HTMLDivElement;
      const draggableData: DraggableAnnotationData = {
        type: 'annotation',
        pageIndex: page.index,
        annotation: serialze(annotation),
        startPosition: {
          x:
            (target.parentElement as HTMLDivElement).offsetLeft +
            evt.nativeEvent.offsetX,
          y:
            (target.parentElement as HTMLDivElement).offsetTop +
            evt.nativeEvent.offsetY,
        },
      };
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.setData(
        'application/json',
        JSON.stringify(draggableData)
      );
    },
    [page, annotation]
  );

  const handleDragMover = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.dataTransfer.dropEffect = 'move';
      setIsDraggingMover(true);
    },
    [setIsDraggingMover]
  );

  const handleDragMoverEnd = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      setIsDraggingMover(false);
    },
    [setIsDraggingMover]
  );

  const [isDraggingResizer, setIsDraggingResizer] = useState(false);
  const [resizerPosition, setResizerPosition] = useState(
    PdfPageAnnotationResizerPosition.TopLeft
  );
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState<Position>({ x: 0, y: 0 });

  const handleDragResizerStart = useCallback(
    (evt: React.DragEvent<HTMLButtonElement>) => {
      const target = evt.nativeEvent.target as HTMLButtonElement;
      setIsDraggingResizer(true);

      const resizerPosition = Number(
        target.dataset.position
      ) as PdfPageAnnotationResizerPosition;

      setResizerPosition(resizerPosition);
      setStartPosition({ x: evt.pageX, y: evt.pageY });
      setEndPosition({ x: evt.pageX, y: evt.pageY });

      evt.dataTransfer.dropEffect = 'move';
    },
    [setIsDraggingResizer, setResizerPosition, setStartPosition, setEndPosition]
  );

  const handleDragResizer = useCallback(
    (evt: React.DragEvent<HTMLButtonElement>) => {
      evt.dataTransfer.dropEffect = 'move';

      if (!isDraggingResizer) {
        return;
      }

      setEndPosition({
        x: evt.pageX,
        y: evt.pageY,
      });
    },
    [isDraggingResizer, setEndPosition]
  );

  const handleDragResizerEnd = useCallback(
    (evt: React.DragEvent<HTMLButtonElement>) => {
      evt.stopPropagation();

      const offset = {
        x: (evt.pageX - startPosition.x) / scaleFactor,
        y: (evt.pageY - startPosition.y) / scaleFactor,
      };

      const { rect } = annotation;

      const transformation = calculateTransformation(
        rect,
        offset,
        rotation,
        resizerPosition
      );

      exec({
        id: `${Date.now()}.${Math.random()}`,
        pageIndex: page.index,
        action: 'transform',
        annotation,
        params: transformation,
      });

      setIsDraggingResizer(false);
      setStartPosition({ x: 0, y: 0 });
      setEndPosition({ x: 0, y: 0 });
    },
    [
      setIsDraggingResizer,
      startPosition,
      setStartPosition,
      setEndPosition,
      exec,
      page,
      annotation,
      rotation,
      scaleFactor,
    ]
  );

  const transformedRect = useMemo(() => {
    const offset = {
      x: (endPosition.x - startPosition.x) / scaleFactor,
      y: (endPosition.y - startPosition.y) / scaleFactor,
    };

    const { rect } = annotation;
    const { origin, size } = rect;

    const transformation = calculateTransformation(
      rect,
      offset,
      rotation,
      resizerPosition
    );

    return {
      origin: {
        x: origin.x + transformation.offset.x,
        y: origin.y + transformation.offset.y,
      },
      size: {
        width: size.width * transformation.scale.width,
        height: size.height * transformation.scale.height,
      },
    };
  }, [
    annotation.rect,
    startPosition,
    endPosition,
    resizerPosition,
    scaleFactor,
    rotation,
  ]);

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
      className={classNames(
        'pdf__annotation--editor',
        `pdf__annotation--${PdfAnnotationSubtypeName[annotation.type]}`,
        {
          'pdf__annotation--dragging': isDraggingMover,
        }
      )}
      annotation={{ ...annotation, rect: transformedRect }}
      scaleFactor={scaleFactor}
      tabIndex={0}
      rotation={rotation}
      onKeyUp={handleKeyUp}
    >
      <div
        className="pdf__annotation__mover"
        draggable={true}
        onDragStart={handleDragMoverStart}
        onDrag={handleDragMover}
        onDragEnd={handleDragMoverEnd}
      >
        {content}
      </div>
      {ResizablePdfAnnotationSubTypes.includes(annotation.type) ? (
        <>
          <PdfPageAnnotationResizer
            draggable={true}
            position={PdfPageAnnotationResizerPosition.TopLeft}
            onDragStart={handleDragResizerStart}
            onDrag={handleDragResizer}
            onDragEnd={handleDragResizerEnd}
          />
          <PdfPageAnnotationResizer
            draggable={true}
            position={PdfPageAnnotationResizerPosition.TopRight}
            onDragStart={handleDragResizerStart}
            onDrag={handleDragResizer}
            onDragEnd={handleDragResizerEnd}
          />
          <PdfPageAnnotationResizer
            draggable={true}
            position={PdfPageAnnotationResizerPosition.BottomRight}
            onDragStart={handleDragResizerStart}
            onDrag={handleDragResizer}
            onDragEnd={handleDragResizerEnd}
          />
          <PdfPageAnnotationResizer
            draggable={true}
            position={PdfPageAnnotationResizerPosition.BottomLeft}
            onDragStart={handleDragResizerStart}
            onDrag={handleDragResizer}
            onDragEnd={handleDragResizerEnd}
          />
        </>
      ) : null}
    </PdfPageAnnotation>
  );
}

export interface PdfPageAnnotationResizerProps
  extends ComponentProps<'button'> {
  position: PdfPageAnnotationResizerPosition;
}

export const PdfPageAnnotationResizerPositionClassName = {
  [PdfPageAnnotationResizerPosition.TopLeft]: 'topleft',
  [PdfPageAnnotationResizerPosition.TopRight]: 'topright',
  [PdfPageAnnotationResizerPosition.BottomRight]: 'bottomright',
  [PdfPageAnnotationResizerPosition.BottomLeft]: 'bottomleft',
};

export function PdfPageAnnotationResizer(props: PdfPageAnnotationResizerProps) {
  const { position, className, children, ...rest } = props;

  return (
    <button
      data-position={position}
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
