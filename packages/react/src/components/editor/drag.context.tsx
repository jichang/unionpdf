import { PdfAnnotationObject, Position } from '@unionpdf/models';
import React, { ReactNode, useContext, useState } from 'react';
import { PdfDraggableMoverData, PdfDraggableResizerData } from './annotation';

export const DRAG_LOG_SOURCE = 'PdfDragContext';

export type DraggableData = PdfDraggableMoverData | PdfDraggableResizerData;

export interface PdfDragContextVale {
  draggableData: DraggableData | null;
  setDraggableData: (draggbaleData: DraggableData | null) => void;
}

export const PdfDragContext = React.createContext<PdfDragContextVale>({
  draggableData: null,
  setDraggableData: (annotation: DraggableData | null) => {},
});

export interface PdfDragContextProviderProps {
  children: ReactNode;
}

export function PdfDragContextProvider(props: PdfDragContextProviderProps) {
  const { children } = props;

  const [draggableData, setDraggableData] = useState<DraggableData | null>(
    null
  );

  return (
    <PdfDragContext.Provider
      value={{
        draggableData,
        setDraggableData,
      }}
    >
      {children}
    </PdfDragContext.Provider>
  );
}

export function usePdfDrag() {
  return useContext(PdfDragContext);
}
