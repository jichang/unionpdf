import { PdfPageObject, Rotation } from '@unionpdf/models';
import React from 'react';
import {
  EditorTool,
  PdfApplicationMode,
  usePdfApplication,
  usePdfEditor,
} from '../../core';
import { PdfEditorAnnotations, PdfEditorCanvas } from '../editor';
import './editor.css';

export interface PdfPageEditorLayerProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  isVisible: boolean;
  inVisibleRange: boolean;
  inCacheRange: boolean;
}

export function PdfPageEditorLayer(props: PdfPageEditorLayerProps) {
  const { isVisible, inVisibleRange, page, scaleFactor, rotation } = props;
  const { mode } = usePdfApplication();

  const { tool } = usePdfEditor();

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  if (!isVisible && !inVisibleRange) {
    return null;
  }

  return (
    <div className="pdf__page__layer pdf__page__layer--editor">
      <PdfEditorAnnotations
        page={page}
        scaleFactor={scaleFactor}
        rotation={rotation}
      />
      <PdfEditorCanvas
        page={page}
        scaleFactor={scaleFactor}
        rotation={rotation}
      />
    </div>
  );
}
