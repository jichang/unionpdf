import { usePdfEngine } from '@onepdf/core';
import React, { useRef, useEffect } from 'react';
import { PdfPageLayerComponentProps } from '../pages.context';

export interface PdfPageCanvasProps
  extends Pick<
    PdfPageLayerComponentProps,
    'page' | 'scaleFactor' | 'rotation' | 'isVisible' | 'visualSize'
  > {}

export function PdfPageCanvas(props: PdfPageCanvasProps) {
  const engine = usePdfEngine();
  const { page, scaleFactor, rotation, isVisible, visualSize } = props;
  const canvasElemRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem && engine && isVisible) {
      const abortController = new AbortController();
      const render = (imageData: ImageData) => {
        const ctx = canvasElem.getContext('2d');
        if (ctx) {
          ctx.putImageData(
            imageData,
            0,
            0,
            0,
            0,
            imageData.width,
            imageData.height
          );
        }
      };

      const result = engine.renderPage(
        page,
        scaleFactor,
        rotation,
        undefined,
        abortController.signal
      );
      if (result instanceof Promise) {
        result.then(render);
      } else {
        render(result);
      }

      return () => {
        abortController.abort();
      };
    }
  }, [page, engine, isVisible, scaleFactor, rotation]);

  if (!isVisible) {
    return null;
  }

  return (
    <canvas
      className="pdf__page__layer pdf__page__layer--canvas"
      width={visualSize.width}
      height={visualSize.height}
      ref={canvasElemRef}
    />
  );
}
