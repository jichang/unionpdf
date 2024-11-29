import {
  ignore,
  PdfErrorCode,
  PdfPageObject,
  PdfTextRectObject,
  Rotation,
  transformRect,
} from '@unionpdf/models';
import React, { useState, useEffect, useRef } from 'react';
import { usePdfEngine, usePdfDocument } from '../../core';
import { PdfPageLayerComponentProps } from './layer';
import './text.css';

/**
 * Properties of PdfPageTextLayer
 */
export interface PdfPageTextLayerProps extends PdfPageLayerComponentProps {}

/**
 * Page layer used to render page text
 * @param props - properties of PdfPageTextLayer
 * @returns
 */
export function PdfPageTextLayer(props: PdfPageTextLayerProps) {
  const { isVisible, page, scaleFactor, rotation } = props;
  const engine = usePdfEngine();
  const { doc } = usePdfDocument();
  const [rects, setRects] = useState<PdfTextRectObject[]>([]);

  useEffect(() => {
    if (engine && doc && page && isVisible) {
      const task = engine.getPageTextRects(doc, page, scaleFactor, rotation);
      task.wait(setRects, ignore);

      return () => {
        task.abort({
          code: PdfErrorCode.Cancelled,
          message: '',
        });
      };
    }
  }, [isVisible, engine, doc, page, scaleFactor, rotation]);

  return (
    <div className="pdf__page__layer pdf__page__layer--text">
      {isVisible
        ? rects.map((textRect, index) => {
            return (
              <PdfPageTextRect
                key={index}
                page={page}
                textRect={textRect}
                rotation={rotation}
                scaleFactor={scaleFactor}
              />
            );
          })
        : null}
    </div>
  );
}

export interface PdfPageTextRectProps {
  page: PdfPageObject;
  textRect: PdfTextRectObject;
  rotation: Rotation;
  scaleFactor: number;
}

export function PdfPageTextRect(props: PdfPageTextRectProps) {
  const { page, textRect, rotation, scaleFactor } = props;
  const rect = transformRect(page.size, textRect.rect, rotation, scaleFactor);
  const style = {
    top: rect.origin.y,
    left: rect.origin.x,
    width: rect.size.width,
    height: rect.size.height,
  };

  const textElemRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textElemRef.current) {
      const contentElem = textElemRef.current;
      const width = contentElem.offsetWidth;
      const height = contentElem.offsetHeight;

      contentElem.style.transform = `scale(${rect.size.width / width}, ${rect.size.height / height})`;
    }
  }, [rect]);

  return (
    <span className="pdf__text__rect" style={style}>
      <span className="pdf__text__rect__content" ref={textElemRef}>
        {textRect.content}
      </span>
    </span>
  );
}
