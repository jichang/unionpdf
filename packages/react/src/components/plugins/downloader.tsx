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
import { useUIStrings } from '../../adapters';

/**
 * Properties of PdfDownloader
 */
export interface PdfDownloaderProps {}

/**
 * Plugin used to download pdf file
 * @param props - properties of PdfDownloader
 * @returns
 */
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

/**
 * Content of PdfDownloader
 * @param props - properties of PdfDownloaderContent
 * @returns
 *
 * @public
 */
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
