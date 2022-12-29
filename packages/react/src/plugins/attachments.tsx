import React, { useEffect, useState } from 'react';
import { ComponentProps } from 'react';
import './attachments.css';
import classNames from 'classnames';
import { ignore, PdfAttachmentObject } from '@unionpdf/models';
import { usePdfDocument } from '../core/document.context';
import { usePdfEngine } from '../core/engine.context';
import { useUIStrings } from '../ui/ui.context';

export interface PdfAttachmentsProps extends ComponentProps<'div'> {}

export const PDF_NAVIGATOR_ATTACHMENTS_PANEL = 'PdfAttachments';

export function PdfAttachments(props: PdfAttachmentsProps) {
  const { className, children, ...rest } = props;

  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const [attachments, setAttachments] = useState<PdfAttachmentObject[]>([]);

  useEffect(() => {
    if (engine && doc) {
      const task = engine.getAttachments(doc);
      task.wait(setAttachments, ignore);

      return () => {
        task.abort();
      };
    }
  }, [engine, doc]);

  const strings = useUIStrings();

  return (
    <div className={classNames('pdf__attachments', className)} {...rest}>
      <table>
        <thead>
          <tr>
            <td>{strings.fileName}</td>
            <td>{strings.fileCreationDate}</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {attachments.map((attachment) => {
            return (
              <tr key={attachment.index}>
                <td>{attachment.name}</td>
                <td>{attachment.creationDate}</td>
                <td>
                  <button
                    onClick={async () => {
                      if (engine && doc) {
                        engine
                          .readAttachmentContent(doc, attachment)
                          .wait((buffer: ArrayBuffer) => {
                            const url = URL.createObjectURL(new Blob([buffer]));
                            const linkElem = document.createElement('a');
                            linkElem.download = `${attachment.name}`;
                            linkElem.href = url;
                            linkElem.click();
                          }, ignore);
                      }
                    }}
                  >
                    {strings.download}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {children}
    </div>
  );
}
