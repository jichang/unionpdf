import { PdfAnnotationObject, Position } from '@unionpdf/models';
import React, { ReactNode, useCallback, useContext, useState } from 'react';
import { useLogger } from '../../core';

export const DRAG_LOG_SOURCE = 'PdfDragContext';

export enum DraggableType {
  None,
  Mover,
  Resizer,
}

export enum ResizerPosition {
  TopLeft = 0,
  TopRight = 1,
  BottomRight = 2,
  BottomLeft = 3,
}

export interface PdfDragContextVale {
  setDraggableType: (draggableType: DraggableType) => void;
  draggableType: DraggableType;
  setStartPosition: (startPosition: Position | null) => void;
  startPosition: Position | null;
  setResizerPosition: (resizerPosition: ResizerPosition) => void;
  resizerPosition: ResizerPosition;
  setAnnotation: (annotation: PdfAnnotationObject | null) => void;
  annotation: PdfAnnotationObject | null;
}

export const PdfDragContext = React.createContext<PdfDragContextVale>({
  draggableType: DraggableType.None,
  setDraggableType: () => {},
  resizerPosition: ResizerPosition.TopLeft,
  setResizerPosition: () => {},
  startPosition: null,
  setStartPosition: (position: Position | null) => {},
  annotation: null,
  setAnnotation: (annotation: PdfAnnotationObject | null) => {},
});

export interface PdfDragContextProviderProps {
  children: ReactNode;
}

export function PdfDragContextProvider(props: PdfDragContextProviderProps) {
  const { children } = props;

  const logger = useLogger();

  const [draggableType, setDraggableType] = useState(DraggableType.None);

  const [resizerPosition, setResizerPosition] = useState(
    ResizerPosition.TopLeft
  );

  const [startPosition, setStartPosition] = useState<Position | null>(null);

  const [annotation, setAnnotation] = useState<PdfAnnotationObject | null>(
    null
  );

  return (
    <PdfDragContext.Provider
      value={{
        draggableType,
        setDraggableType,
        resizerPosition,
        setResizerPosition,
        startPosition,
        setStartPosition,
        annotation,
        setAnnotation,
      }}
    >
      {children}
    </PdfDragContext.Provider>
  );
}

export function usePdfDrag() {
  return useContext(PdfDragContext);
}
