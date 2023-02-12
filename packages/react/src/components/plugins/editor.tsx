import React, { useEffect } from 'react';
import { ErrorBoundary } from '../../ui';
import './editor.css';
import { PdfEditorTool, usePdfEditor } from '../editor/editor.context';
import { PdfEditorPanel } from '../editor/panel';
import { PdfApplicationMode, usePdfApplication } from '../../core';
import { PdfEditorExtractor } from '../editor';

export function PdfEditor() {
  const { mode } = usePdfApplication();
  const { tool, redo, undo } = usePdfEditor();

  useEffect(() => {
    if (mode === PdfApplicationMode.Edit) {
      const handleKey = (evt: KeyboardEvent) => {
        if (evt.metaKey) {
          if (evt.key === 'z') {
            evt.preventDefault();
            undo();
          } else if (evt.key === 'y') {
            evt.preventDefault();
            redo();
          }
        }
      };

      window.addEventListener('keydown', handleKey);

      return () => {
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [mode, undo, redo]);

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
  }

  return (
    <ErrorBoundary>
      <div className="pdf__editor">{content}</div>
    </ErrorBoundary>
  );
}
