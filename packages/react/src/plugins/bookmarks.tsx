import {
  PdfBookmarksObject,
  PdfBookmarkObject,
  PdfActionType,
  ignore,
} from '@unionpdf/models';
import React, { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from '../ui/errorboundary';
import './bookmarks.css';
import { usePdfDocument } from '../core/document.context';
import { usePdfEngine } from '../core/engine.context';
import { PdfNavigatorEvent } from '../core/navigator';
import { usePdfNavigator } from '../core/navigator.context';
import { useUIComponents } from '../ui';

export const PDF_NAVIGATOR_SOURCE_BOOKMARKS = 'PdfBookmarks';

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
      task.wait(setBookmarks, ignore);

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
            if (source !== PDF_NAVIGATOR_SOURCE_BOOKMARKS) {
              setCurrPageIndex(evt.data.destination.pageIndex);
            }
            break;
        }
      };
      pdfNavigator.addEventListener(PDF_NAVIGATOR_SOURCE_BOOKMARKS, handle);

      return () => {
        pdfNavigator.removeEventListener(
          PDF_NAVIGATOR_SOURCE_BOOKMARKS,
          handle
        );
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
                  { destination: bookmark.target.action.destination },
                  PDF_NAVIGATOR_SOURCE_BOOKMARKS
                );

                break;
            }
          }
          break;
        case 'destination':
          pdfNavigator?.gotoPage(
            { destination: bookmark.target.destination },
            PDF_NAVIGATOR_SOURCE_BOOKMARKS
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
  const { IconComponent } = useUIComponents();

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

  const toggleIsFold = useCallback(() => {
    setIsUnfold((isUnfold) => {
      return !isUnfold;
    });
  }, [setIsUnfold, onClick, bookmark]);

  const activiate = useCallback(() => {
    onClick(bookmark);
  }, [onClick, bookmark]);

  const iconName =
    bookmark.children && bookmark.children.length > 0
      ? isUnfold
        ? 'ArrowDown'
        : 'ArrowRight'
      : 'Empty';
  return (
    <li
      tabIndex={0}
      className={`pdf__bookmarks__entry ${
        isCurrent ? 'pdf__bookmarks__entry--current' : ''
      }`}
    >
      <div className="pdf__bookmarks__entry__header">
        <IconComponent name={iconName} onClick={toggleIsFold} />
        <span className="title" onClick={activiate}>
          {bookmark.title}
        </span>
      </div>
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
