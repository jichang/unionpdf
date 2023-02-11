import React, { ComponentProps, useEffect, useState } from 'react';
import { ignore, PdfMetadataObject } from '@unionpdf/models';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { useUIStrings } from '../../ui/ui.context';
import './metadata.css';

export interface PdfMedataProps extends ComponentProps<'div'> {}

export function PdfMetadata(props: PdfMedataProps) {
  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const strings = useUIStrings();
  const [metadata, setMetadata] = useState<PdfMetadataObject | null>(null);

  useEffect(() => {
    if (engine && doc) {
      const task = engine.getMetadata(doc);
      task.wait(setMetadata, ignore);

      return () => {
        task.abort();
      };
    }
  }, [engine, doc]);

  return (
    <div className="pdf__metadata">
      <table>
        <tbody>
          <tr>
            <td>{strings.title}</td>
            <td>{metadata?.title || '-'}</td>
          </tr>
          <tr>
            <td>{strings.author}</td>
            <td>{metadata?.author || '-'}</td>
          </tr>
          <tr>
            <td>{strings.subject}</td>
            <td>{metadata?.subject || '-'}</td>
          </tr>
          <tr>
            <td>{strings.producer}</td>
            <td>{metadata?.producer || '-'}</td>
          </tr>
          <tr>
            <td>{strings.creator}</td>
            <td>{metadata?.creator || '-'}</td>
          </tr>
          <tr>
            <td>{strings.creationDate}</td>
            <td>{metadata?.creationDate || '-'}</td>
          </tr>
          <tr>
            <td>{strings.modificationDate}</td>
            <td>{metadata?.modificationDate || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
