import classNames from 'classnames';
import React from 'react';
import { usePdfApplication, PdfApplicationMode } from '../../core';
import { useUIComponents, useUIStrings } from '../../ui/ui.context';
import { PdfAnnotationTool, usePdfEditor } from './editor.context';
import './panel.css';

export interface PdfEditorPanelProps {}

export function PdfEditorPanel(props: PdfEditorPanelProps) {
  const { ButtonComponent } = useUIComponents();

  const strings = useUIStrings();

  const { annotationTool, setAnnotationTool } = usePdfEditor();
  const { mode } = usePdfApplication();

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  return (
    <div className="pdf__editor__panel">
      <div className="pdf__editor__panel__tools">
        <ButtonComponent
          onClick={(evt) => {
            setAnnotationTool(PdfAnnotationTool.Selection);
          }}
          className={classNames(
            annotationTool === PdfAnnotationTool.Selection
              ? 'pdf__ui__button--active'
              : ''
          )}
        >
          {strings.selection}
        </ButtonComponent>
        <ButtonComponent
          onClick={(evt) => {
            setAnnotationTool(PdfAnnotationTool.Pencil);
          }}
          className={classNames(
            annotationTool === PdfAnnotationTool.Pencil
              ? 'pdf__ui__button--active'
              : ''
          )}
        >
          {strings.pencil}
        </ButtonComponent>
      </div>
    </div>
  );
}
