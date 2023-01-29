import { PdfPageObject, Rotation } from '@unionpdf/models';
import React from 'react';
import {
  EditorTool,
  PdfApplicationMode,
  usePdfApplication,
  usePdfEditor,
} from '../../core';
import './editor.css';

export interface PdfPageEditorLayerProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  inVisibleRange: boolean;
  inCacheRange: boolean;
}

export function PdfPageEditorLayer(props: PdfPageEditorLayerProps) {
  const { page } = props;
  const { mode } = usePdfApplication();

  const { tool, stacks } = usePdfEditor();

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  const operations = stacks.undo.filter((operation) => {
    return operation.pageIndex === page.index;
  });

  return (
    <div className="pdf__page__layer pdf__page__layer--editor">
      {operations.map((operation, index) => {
        return <div key={operation.id}></div>;
      })}
      {tool === EditorTool.Pencil ? <canvas /> : null}
    </div>
  );
}
