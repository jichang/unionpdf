import React from 'react';
import { PdfThumbnails } from '../plugins/thumbnails';
import './extractor.css';

export function PdfEditorExtractor() {
  return (
    <div className="pdf__editor__extractor">
      <PdfThumbnails
        layout={{ direction: 'vertical', itemsCount: 4 }}
        size={{ width: 50, height: 50 }}
        scaleFactor={0.25}
      />
    </div>
  );
}
