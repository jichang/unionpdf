import { ignore, PdfTextRectObject, transformRect } from '@unionpdf/models';
import React, { useState, useEffect } from 'react';
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
        task.abort();
      };
    }
  }, [isVisible, engine, doc, page, scaleFactor, rotation]);

  return (
    <div className="pdf__page__layer pdf__page__layer--text">
      {isVisible
        ? rects.map((textRect, index) => {
            const rect = transformRect(
              page.size,
              textRect.rect,
              rotation,
              scaleFactor
            );
            const style = {
              top: rect.origin.y,
              left: rect.origin.x,
              width: rect.size.width,
              height: rect.size.height,
              fontSize: Math.ceil(textRect.font.size),
              fontFamily: textRect.font.family,
            };

            return (
              <span className="pdf__text__rect" key={index} style={style}>
                <svg viewBox={`0 0 ${style.width} ${style.height}`}>
                  <text
                    y="75%"
                    fontSize={style.height}
                    textLength={style.width}
                    lengthAdjust="spacingAndGlyphs"
                    fill="transparent"
                    height={style.height}
                  >
                    {textRect.content}
                  </text>
                </svg>
              </span>
            );
          })
        : null}
    </div>
  );
}
