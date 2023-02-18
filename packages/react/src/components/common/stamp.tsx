import { calculateDegree, Rotation } from '@unionpdf/models';
import React, { useRef, useEffect } from 'react';
import './stamp.css';

export interface Stamp {
  source: ImageData;
}

export interface PdfStampProps {
  index: number;
  stamp: Stamp;
}

export function PdfStamp(props: PdfStampProps) {
  const { stamp } = props;

  const canvasElemRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem) {
      canvasElem.width = stamp.source.width;
      canvasElem.height = stamp.source.height;
      const ctx = canvasElem.getContext('2d');

      if (ctx) {
        ctx.resetTransform();
        ctx?.clearRect(0, 0, stamp.source.width, stamp.source.height);
        ctx.putImageData(stamp.source, 0, 0);
      }
    }
  }, [stamp]);

  return <canvas className="pdf__stamp" ref={canvasElemRef} />;
}
