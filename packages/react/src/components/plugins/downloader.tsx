import { ignore } from '@unionpdf/models';
import React, { useEffect, useState } from 'react';
import {
  usePdfEngine,
  usePdfDocument,
  PdfApplicatinPluginKey,
  PdfPlugin,
} from '../../core';
import './downloader.css';
import { Downloader } from '../common';
import { useUIComponents } from '../../adapters';

export interface PdfDownloaderProps {}

export function PdfDownloader(props: PdfDownloaderProps) {
  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Downloader}>
      <PdfDownloaderContent {...props} />
    </PdfPlugin>
  );
}

export function PdfDownloaderContent(props: PdfDownloaderProps) {
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

  const { Dialog } = useUIComponents();

  if (!doc || !buffer) {
    return null;
  }

  return (
    <Dialog open>
      <Downloader name={doc?.name} content={buffer} />
    </Dialog>
  );
}
