import React, { useRef, useEffect } from 'react';
import './stamp.css';

export interface Stamp {
  source: ImageData | ImageBitmap | HTMLImageElement;
}

export interface PdfStampProps {
  index: number;
  stamp: Stamp;
}

export function PdfStamp(props: PdfStampProps) {
  const { index, stamp } = props;

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

  return <canvas ref={canvasElemRef} />;
}
