import {
  PdfNavigatorEvent,
  usePdfDocument,
  usePdfEngine,
  usePdfNavigator,
} from '@onepdf/core';
import { PdfOutlinesObject, PdfOutlineEntryObject } from '@onepdf/models';
import React, { useCallback, useEffect, useState } from 'react';
import './outlines.css';

export const PDF_NAVIGATOR_SOURCE_OUTLINES = 'PdfOutlines';

export interface PdfOutlinesProps {}

export function PdfOutlines(props: PdfOutlinesProps) {
  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const [outlines, setOutlines] = useState<PdfOutlinesObject>({ entries: [] });

  useEffect(() => {
    if (engine) {
      const load = async () => {
        const result = engine.getOutlines();
        if (result instanceof Promise) {
          result.then(setOutlines);
        } else {
          setOutlines(result);
        }
      };

      load();
    }
  }, [engine, doc]);

  const pdfNavigator = usePdfNavigator();
  const [currPageIndex, setCurrPageIndex] = useState(
    pdfNavigator?.currPageIndex || 0
  );

  useEffect(() => {
    if (pdfNavigator) {
      const handle = (evt: PdfNavigatorEvent, source: string) => {
        switch (evt.kind) {
          case 'Change':
            if (source !== PDF_NAVIGATOR_SOURCE_OUTLINES) {
              setCurrPageIndex(evt.data.pageIndex);
            }
            break;
        }
      };
      pdfNavigator.addEventListener(PDF_NAVIGATOR_SOURCE_OUTLINES, handle);

      return () => {
        pdfNavigator.removeEventListener(PDF_NAVIGATOR_SOURCE_OUTLINES, handle);
      };
    }
  }, [pdfNavigator, setCurrPageIndex]);

  const handleEntryClicked = useCallback(
    (entry: PdfOutlineEntryObject) => {
      pdfNavigator?.gotoPage(entry.pageIndex, PDF_NAVIGATOR_SOURCE_OUTLINES);
    },
    [pdfNavigator]
  );

  return (
    <div className="pdf__outlines">
      <ol>
        {outlines.entries.map((entry, index) => {
          return (
            <PdfOutlineEntry
              key={index}
              currPageIndex={currPageIndex}
              entry={entry}
              onClick={handleEntryClicked}
            />
          );
        })}
      </ol>
    </div>
  );
}

export interface PdfOutlineEntryProps {
  currPageIndex: number;
  entry: PdfOutlineEntryObject;
  onClick: (entry: PdfOutlineEntryObject) => void;
}

export function PdfOutlineEntry(props: PdfOutlineEntryProps) {
  const { currPageIndex, entry, onClick } = props;

  const isCurrent = currPageIndex === entry.pageIndex;
  const [isUnfold, setIsUnfold] = useState(false);

  const activiate = useCallback(() => {
    setIsUnfold((isUnfold) => {
      return !isUnfold;
    });
    onClick(entry);
  }, [setIsUnfold, onClick, entry]);

  return (
    <li
      tabIndex={0}
      className={`pdf__outlines__entry ${
        isCurrent ? 'pdf__outlines__entry--current' : ''
      }`}
    >
      <span onClick={activiate}>{entry.text}</span>
      {entry.children && isUnfold ? (
        <ol style={{ listStyle: 'none', paddingLeft: '1rem' }}>
          {entry.children.map((entry, index) => {
            return (
              <PdfOutlineEntry
                key={index}
                currPageIndex={currPageIndex}
                entry={entry}
                onClick={onClick}
              />
            );
          })}
        </ol>
      ) : null}
    </li>
  );
}
