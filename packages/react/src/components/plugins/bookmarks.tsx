import {
  PdfBookmarksObject,
  PdfBookmarkObject,
  PdfActionType,
  ignore,
  PdfErrorCode,
} from '@unionpdf/models';
import React, { useCallback, useEffect, useState } from 'react';
import { PdfApplicatinPluginKey, PdfPlugin, PdfPluginPanel } from '../../core';
import './bookmarks.css';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { usePdfNavigator } from '../../core/navigator.context';
import { strings, useUIComponents, useUIStrings } from '../../adapters';

export const PDF_NAVIGATOR_SOURCE_BOOKMARKS = 'PdfBookmarks';

/**
 * Properties of PdfBookmarks
 */
export interface PdfBookmarksProps {}

/**
 * pdf bookmarks content
 * @param props - properties of PdfBookmarksContent
 * @returns
 */
export function PdfBookmarks(props: PdfBookmarksProps) {
  const strings = useUIStrings();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Bookmarks}>
      <PdfPluginPanel
        pluginKey={PdfApplicatinPluginKey.Bookmarks}
        title={strings.bookmarks}
      >
        <PdfBookmarksContent {...props} />
      </PdfPluginPanel>
    </PdfPlugin>
  );
}

/**
 * pdf bookmarks content
 * @param props - properties of PdfBookmarksContent
 * @returns
 */
export function PdfBookmarksContent(props: PdfBookmarksProps) {
  const engine = usePdfEngine();
  const { doc } = usePdfDocument();
  const [bookmarks, setBookmarks] = useState<PdfBookmarksObject>({
    bookmarks: [],
  });

  useEffect(() => {
    if (engine && doc) {
      const task = engine.getBookmarks(doc);
      task.wait(setBookmarks, ignore);

      return () => {
        task.abort({
          code: PdfErrorCode.Cancelled,
          message: '',
        });
      };
    }
  }, [engine, doc]);

  const { currPageIndex, gotoPage } = usePdfNavigator();

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
                gotoPage(
                  { destination: bookmark.target.action.destination },
                  PDF_NAVIGATOR_SOURCE_BOOKMARKS,
                );

                break;
            }
          }
          break;
        case 'destination':
          gotoPage(
            { destination: bookmark.target.destination },
            PDF_NAVIGATOR_SOURCE_BOOKMARKS,
          );
          break;
      }
    },
    [gotoPage],
  );

  return (
    <div
      className="pdf__bookmarks"
      data-testid="pdf__plugin__bookmarks__content"
    >
      {bookmarks.bookmarks.length === 0 ? (
        <p>{strings.noBookmarks}</p>
      ) : (
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
      )}
    </div>
  );
}

/**
 * Properties of PdfBookmarkEntry
 */
export interface PdfBookmarkEntryProps {
  /**
   * Current page index, used to highlight bookmark
   */
  currPageIndex: number;
  /**
   * bookmark entry
   */
  bookmark: PdfBookmarkObject;
  /**
   * Callback when clicking bookmark
   * @param entry - clicked bookmark entry
   * @returns
   */
  onClick: (entry: PdfBookmarkObject) => void;
}

/**
 * Component to render pdf bookmark
 * @param props - properties of PdfBookmarkEntry
 * @returns
 *
 * @public
 */
export function PdfBookmarkEntry(props: PdfBookmarkEntryProps) {
  const { currPageIndex, bookmark, onClick } = props;
  const { Icon } = useUIComponents();

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
        <Icon name={iconName} onClick={toggleIsFold} />
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
