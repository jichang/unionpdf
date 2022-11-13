import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  PdfPageObject,
  Rotation,
  Size,
  calculateSize,
  PdfZoomMode,
} from '@unionpdf/models';
import './pages.css';
import { calculateRectStyle } from './helpers/annotation';
import {
  calculateScrollOffset,
  findScollableContainer,
} from './helpers/scrollable';
import { ErrorBoundary } from '../ui/errorboundary';
import { usePdfDocument } from '../core/document.context';
import {
  PdfNavigatorGotoPageEvent,
  PdfNavigatorEvent,
} from '../core/navigator';
import { usePdfNavigator } from '../core/navigator.context';
import {
  IntersectionObserverContextProvider,
  useIntersectionObserver,
} from '../ui/intersectionobserver.context';
import { IntersectionObserverEntry } from '../ui/intersectionobserver.entry';
import { useLogger } from '../core';

export type PdfPageContentComponentProps = Omit<PdfPageProps, 'children'>;

export type PdfPageContentComponent = (
  props: PdfPageContentComponentProps
) => JSX.Element;

export interface PdfPagesProps {
  pageGap?: number;
  prerenderRange?: [number, number];
  cacheRange?: [number, number];
  scaleFactor?: number;
  rotation?: Rotation;
  pageContentComponent: PdfPageContentComponent;
  children?: any;
}

export const PDF_NAVIGATOR_SOURCE_PAGES = 'PdfPages';
export const LOG_SOURCE = 'PdfPages';

export const PDF_PAGE_DEFAULT_GAP = 8;

export function PdfPages(props: PdfPagesProps) {
  const {
    pageGap = PDF_PAGE_DEFAULT_GAP,
    prerenderRange = [0, 0],
    cacheRange = [0, 0],
    scaleFactor = 1,
    rotation = 0,
    pageContentComponent,
  } = props;
  const pdfDoc = usePdfDocument();
  const logger = useLogger();

  const pdfPages: PdfPage[] = useMemo(() => {
    if (!pdfDoc) {
      return [];
    }

    let pageOffset = pageGap / 2;
    return pdfDoc?.pages.map((page) => {
      const offset = pageOffset;
      const visualSize = calculateSize(page.size, scaleFactor, rotation);
      pageOffset = pageOffset + visualSize.height + pageGap;

      return {
        ...page,
        offset,
        visualSize,
      };
    });
  }, [pdfDoc, pageGap, scaleFactor, rotation]);

  const containerElemRef = useRef<HTMLDivElement | null>(null);
  const gotoPage = useCallback(
    (data: PdfNavigatorGotoPageEvent['data']) => {
      const containerElem = containerElemRef.current;
      if (containerElem) {
        const { destination } = data;
        const page = pdfPages[destination.pageIndex];
        if (!page) {
          return;
        }

        const scrollableContainer = findScollableContainer(containerElem);
        const scrollOffsetBase =
          calculateScrollOffset(containerElem, scrollableContainer) +
          pageGap / 2;

        switch (destination.zoom.mode) {
          case PdfZoomMode.XYZ:
            {
              const { x, y } = destination.zoom.params;
              const style = calculateRectStyle(
                { origin: { x, y }, size: { width: 0, height: 0 } },
                scaleFactor,
                rotation
              );
              const {
                top = 0,
                left = 0,
                right = 0,
                bottom = 0,
                width,
                height,
              } = style;
              let scrollOffset: { top: number; left: number };
              switch (rotation) {
                case 0:
                  scrollOffset = {
                    top: page.offset + top,
                    left,
                  };
                  break;
                case 1:
                  scrollOffset = {
                    top: page.offset + top,
                    left: page.visualSize.width - width - right,
                  };
                  break;
                case 2:
                  scrollOffset = {
                    top: page.offset + page.visualSize.height - bottom - height,
                    left: page.visualSize.width - width - right,
                  };
                  break;
                case 3:
                  scrollOffset = {
                    top: page.offset + page.visualSize.height - bottom - height,
                    left,
                  };
                  break;
              }
              scrollableContainer.scrollTo({
                top: scrollOffsetBase + scrollOffset.top,
                left: scrollOffset.left,
              });
            }
            break;
          default:
            scrollableContainer.scrollTo({
              left: 0,
              top: page.offset + scrollOffsetBase,
            });
        }
      }
    },
    [logger, pageGap, pdfPages, scaleFactor, rotation]
  );

  const pdfNavigator = usePdfNavigator();
  useEffect(() => {
    if (pdfNavigator) {
      const handle = (evt: PdfNavigatorEvent, source: string) => {
        switch (evt.kind) {
          case 'GotoPage':
            if (source !== PDF_NAVIGATOR_SOURCE_PAGES) {
              gotoPage(evt.data);
            }
            break;
        }
      };
      pdfNavigator.addEventListener(PDF_NAVIGATOR_SOURCE_PAGES, handle);

      return () => {
        pdfNavigator.removeEventListener(PDF_NAVIGATOR_SOURCE_PAGES, handle);
      };
    }
  }, [pdfNavigator, gotoPage]);

  return (
    <ErrorBoundary>
      <div className="pdf__pages" ref={containerElemRef}>
        <IntersectionObserverContextProvider
          className="pdf__pages__container"
          style={{ paddingTop: pageGap / 2, paddingBottom: pageGap / 2 }}
        >
          <PdfPagesContent
            pdfPages={pdfPages}
            pageGap={pageGap}
            scaleFactor={scaleFactor}
            rotation={rotation}
            prerenderRange={prerenderRange}
            cacheRange={cacheRange}
            pageContentComponent={pageContentComponent}
          />
        </IntersectionObserverContextProvider>
      </div>
    </ErrorBoundary>
  );
}

