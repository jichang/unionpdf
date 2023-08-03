import React, { useEffect } from 'react';
import './editor.css';
import { PdfEditorTool, usePdfEditor } from '../editor/editor.context';
import { PdfEditorPanel } from '../editor/panel';
import {
  PdfApplicatinPluginKey,
  PdfApplicationMode,
  PdfPlugin,
  usePdfApplication,
  usePdfDocument,
  usePdfNavigator,
} from '../../core';
import { PdfEditorExtractor, PdfEditorStamps } from '../editor';

/**
 * Properties of PdfEditor
 */
export interface PdfEditorProps {}

/**
 * Plugin used to edit pdf file
 * @param props - properties of PdfEditor
 * @returns
 */
export function PdfEditor(props: PdfEditorProps) {
  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Editor}>
      <PdfEditorContent {...props} />
    </PdfPlugin>
  );
}

/**
 * Content of PdfEditor
 * @param props - properties of PdfEditorContent
 * @returns
 *
 * @public
 */
export function PdfEditorContent(props: PdfEditorProps) {
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
    <div date-testid="pdf__plugin__editor__content" className="pdf__editor">
      {content}
    </div>
  );
}
