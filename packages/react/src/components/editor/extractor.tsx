import { ignore, PdfPageObject } from '@unionpdf/models';
import React, { useCallback, useState } from 'react';
import { usePdfDocument, usePdfEngine } from '../../core';
import { useUIComponents, useUIStrings } from '../../adapters';
import { PdfThumbnailsContent } from '../plugins/thumbnails';
import './extractor.css';

/**
 * Pdf extractor component, used to extract pages and text from pdf document
 * @returns
 */
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
    [setSelectedIndexes],
  );

  const { Button } = useUIComponents();
  const strings = useUIStrings();

  const { doc } = usePdfDocument();
  const engine = usePdfEngine();

  const extractPages = useCallback(() => {
    if (engine && doc) {
      const task = engine.extractPages(doc, selectedIndexes);
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

  const extractText = useCallback(() => {
    if (engine && doc) {
      const task = engine.extractText(doc, selectedIndexes);
      task.wait((buffer) => {
        const blob = new Blob([buffer]);
        const url = URL.createObjectURL(blob);
        const linkElem = document.createElement('a');
        linkElem.download = `${doc.id}.txt`;
        linkElem.href = url;
        linkElem.click();
      }, ignore);
    }
  }, [doc, engine, selectedIndexes]);

  return (
    <div className="pdf__editor__extractor">
      <PdfThumbnailsContent
        layout={{ direction: 'vertical', itemsCount: 4 }}
        size={{ width: 50, height: 50 }}
        scaleFactor={0.25}
        enableCheckbox={true}
        selectedIndexes={selectedIndexes}
        onClickCheckbox={handleClickCheckbox}
      />
      <div className="pdf__editor__extractor__footer">
        <Button
          scenario={{ usage: 'extractor-extract-pages' }}
          data-testid={`pdf__editor__extractor__extract__pages__button}`}
          onClick={extractPages}
        >
          {strings.extractPages}
        </Button>
        <Button
          scenario={{ usage: 'extractor-extract-text' }}
          data-testid={`pdf__editor__extractor__extract__text__button}`}
          onClick={extractText}
        >
          {strings.extractText}
        </Button>
      </div>
    </div>
  );
}