export interface PdfPage extends PdfPageObject {
  offset: number;
  visualSize: Size;
}

export interface PdfPagesContentProps {
  pageGap: number;
  pdfPages: PdfPage[];
  prerenderRange: [number, number];
  cacheRange: [number, number];
  scaleFactor: number;
  rotation: Rotation;
  pageContentComponent: PdfPageContentComponent;
}

export function PdfPagesContent(props: PdfPagesContentProps) {
  const {
    pdfPages,
    pageGap,
    rotation,
    scaleFactor,
    prerenderRange,
    cacheRange,
    pageContentComponent: ContentComponent,
  } = props;
  const pdfNavigator = usePdfNavigator();

  const { visibleEntryIds } = useIntersectionObserver();

  const [currPageIndex, setCurrPageIndex] = useState(
    pdfNavigator?.currPageIndex || 0
  );

  useEffect(() => {
    let currPageIndex = Number.MAX_SAFE_INTEGER;
    for (const entryId of visibleEntryIds) {
      if (currPageIndex > entryId) {
        currPageIndex = entryId;
      }
    }

    if (pdfNavigator?.currPageIndex !== currPageIndex) {
      pdfNavigator?.gotoPage(
        {
          destination: {
            pageIndex: currPageIndex,
            zoom: {
              mode: PdfZoomMode.Unknown,
            },
            view: [],
          },
        },
        PDF_NAVIGATOR_SOURCE_PAGES
      );
    }
    setCurrPageIndex(currPageIndex);
  }, [visibleEntryIds, pdfNavigator, setCurrPageIndex]);

  return (
    <>
      {pdfPages.map((page) => {
        const isVisible = visibleEntryIds.has(page.index);
        const inVisibleRange =
          page.index >= currPageIndex + prerenderRange[0] &&
          page.index <= currPageIndex + prerenderRange[1];
        const inCacheRange =
          page.index >= currPageIndex + cacheRange[0] &&
          page.index <= currPageIndex + cacheRange[1];

        return (
          <PdfPage
            key={page.index}
            isCurrent={page.index === currPageIndex}
            page={page}
            isVisible={isVisible}
            inVisibleRange={inVisibleRange}
            inCacheRange={inCacheRange}
            pageGap={pageGap}
            scaleFactor={scaleFactor}
            rotation={rotation}
            visualSize={page.visualSize}
          >
            <ContentComponent
              isCurrent={page.index === currPageIndex}
              page={page}
              isVisible={isVisible}
              inVisibleRange={inVisibleRange}
              inCacheRange={inCacheRange}
              pageGap={pageGap}
              scaleFactor={scaleFactor}
              rotation={rotation}
              visualSize={page.visualSize}
            />
          </PdfPage>
        );
      })}
    </>
  );
}

export interface PdfPageProps {
  page: PdfPageObject;
  isCurrent: boolean;
  isVisible: boolean;
  inVisibleRange: boolean;
  inCacheRange: boolean;
  pageGap: number;
  scaleFactor: number;
  rotation: Rotation;
  visualSize: Size;
  children: JSX.Element;
}

export function PdfPage(props: PdfPageProps) {
  const { children, ...rest } = props;
  const { isCurrent, page, pageGap, visualSize } = rest;

  return (
    <IntersectionObserverEntry
      entryId={`${page.index}`}
      className={`pdf__page ${isCurrent ? 'pdf__page--current' : ''}`}
      style={{ paddingTop: pageGap / 2, paddingBottom: pageGap / 2 }}
      data-page-index={page.index}
    >
      <div
        tabIndex={0}
        className="pdf__page__content"
        style={{
          width: visualSize.width,
          height: visualSize.height,
        }}
      >
        {children}
      </div>
    </IntersectionObserverEntry>
  );
}
