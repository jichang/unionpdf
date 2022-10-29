import { usePdfDocument, usePdfEngine } from '@unionpdf/core';
import { PdfPageObject, Rotation, Size } from '@unionpdf/models';
import React, { useRef, useEffect } from 'react';
import './canvas.css';

export interface PdfPageCanvasLayerProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  isVisible: boolean;
}

export function PdfPageCanvas(props: PdfPageCanvasLayerProps) {
  const doc = usePdfDocument();
  const engine = usePdfEngine();
  const { page, scaleFactor, rotation, isVisible } = props;
  const canvasElemRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem && engine && doc && isVisible) {
      const task = engine.renderPage(doc, page, scaleFactor, rotation);
      task.wait(
        (imageData) => {
          canvasElem.width = imageData.width;
          canvasElem.height = imageData.height;
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
        },
        () => {}
      );

      return () => {
        task.abort();
      };
    }
  }, [page, engine, doc, isVisible, scaleFactor, rotation]);

  if (!isVisible) {
    return null;
  }

  return (
    <canvas
      className="pdf__page__layer pdf__page__layer--canvas"
      ref={canvasElemRef}
    />
  );
}
