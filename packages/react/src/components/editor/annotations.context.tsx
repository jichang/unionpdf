import { PdfAnnotationObject } from '@unionpdf/models';
import React, { useContext } from 'react';

export interface PdfDraggableMoverOption {
  type: 'mover';
}

/**
 * position of annotation resizer
 */
export enum ResizerPosition {
  TopLeft = 0,
  TopRight = 1,
  BottomRight = 2,
  BottomLeft = 3,
}

export interface PdfDraggableResizerOption {
  type: 'resizer';
  position: ResizerPosition;
}

export type DraggableOption =
  | PdfDraggableMoverOption
  | PdfDraggableResizerOption;

export interface DraggableData {
  annotation: PdfAnnotationObject;
  option: DraggableOption;
}

export interface AnnotationsContextValue {
  onPointerDown: (
    evt: React.PointerEvent,
    annotation: PdfAnnotationObject,
    option: DraggableOption
  ) => void;
  onPointerUp: (evt: React.PointerEvent) => void;
  onPointerCancel: (evt: React.PointerEvent) => void;
}

export const AnnotationsContext = React.createContext<AnnotationsContextValue>({
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerCancel: () => {},
});

export function useAnnotationsContext() {
  return useContext(AnnotationsContext);
}
