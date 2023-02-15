import React, { useEffect, useRef } from 'react';
import { Stamp, usePdfEditorStamps } from './stamps.context';
import './stamps.css';

export interface PdfEidtorStampsProps {}

export function PdfEditorStamps() {
  const { stamps } = usePdfEditorStamps();

  return (
    <div className="pdf__editor__stamps">
      {stamps.map((stamp, index) => {
        return <PdfEditorStamp stamp={stamp} key={index} />;
      })}
    </div>
  );
}

export interface PdfEditorStampProps {
  stamp: Stamp;
}

export function PdfEditorStamp(props: PdfEditorStampProps) {
  const { stamp } = props;

  const canvasElemRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem) {
      canvasElem.width = stamp.source.width;
      canvasElem.height = stamp.source.height;
      const ctx = canvasElem.getContext('2d');

      if (ctx) {
        ctx?.clearRect(0, 0, stamp.source.width, stamp.source.height);

        if (stamp.source instanceof ImageData) {
          ctx.putImageData(stamp.source, 0, 0);
        } else if (stamp.source instanceof ImageBitmap) {
          ctx.drawImage(stamp.source, 0, 0);
        } else if (stamp.source instanceof HTMLImageElement) {
          ctx.drawImage(stamp.source, 0, 0);
        }
      }
    }
  }, [stamp]);

  return <canvas className="pdf__editor__stamp" ref={canvasElemRef} />;
}
