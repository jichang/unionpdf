import React, { useEffect, useState } from 'react';
import { ComponentProps } from 'react';
import './signatures.css';
import classNames from 'classnames';
import { ignore, PdfSignatureObject } from '@unionpdf/models';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { useUIStrings } from '../../adapters';
import { PdfApplicatinPluginKey, PdfPlugin, PdfPluginDialog } from '../../core';

/**
 * Properties of PdfSignature
 */
export interface PdfSignaturesProps extends ComponentProps<'div'> {
  onSignaturesLoaded?: (signatures: PdfSignatureObject[]) => void;
}

export const PDF_NAVIGATOR_SIGNATURES_PANEL = 'PdfSignatures';

/**
 * Plugin used to viewing signature
 * @param props - properties of PdfSignature
 * @returns
 */
export function PdfSignatures(props: PdfSignaturesProps) {
  const strings = useUIStrings();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Signatures}>
      <PdfPluginDialog
        pluginKey={PdfApplicatinPluginKey.Signatures}
        title={strings.signatures}
      >
        <PdfSignaturesContent {...props} />
      </PdfPluginDialog>
    </PdfPlugin>
  );
}

/**
 * Content of PdfSignature
 * @param props - properties of PdfSignatureContent
 * @returns
 *
 * @public
 */
export function PdfSignaturesContent(props: PdfSignaturesProps) {
  const { onSignaturesLoaded, className, children, ...rest } = props;

  const engine = usePdfEngine();
  const { doc } = usePdfDocument();
  const [signatures, setSignatures] = useState<PdfSignatureObject[]>([]);

  useEffect(() => {
    if (engine && doc) {
      const task = engine.getSignatures(doc);
      task.wait((signatures: PdfSignatureObject[]) => {
        setSignatures(signatures);
        onSignaturesLoaded?.(signatures);
      }, ignore);

      return () => {
        task.abort();
      };
    }
  }, [engine, doc, onSignaturesLoaded]);

  const strings = useUIStrings();

  return (
    <div className={classNames('pdf__signatures', className)} {...rest}>
      <table>
        <tbody>
          {signatures.map((signature, index) => {
            return (
              <tr key={index}>
                <td>{signature.reason}</td>
                <td>{signature.time}</td>
                <td>{signature.docMDP}</td>
              </tr>
            );
          })}
          {signatures.length === 0 ? (
            <tr key="no-signatures">
              <td colSpan={3}>{strings.noSignatures}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
      {children}
    </div>
  );
}
