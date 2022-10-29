import React from 'react';
import {
  ComponentProps,
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePdfEngine } from './engine.context';
import { PdfDocumentObject, PdfSource } from '@unionpdf/models';
import { useTheme } from './theme.context';
import { PdfDocumentContextProvider } from './document.context';

export interface PdfDocumentProps extends ComponentProps<'div'> {
  id: string;
  source: PdfSource;
  onOpenSuccess?: (pdf: PdfDocumentObject) => void;
  onOpenFailure?: (error: Error) => void;
}

export function PdfDocument(props: PdfDocumentProps) {
  const { id, source, onOpenSuccess, onOpenFailure, children, ...rest } = props;
  const [doc, setDoc] = useState<PdfDocumentObject | null>(null);
  const engine = usePdfEngine();
  const theme = useTheme();

  const onOpenSuccessRef =
    useRef<PdfDocumentProps['onOpenSuccess']>(onOpenSuccess);
  onOpenSuccessRef.current = onOpenSuccess;
  const onOpenFailureRef =
    useRef<PdfDocumentProps['onOpenFailure']>(onOpenFailure);
  onOpenFailureRef.current = onOpenFailure;

  useEffect(() => {
    if (engine && id && source) {
      setDoc(null);

      let doc: PdfDocumentObject | undefined;
      const task = engine.openDocument(id, source);

      task.wait(
        (_doc) => {
          doc = _doc;
          setDoc(doc);
          onOpenSuccessRef.current?.(doc);
        },
        (error: Error) => {
          onOpenFailureRef.current?.(error);
        }
      );

      return () => {
        task.abort();
        if (doc) {
          engine.closeDocument(doc);
        }
      };
    }
  }, [engine, id, source]);

  const themeStyle = useMemo(() => {
    const styles = {} as Record<string, string | number>;
    for (let key in theme) {
      styles[`--${key}`] = theme[key];
    }

    return styles as CSSProperties;
  }, [theme]);

  return (
    <div className="pdf__document" style={themeStyle} {...rest}>
      {doc ? (
        <PdfDocumentContextProvider doc={doc}>
          {children}
        </PdfDocumentContextProvider>
      ) : null}
    </div>
  );
}
