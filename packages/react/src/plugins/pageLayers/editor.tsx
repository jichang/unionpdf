import { PdfPageObject, Rotation } from '@unionpdf/models';
import React from 'react';
import {
  PdfApplicationMode,
  usePdfApplication,
  usePdfEditor,
} from '../../core';

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

  const { decorations } = usePdfEditor();

  if (mode === PdfApplicationMode.View) {
    return null;
  }

  return (
    <div className="pdf__page__layer pdf__page__layer--editor">
      {decorations[page.index]?.map((decoration, index) => {
        return <div key={decoration.id}></div>;
      })}
    </div>
  );
}
