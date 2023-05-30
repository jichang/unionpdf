import React, { useEffect, useState } from 'react';
import { ComponentProps } from 'react';
import './signatures.css';
import classNames from 'classnames';
import { ignore, PdfSignatureObject } from '@unionpdf/models';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { useUIStrings } from '../../ui';

export interface PdfSignaturesProps extends ComponentProps<'div'> {
  onSignaturesLoaded?: (signatures: PdfSignatureObject[]) => void;
}

export const PDF_NAVIGATOR_SIGNATURES_PANEL = 'PdfSignatures';

export function PdfSignatures(props: PdfSignaturesProps) {
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
