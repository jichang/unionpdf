import React, { useEffect } from 'react';
import './editor.css';
import { PdfEditorTool, usePdfEditor } from '../editor/editor.context';
import { PdfEditorPanel } from '../editor/panel';
import {
  ErrorBoundary,
  PdfApplicationMode,
  usePdfApplication,
  usePdfDocument,
  usePdfNavigator,
} from '../../core';
import { PdfEditorExtractor, PdfEditorStamps } from '../editor';

export function PdfEditor() {
  const { mode } = usePdfApplication();
  const { doc } = usePdfDocument();
  const pdfNavigator = usePdfNavigator();
  const { tool, redo, undo, paste } = usePdfEditor();

  useEffect(() => {
    if (mode === PdfApplicationMode.Edit) {
      const handleKey = (evt: KeyboardEvent) => {
        if (evt.metaKey || evt.ctrlKey) {
          if (evt.key === 'z') {
            evt.preventDefault();
            undo();
          } else if (evt.key === 'y') {
            evt.preventDefault();
            redo();
          } else if (evt.key === 'v') {
            if (doc) {
              const page = doc.pages[pdfNavigator.currPageIndex];
              paste(page);
            }
          }
        }
      };

      window.addEventListener('keydown', handleKey);

      return () => {
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [mode, doc, pdfNavigator, undo, redo, paste]);

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  let content: React.ReactElement | null = null;
  switch (tool) {
    case PdfEditorTool.Annotation:
      content = <PdfEditorPanel />;
      break;
    case PdfEditorTool.Extract:
      content = <PdfEditorExtractor />;
      break;
    case PdfEditorTool.Stamp:
      content = <PdfEditorStamps />;
      break;
  }

  return (
    <ErrorBoundary>
      <div className="pdf__editor">{content}</div>
    </ErrorBoundary>
  );
}
