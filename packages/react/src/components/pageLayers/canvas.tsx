import { ignore } from '@unionpdf/models';
import React, { useRef, useEffect, useState } from 'react';
import {
  PdfApplicationMode,
  usePdfApplication,
  usePdfDocument,
  usePdfEngine,
} from '../../core';
import './canvas.css';
import { PdfPageLayerComponentProps } from './layer';

/**
 * Properties of PdfPageCanvasLayer
 */
export interface PdfPageCanvasLayerProps extends PdfPageLayerComponentProps {}

/**
 * Page layer used to render page content
 * @param props - properties of PdfPageCanvasLayer
 * @returns
 */
export function PdfPageCanvasLayer(props: PdfPageCanvasLayerProps) {
  const { mode } = usePdfApplication();
  const { doc } = usePdfDocument();
  const engine = usePdfEngine();
  const {
    page,
    scaleFactor,
    rotation,
    isVisible,
    inVisibleRange,
    inCacheRange,
  } = props;
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const canvasElemRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem && engine && doc && (isVisible || inVisibleRange)) {
      const task = engine.renderPage(doc, page, scaleFactor, rotation, {
        withAnnotations: mode === PdfApplicationMode.View,
      });
      task.wait(setImageData, ignore);

      return () => {
        task.abort();
      };
    }
  }, [mode, page, engine, doc, inVisibleRange, scaleFactor, rotation]);

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
