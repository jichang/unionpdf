import { PdfAnnotationObject } from '@unionpdf/models';
import React, { ReactNode, useCallback, useContext, useState } from 'react';
import { useLogger } from '../../core';

export const CACHE_LOG_SOURCE = 'PdfCacheContext';

export enum PdfAnnotationMark {
  Dragging,
}

export interface PdfCacheContextVale {
  setAnnotation: (
    mark: PdfAnnotationMark,
    annotation: PdfAnnotationObject | undefined
  ) => void;
  getAnnotation: (mark: PdfAnnotationMark) => PdfAnnotationObject | undefined;
}

export const PdfCacheContext = React.createContext<PdfCacheContextVale>({
  setAnnotation: (
    mark: PdfAnnotationMark,
    annotation: PdfAnnotationObject | undefined
  ) => {},
  getAnnotation: (mark: PdfAnnotationMark) => {
    return undefined;
  },
});

export interface PdfCacheContextProviderProps {
  children: ReactNode;
}

export function PdfCacheContextProvider(props: PdfCacheContextProviderProps) {
  const { children } = props;

  const logger = useLogger();

  const [annotations, setAnnotations] = useState<
    Record<PdfAnnotationMark, PdfAnnotationObject | undefined>
  >(() => {
    return {
      [PdfAnnotationMark.Dragging]: undefined,
    };
  });

  const setAnnotation = useCallback(
    (mark: PdfAnnotationMark, annotation: PdfAnnotationObject | undefined) => {
      setAnnotations((annotations) => {
        return {
          ...annotations,
          [mark]: annotation,
        };
      });
    },
    [setAnnotations]
  );

  const getAnnotation = useCallback(
    (mark: PdfAnnotationMark) => {
      return annotations[mark];
    },
    [annotations]
  );

  return (
    <PdfCacheContext.Provider
      value={{
        setAnnotation,
        getAnnotation,
      }}
    >
      {children}
    </PdfCacheContext.Provider>
  );
}

export function usePdfCache() {
  return useContext(PdfCacheContext);
}
