import { ignore, PdfPageObject } from '@unionpdf/models';
import React, { useCallback, useState } from 'react';
import { usePdfDocument, usePdfEngine } from '../../core';
import { useUIComponents, useUIStrings } from '../../ui';
import { PdfThumbnails } from '../plugins/thumbnails';
import './extractor.css';

export function PdfEditorExtractor() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleClickCheckbox = useCallback(
    (page: PdfPageObject) => {
      const pageIndex = page.index;
      setSelectedIndexes((pageIndexes) => {
        const index = pageIndexes.indexOf(pageIndex);
        if (index === -1) {
          return [...pageIndexes, pageIndex];
        } else {
          return pageIndexes.filter((_pageIndex) => {
            return _pageIndex !== pageIndex;
          });
        }
      });
    },
    [setSelectedIndexes]
  );

  const { ButtonComponent } = useUIComponents();
  const strings = useUIStrings();

  const doc = usePdfDocument();
  const engine = usePdfEngine();

  const extract = useCallback(() => {
    if (engine && doc) {
      const task = engine.extract(doc, selectedIndexes);
      task.wait((buffer) => {
        const blob = new Blob([buffer]);
        const url = URL.createObjectURL(blob);
        const linkElem = document.createElement('a');
        linkElem.download = `${doc.id}`;
        linkElem.href = url;
        linkElem.click();
      }, ignore);
    }
  }, [doc, engine, selectedIndexes]);

  return (
    <div className="pdf__editor__extractor">
      <PdfThumbnails
        layout={{ direction: 'vertical', itemsCount: 4 }}
        size={{ width: 50, height: 50 }}
        scaleFactor={0.25}
        enableCheckbox={true}
        selectedIndexes={selectedIndexes}
        onClickCheckbox={handleClickCheckbox}
      />
      <div className="pdf__editor__extractor__footer">
        <ButtonComponent onClick={extract}>{strings.extract}</ButtonComponent>
      </div>
    </div>
  );
}
