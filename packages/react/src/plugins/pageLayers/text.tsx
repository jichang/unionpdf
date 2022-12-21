import {
  ignore,
  PdfPageObject,
  PdfTextRectObject,
  Rotation,
} from '@unionpdf/models';
import React, { useState, useEffect } from 'react';
import './text.css';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { calculateRectStyle } from '../helpers/annotation';

export interface PdfPageTextProps {
  isVisible: boolean;
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageText(props: PdfPageTextProps) {
  const { isVisible, page, scaleFactor, rotation } = props;
  const engine = usePdfEngine();
  const doc = usePdfDocument();
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
        ? rects.map((rect, index) => {
            const style = calculateRectStyle(rect.rect, scaleFactor, rotation);

            return (
              <div className="pdf__text__span" key={index} style={style}>
                <svg viewBox={`0 0 ${style.width} ${style.height}`}>
                  <text
                    y="50%"
                    fontSize={style.height}
                    textLength={style.width}
                    lengthAdjust="spacingAndGlyphs"
                    fill="transparent"
                  >
                    {rect.content}
                  </text>
                </svg>
              </div>
            );
          })
        : null}
    </div>
  );
}
