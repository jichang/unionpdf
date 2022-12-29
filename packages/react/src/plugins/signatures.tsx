import React, { useEffect, useState } from 'react';
import { ComponentProps } from 'react';
import './signatures.css';
import classNames from 'classnames';
import { ignore, PdfSignatureObject } from '@unionpdf/models';
import { usePdfDocument } from '../core/document.context';
import { usePdfEngine } from '../core/engine.context';

export interface PdfSignaturesProps extends ComponentProps<'div'> {
  onSignaturesLoaded?: (signatures: PdfSignatureObject[]) => void;
}

export const PDF_NAVIGATOR_SIGNATURES_PANEL = 'PdfSignatures';

export function PdfSignatures(props: PdfSignaturesProps) {
  const { onSignaturesLoaded, className, children, ...rest } = props;

  const engine = usePdfEngine();
  const doc = usePdfDocument();
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
        </tbody>
      </table>
      {children}
    </div>
  );
}
