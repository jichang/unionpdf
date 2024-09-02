import { ignore, PdfErrorCode } from '@unionpdf/models';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  usePdfEngine,
  usePdfDocument,
  PdfApplicatinPluginKey,
  usePdfApplication,
  PdfPlugin,
  PdfPluginDialog,
} from '../../core';
import { useUIComponents, useUIStrings } from '../../adapters';
import './printer.css';

/**
 * Method used for printing
 */
export enum PrinterMethod {
  Iframe,
}

/**
 * Properties of PdfPrinter
 */
export interface PdfPrinterProps {
  /**
   * method used for printing
   */
  method: PrinterMethod;
}

/**
 * Plugin used to printing pdf
 * @param props - properties of PdfPrinter
 * @returns
 */
export function PdfPrinter(props: PdfPrinterProps) {
  const strings = useUIStrings();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Printer}>
      <PdfPluginDialog
        pluginKey={PdfApplicatinPluginKey.Printer}
        title={strings.print}
      >
        <PdfPrinterContent {...props} />
      </PdfPluginDialog>
    </PdfPlugin>
  );
}

/**
 * Content of PdfPrinter
 * @param props - properties of PdfPrinterContent
 * @returns
 *
 * @public
 */
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
        task.abort({
          code: PdfErrorCode.Cancelled,
          message: '',
        });
      };
    }
  }, [engine, doc]);

  useEffect(() => {
    if (buffer) {
      if (method === PrinterMethod.Iframe) {
        const url = URL.createObjectURL(
          new Blob([buffer], {
            type: 'application/pdf',
          }),
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

  const { hidePlugin } = usePdfApplication();

  const cancelPrint = React.useCallback(() => {
    hidePlugin(PdfApplicatinPluginKey.Printer);
  }, [hidePlugin]);

  return (
    <div className="pdf__printer">
      <p className="pdf__printer__message">
        {strings.printing}: {doc?.name}
      </p>
      <div className="pdf__printer__action">
        <Button scenario={{ usage: 'cancel-print' }} onClick={cancelPrint}>
          {strings.cancel}
        </Button>
      </div>
    </div>
  );
}
