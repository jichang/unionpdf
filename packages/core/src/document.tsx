import React from "react";
import {
  ComponentProps,
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PdfDocumentContextProvider, usePdfEngine } from "./context";
import {
  PdfDocumentObject,
  PdfError,
  PdfSource,
  PdfEngine,
} from "@onepdf/models";
import { useTheme } from "./theme";

export interface PdfDocumentProps extends ComponentProps<"div"> {
  source: PdfSource;
  onOpenSuccess: (pdf: PdfDocumentObject) => void;
  onOpenFailure: (error: Error) => void;
}

export function PdfDocument(props: PdfDocumentProps) {
  const { source, onOpenSuccess, onOpenFailure, children, ...rest } = props;
  const [doc, setDoc] = useState<PdfDocumentObject | null>(null);
  const engine = usePdfEngine();
  const theme = useTheme();

  const onOpenSuccessRef =
    useRef<PdfDocumentProps["onOpenSuccess"]>(onOpenSuccess);
  onOpenSuccessRef.current = onOpenSuccess;
  const onOpenFailureRef =
    useRef<PdfDocumentProps["onOpenFailure"]>(onOpenFailure);
  onOpenFailureRef.current = onOpenFailure;

  useEffect(() => {
    if (engine) {
      const load = async (
        engine: PdfEngine,
        source: PdfSource,
        signal: AbortSignal
      ) => {
        try {
          const doc = await engine.open(source, signal);
          setDoc(doc);
          onOpenSuccessRef.current?.(doc);
        } catch (e: unknown) {
          onOpenFailureRef.current(new PdfError(e));
        }
      };

      const abortController = new AbortController();
      load(engine, source, abortController.signal);

      return () => {
        abortController.abort();
      };
    }
  }, [engine, source]);

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
