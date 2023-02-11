import React from 'react';
import { ErrorBoundary } from '../../ui';
import './editor.css';
import { PdfEditorTool, usePdfEditor } from '../editor/editor.context';
import { PdfEditorPanel } from '../editor/panel';
import { PdfApplicationMode, usePdfApplication } from '../../core';
import { PdfEditorExtractor } from '../editor';

export function PdfEditor() {
  const { mode } = usePdfApplication();
  const { tool } = usePdfEditor();

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
