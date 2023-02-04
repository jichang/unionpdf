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
import { PdfDocumentObject, PdfEngineError, PdfSource } from '@unionpdf/models';
import { useTheme } from './theme.context';
import { PdfDocumentContextProvider } from './document.context';
import './document.css';

export interface PdfDocumentProps extends ComponentProps<'div'> {
  id: string;
  source: PdfSource;
  password: string;
  onOpenSuccess?: (pdf: PdfDocumentObject) => void;
  onOpenFailure?: (error: PdfEngineError) => void;
}

export function PdfDocument(props: PdfDocumentProps) {
  const {
    id,
    password,
    source,
    onOpenSuccess,
    onOpenFailure,
    children,
    ...rest
  } = props;
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
      let doc: PdfDocumentObject | undefined;
      const task = engine.openDocument(id, source, password);

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
  }, [engine, id, password, source]);

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
