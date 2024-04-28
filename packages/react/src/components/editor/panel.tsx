import classNames from 'classnames';
import React from 'react';
import { usePdfApplication, PdfApplicationMode } from '../../core';
import { useUIComponents, useUIStrings } from '../../adapters';
import { PdfAnnotationTool, usePdfEditor } from './editor.context';
import './panel.css';

/**
 * Properties of PdfEditorPanel
 */
export interface PdfEditorPanelProps {}

/**
 * Editor panel, used to switch different annotation tool
 * @param props - properties of PdfEditorPanel
 * @returns
 */
export function PdfEditorPanel(props: PdfEditorPanelProps) {
  const { Button } = useUIComponents();

  const strings = useUIStrings();

  const { annotationTool, setAnnotationTool } = usePdfEditor();
  const { mode } = usePdfApplication();

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  return (
    <div className="pdf__editor__panel">
      <div className="pdf__editor__panel__tools">
        <Button
          scenario={{ usage: 'editor-panel-selection' }}
          onClick={() => {
            setAnnotationTool(PdfAnnotationTool.Selection);
          }}
          className={classNames(
            annotationTool === PdfAnnotationTool.Selection
              ? 'pdf__ui__button--active'
              : '',
          )}
          data-testid={`pdf__editor__panel__tool__${PdfAnnotationTool.Selection}`}
        >
          {strings.selection}
        </Button>
        <Button
          scenario={{ usage: 'editor-panel-pencil' }}
          onClick={() => {
            setAnnotationTool(PdfAnnotationTool.Pencil);
          }}
          className={classNames(
            annotationTool === PdfAnnotationTool.Pencil
              ? 'pdf__ui__button--active'
              : '',
          )}
          data-testid={`pdf__editor__panel__tool__${PdfAnnotationTool.Pencil}`}
        >
          {strings.pencil}
        </Button>
      </div>
    </div>
  );
}
