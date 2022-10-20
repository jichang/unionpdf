import { usePdfDocument, usePdfEngine } from '@unionpdf/core';
import { PdfPageObject, Rotation, Size } from '@unionpdf/models';
import React, { useRef, useEffect } from 'react';

export interface PdfPageCanvasLayerProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  isVisible: boolean;
  visualSize: Size;
}

export function PdfPageCanvas(props: PdfPageCanvasLayerProps) {
  const doc = usePdfDocument();
  const engine = usePdfEngine();
  const { page, scaleFactor, rotation, isVisible, visualSize } = props;
  const canvasElemRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem && engine && doc && isVisible) {
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
        doc,
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
  }, [page, engine, doc, isVisible, scaleFactor, rotation]);

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
