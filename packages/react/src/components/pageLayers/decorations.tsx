import { Rect, transformRect } from '@unionpdf/models';
import React, { useMemo } from 'react';
import { PdfPageLayerComponentProps } from './layer';
import './decorations.css';
import { usePdfDocumentDecorations } from '../../core/decorations.context';

/**
 * Properties of PdfPageTextLayer
 */
export interface PdfPageDecorationsLayerProps
  extends PdfPageLayerComponentProps {}

/**
 * Page layer used to render decorations on pages, note those decorations is for runtime behaviour
 * it won't save to pdf file directly.
 * @param props - properties of PdfPageDecorationsLayer
 * @returns
 */
export function PdfPageDecorationsLayer(props: PdfPageDecorationsLayerProps) {
  const { isVisible, page, scaleFactor, rotation } = props;

  const { decorations } = usePdfDocumentDecorations();

  const pageDeocrations = useMemo(() => {
    return decorations.filter((decoration) => {
      return decoration.pageIndex === page.index;
    });
  }, [decorations, page]);

  return (
    <div className="pdf__page__layer pdf__page__layer--decorations">
      {isVisible
        ? pageDeocrations.map((decoration) => {
            const payload = decoration.payload as { start: Rect; end: Rect };

            const start = transformRect(
              page.size,
              payload.start,
              rotation,
              scaleFactor,
            );

            const end = transformRect(
              page.size,
              payload.end,
              rotation,
              scaleFactor,
            );

            /**
             * Assume start and end are located in the same line
             * Multiple line handling is much complex, will do it later
             */
            const top = Math.min(start.origin.y, end.origin.y);
            const left = start.origin.x;
            const height = Math.max(
              start.size.height + start.origin.y - top,
              end.size.height + end.origin.y - top,
            );
            const width = end.origin.x + end.size.width - start.origin.x;

            const style = {
              top,
              left,
              height,
              width,
            };

            return (
              <span
                className={`pdf__decoration__rect pdf__decoration__rect--${decoration.type}`}
                key={decoration.index}
                style={style}
              />
            );
          })
        : null}
    </div>
  );
}
