import { ignore } from '@unionpdf/models';
import React, { useEffect, useState } from 'react';
import {
  usePdfEngine,
  usePdfDocument,
  PdfApplicatinPluginKey,
  PdfPlugin,
  PdfPluginDialog,
} from '../../core';
import './downloader.css';
import { Downloader } from '../common';
import { useUIComponents, useUIStrings } from '../../adapters';

export interface PdfDownloaderProps {}

export function PdfDownloader(props: PdfDownloaderProps) {
  const strings = useUIStrings();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Downloader}>
      <PdfPluginDialog
        pluginKey={PdfApplicatinPluginKey.Downloader}
        title={strings.saveAs}
      >
        <PdfDownloaderContent {...props} />
      </PdfPluginDialog>
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

  if (!doc || !buffer) {
    return null;
  }

  return <Downloader name={doc?.name} content={buffer} />;
}
