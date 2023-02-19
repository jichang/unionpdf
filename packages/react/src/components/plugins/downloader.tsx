import { ignore } from '@unionpdf/models';
import React, { useEffect, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../ui/ui.context';
import { usePdfEngine, usePdfDocument } from '../../core';
import { userUrl } from '../../hooks/useUrl';
import './downloader.css';

export interface PdfDownloaderProps {}

export function PdfDownloader(props: PdfDownloaderProps) {
  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const { LinkComponent } = useUIComponents();
  const strings = useUIStrings();

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

  const url = userUrl(buffer);

  return (
    <div className="pdf__downloader">
      <p className="pdf__downloader__message">{doc?.name}</p>
      <div className="pdf__downloader__action">
        <LinkComponent download={doc?.name} href={url}>
          {strings.download}
        </LinkComponent>
      </div>
    </div>
  );
}
