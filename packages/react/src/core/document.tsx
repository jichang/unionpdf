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
import { PdfDocumentObject, PdfEngineError, PdfFile } from '@unionpdf/models';
import { useTheme } from './theme.context';
import { PdfDocumentContextProvider } from './document.context';
import './document.css';

export interface PdfDocumentProps extends ComponentProps<'div'> {
  file: PdfFile | null;
  password: string;
  onOpenSuccess?: (pdf: PdfDocumentObject) => void;
  onOpenFailure?: (error: PdfEngineError) => void;
}

export function PdfDocument(props: PdfDocumentProps) {
  const { file, password, onOpenSuccess, onOpenFailure, children, ...rest } =
    props;
  const [version, setVersion] = useState<number>(() => {
    return Date.now();
  });
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
    if (engine) {
      if (!file) {
        setDoc(null);
      } else {
        let doc: PdfDocumentObject | undefined;
        const task = engine.openDocument(file, password);

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
    }
  }, [engine, file, password]);

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
        <PdfDocumentContextProvider
          doc={doc}
          version={version}
          setVersion={setVersion}
        >
          {children}
        </PdfDocumentContextProvider>
      ) : null}
    </div>
  );
}
