import {
  PdfBookmarksObject,
  PdfBookmarkObject,
  PdfActionType,
} from '@unionpdf/models';
import React, { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from '../ui/errorboundary';
import './bookmarks.css';
import { usePdfDocument } from '../core/document.context';
import { usePdfEngine } from '../core/engine.context';
import { PdfNavigatorEvent } from '../core/navigator';
import { usePdfNavigator } from '../core/navigator.context';

export const PDF_NAVIGATOR_SOURCE_OUTLINES = 'PdfBookmarks';

export interface PdfBookmarksProps {}

export function PdfBookmarks(props: PdfBookmarksProps) {
  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const [bookmarks, setBookmarks] = useState<PdfBookmarksObject>({
    bookmarks: [],
  });

  useEffect(() => {
    if (engine && doc) {
      const task = engine.getBookmarks(doc);
      task.wait(setBookmarks, () => {});

      return () => {
        task.abort();
      };
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
          case 'GotoPage':
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
    (bookmark: PdfBookmarkObject) => {
      if (!bookmark.target) {
        return;
      }

      switch (bookmark.target.type) {
        case 'action':
          {
            switch (bookmark.target.action.type) {
              case PdfActionType.Goto:
                pdfNavigator?.gotoPage(
                  { pageIndex: bookmark.target.action.destination.pageIndex },
                  PDF_NAVIGATOR_SOURCE_OUTLINES
                );

                break;
            }
          }
          break;
        case 'destination':
          pdfNavigator?.gotoPage(
            { pageIndex: bookmark.target.destination.pageIndex },
            PDF_NAVIGATOR_SOURCE_OUTLINES
          );
          break;
      }
    },
    [pdfNavigator]
  );

  return (
    <ErrorBoundary>
      <div className="pdf__bookmarks">
        <ol>
          {bookmarks.bookmarks.map((bookmark, index) => {
            return (
              <PdfBookmarkEntry
                key={index}
                currPageIndex={currPageIndex}
                bookmark={bookmark}
                onClick={handleEntryClicked}
              />
            );
          })}
        </ol>
      </div>
    </ErrorBoundary>
  );
}

export interface PdfBookmarkEntryProps {
  currPageIndex: number;
  bookmark: PdfBookmarkObject;
  onClick: (entry: PdfBookmarkObject) => void;
}

export function PdfBookmarkEntry(props: PdfBookmarkEntryProps) {
  const { currPageIndex, bookmark, onClick } = props;

  let isCurrent = false;

  if (bookmark.target) {
    switch (bookmark.target.type) {
      case 'destination':
        isCurrent = currPageIndex === bookmark.target.destination.pageIndex;
        break;
      case 'action':
        {
          switch (bookmark.target.action.type) {
            case PdfActionType.Goto:
              isCurrent =
                bookmark.target.action.destination.pageIndex === currPageIndex;
              break;
          }
        }
        break;
    }
  }
  const [isUnfold, setIsUnfold] = useState(false);

  const activiate = useCallback(() => {
    setIsUnfold((isUnfold) => {
      return !isUnfold;
    });
    onClick(bookmark);
  }, [setIsUnfold, onClick, bookmark]);

  return (
    <li
      tabIndex={0}
      className={`pdf__bookmarks__entry ${
        isCurrent ? 'pdf__bookmarks__entry--current' : ''
      }`}
    >
      <span onClick={activiate}>{bookmark.title}</span>
      {bookmark.children && bookmark.children.length !== 0 && isUnfold ? (
        <ol style={{ listStyle: 'none', paddingLeft: '1rem' }}>
          {bookmark.children.map((entry, index) => {
            return (
              <PdfBookmarkEntry
                key={index}
                currPageIndex={currPageIndex}
                bookmark={entry}
                onClick={onClick}
              />
            );
          })}
        </ol>
      ) : null}
    </li>
  );
}
