import React, { ComponentProps, useEffect, useState } from 'react';
import { ignore, PdfMetadataObject } from '@unionpdf/models';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { useUIStrings } from '../../adapters';
import './metadata.css';
import { PdfApplicatinPluginKey, PdfPlugin, PdfPluginPanel } from '../../core';

/**
 * Properties of PdfMetadata
 */
export interface PdfMetadataProps extends ComponentProps<'div'> {}

/**
 * Plugin used to view pdf metadata
 * @param props - properties of PdfMetadata
 * @returns
 */
export function PdfMetadata(props: PdfMetadataProps) {
  const strings = useUIStrings();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Metadata}>
      <PdfPluginPanel
        pluginKey={PdfApplicatinPluginKey.Metadata}
        title={strings.metadata}
      >
        <PdfMetadataContent {...props} />
      </PdfPluginPanel>
    </PdfPlugin>
  );
}

/**
 * Content of PdfMetadata
 * @param props - properties of PdfMetadataContent
 * @returns
 *
 * @public
 */
export function PdfMetadataContent(props: PdfMetadataProps) {
  const engine = usePdfEngine();
  const { doc } = usePdfDocument();
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
    <div className="pdf__metadata" date-testid="pdf__plugin__metadata__content">
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
