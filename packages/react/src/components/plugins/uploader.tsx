import { ignore } from '@unionpdf/models';
import { useEffect } from 'react';
import { usePdfEngine, usePdfDocument } from '../../core';
import './uploader.css';

export interface PdfUploaderProps {
  onUpload: (content: ArrayBuffer) => void;
}

export function PdfUploader(props: PdfUploaderProps) {
  const { onUpload } = props;
  const engine = usePdfEngine();
  const doc = usePdfDocument();

  useEffect(() => {
    if (engine && doc) {
      const task = engine.saveAsCopy(doc);
      task.wait(onUpload, ignore);

      return () => {
        task.abort();
      };
    }
  }, [engine, doc]);

  return null;
}
