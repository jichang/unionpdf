import { ignore } from '@unionpdf/models';
import React, { useEffect, useState } from 'react';
import { usePdfEngine, usePdfDocument } from '../../core';
import './downloader.css';
import { Downloader } from '../common';

export interface PdfDownloaderProps {}

export function PdfDownloader(props: PdfDownloaderProps) {
  const engine = usePdfEngine();
  const { doc } = usePdfDocument();

  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  useEffect(() => {
    if (engine && doc) {
      const task = engine.saveAsCopy(doc);
      task.wait(setBuffer, ignore);

      return () => {
        task.abort();
      };
    }
  }, [engine, doc]);

  return doc && buffer ? (
    <Downloader name={doc?.name} content={buffer} />
  ) : null;
}
