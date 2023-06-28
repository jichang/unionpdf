import { ignore } from '@unionpdf/models';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  usePdfEngine,
  usePdfDocument,
  PdfApplicatinPluginKey,
  usePdfApplication,
  PdfPlugin,
} from '../../core';
import { useUIComponents, useUIStrings } from '../../adapters';
import './printer.css';

export enum PrinterMethod {
  Iframe,
}

export interface PdfPrinterProps {
  method: PrinterMethod;
}

export function PdfPrinter(props: PdfPrinterProps) {
  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Printer}>
      <PdfPrinterContent {...props} />
    </PdfPlugin>
  );
}

export function PdfPrinterContent(props: PdfPrinterProps) {
  const { method } = props;
  const strings = useUIStrings();
  const { Button } = useUIComponents();
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

  useEffect(() => {
    if (buffer) {
      if (method === PrinterMethod.Iframe) {
        const url = URL.createObjectURL(
          new Blob([buffer], {
            type: 'application/pdf',
          })
        );
        const iframeElem = document.createElement('iframe');
        iframeElem.style.display = 'none';
        iframeElem.src = url;
        document.body.appendChild(iframeElem);
        iframeElem.contentWindow?.focus();
        iframeElem.contentWindow?.print();

        return () => {
          document.body.removeChild(iframeElem);
        };
      }
    }
  }, [method, buffer]);

  const { Dialog } = useUIComponents();

  const { hidePlugin } = usePdfApplication();

  const cancelPrint = React.useCallback(() => {
    hidePlugin(PdfApplicatinPluginKey.Printer);
  }, [hidePlugin]);

  return (
    <Dialog open>
      <div className="pdf__printer">
        <p className="pdf__printer__message">
          {strings.printing}: {doc?.name}
        </p>
        <div className="pdf__printer__action">
          <Button onClick={cancelPrint}>{strings.cancel}</Button>
        </div>
      </div>
    </Dialog>
  );
}
