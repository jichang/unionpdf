import { ignore, PdfPageObject, Rotation } from '@unionpdf/models';
import React, { useRef, useEffect, useState } from 'react';
import { usePdfDocument, usePdfEngine } from '../../core';
import './canvas.css';

export interface PdfPageCanvasLayerProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  inVisibleRange: boolean;
  inCacheRange: boolean;
}

export function PdfPageCanvasLayer(props: PdfPageCanvasLayerProps) {
  const doc = usePdfDocument();
  const engine = usePdfEngine();
  const { page, scaleFactor, rotation, inVisibleRange, inCacheRange } = props;
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const canvasElemRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem && engine && doc && inVisibleRange) {
      const task = engine.renderPage(doc, page, scaleFactor, rotation);
      task.wait(setImageData, ignore);

      return () => {
        task.abort();
      };
    }
  }, [page, engine, doc, inVisibleRange, scaleFactor, rotation]);

  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem && imageData) {
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
    }
  }, [imageData]);

  useEffect(() => {
    if (!inCacheRange) {
      setImageData(null);
    }
  }, [inCacheRange]);

  if (!inVisibleRange && !inCacheRange) {
    return null;
  }

  return (
    <canvas
      className="pdf__page__layer pdf__page__layer--canvas"
      ref={canvasElemRef}
    />
  );
}
