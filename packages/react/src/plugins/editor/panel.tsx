import classNames from 'classnames';
import React from 'react';
import {
  usePdfEditor,
  EditorTool,
  usePdfApplication,
  PdfApplicationMode,
} from '../../core';
import { useUIComponents, useUIStrings } from '../../ui/ui.context';
import './panel.css';

export interface PdfEditorPanelProps {}

export function PdfEditorPanel(props: PdfEditorPanelProps) {
  const { ButtonComponent } = useUIComponents();

  const strings = useUIStrings();

  const { tool, setTool } = usePdfEditor();
  const { mode } = usePdfApplication();

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  return (
    <div className="pdf__editor__panel">
      <div className="pdf__editor__panel__tools">
        <ButtonComponent
          onClick={(evt) => {
            setTool(EditorTool.Pencil);
          }}
          className={classNames(
            tool === EditorTool.Pencil ? 'pdf__ui__button--active' : ''
          )}
        >
          {strings.pencil}
        </ButtonComponent>
        <ButtonComponent
          onClick={(evt) => {
            setTool(EditorTool.Selection);
          }}
          className={classNames(
            tool === EditorTool.Selection ? 'pdf__ui__button--active' : ''
          )}
        >
          {strings.selection}
        </ButtonComponent>
      </div>
    </div>
  );
}
