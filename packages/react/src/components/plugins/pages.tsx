import React, { useRef, useEffect, useMemo, ComponentProps } from 'react';
import {
  PdfPageObject,
  Rotation,
  PdfZoomMode,
  transformSize,
  transformPosition,
} from '@unionpdf/models';
import './pages.css';
import {
  calculateScrollOffset,
  findScollableContainer,
} from '../helpers/scrollable';
import { ErrorBoundary, usePdfApplication } from '../../core';
import { usePdfDocument } from '../../core/document.context';
import { PdfNavigatorEvent } from '../../core/navigator.context';
import { usePdfNavigator } from '../../core/navigator.context';
import {
  IntersectionObserverContextProvider,
  useIntersectionObserver,
} from '../../core';
import { IntersectionObserverEntry } from '../../core';
import { useLogger } from '../../core';
import classNames from 'classnames';
import { PdfPageLayerComponent } from '../pageLayers';

export const PDF_NAVIGATOR_SOURCE_PAGES = 'PdfPages';
export const PAGES_LOG_SOURCE = 'PdfPages';

export const PDF_PAGE_DEFAULT_GAP = 8;

/**
 * Properties of PdfPages
 */
export interface PdfPagesProps {
  /**
   * Gap between pages
   */
  pageGap?: number;
  /**
   * Prerender range, pages in the range will be rendered though it's not in viewport yet
   */
  prerenderRange?: [number, number];
  /**
   * Cache range, content in the range will be cached when it's out of viewport
   */
  cacheRange?: [number, number];
  /**
   * scaling factor
   */
  scaleFactor?: number;
  /**
   * rotation angle
   */
  rotation?: Rotation;
  /**
   * Layer components on every page
   */
  pageLayers: PdfPageLayerComponent[];
}

/**
 * Plugin for viewing pdf pages
 * @param props - properties of PdfPages
 * @returns
 */
export function PdfPages(props: PdfPagesProps) {
  const {
    pageGap = PDF_PAGE_DEFAULT_GAP,
    prerenderRange = [0, 0],
    cacheRange = [0, 0],
    pageLayers,
  } = props;
  const { scaleFactor, rotation } = usePdfApplication();
  const { doc } = usePdfDocument();
  const logger = useLogger();

  const pages: PdfPage[] = useMemo(() => {
    if (!doc) {
      return [];
    }

    let offset = 0;
    return doc?.pages.map((page) => {
      const height = rotation % 2 === 0 ? page.size.height : page.size.width;

      const pdfPage: PdfPage = {
        ...page,
        offset,
      };

      offset += height;

      return pdfPage;
    });
  }, [doc, rotation]);

  const containerElemRef = useRef<HTMLDivElement | null>(null);
  const { addEventListener, removeEventListener } = usePdfNavigator();
  useEffect(() => {
    const scrollTo = (evt: PdfNavigatorEvent, source: string) => {
      if (evt.kind === 'GotoPage' && source === PDF_NAVIGATOR_SOURCE_PAGES) {
        return;
      }
      const data = evt.data;

      const containerElem = containerElemRef.current;
      if (containerElem) {
        const { destination } = data;
        const page = pages[destination.pageIndex];
        if (!page) {
          return;
        }

        const scrollableContainer = findScollableContainer(containerElem);
        const scrollOffsetBase =
          calculateScrollOffset(containerElem, scrollableContainer) +
          pageGap / 2;
        const pageOffset = page.offset * scaleFactor + pageGap * page.index;

        switch (destination.zoom.mode) {
          case PdfZoomMode.XYZ:
            {
              const { x, y } = transformPosition(
                page.size,
                destination.zoom.params,
                scaleFactor,
                rotation,
              );
              const scrollOffset: { top: number; left: number } = {
                top: pageOffset + y,
                left: x,
              };
              scrollableContainer.scrollTo({
                top: scrollOffsetBase + scrollOffset.top,
                left: scrollOffset.left,
              });
            }
            break;
          default:
            scrollableContainer.scrollTo({
              left: 0,
              top: pageOffset + scrollOffsetBase,
            });
        }
      }
    };

    addEventListener(PDF_NAVIGATOR_SOURCE_PAGES + scaleFactor, scrollTo);

    return () => {
      removeEventListener(PDF_NAVIGATOR_SOURCE_PAGES + scaleFactor, scrollTo);
    };
  }, [
    addEventListener,
    removeEventListener,
    logger,
    pageGap,
    pages,
    scaleFactor,
    rotation,
  ]);

  return (
    <ErrorBoundary source={PAGES_LOG_SOURCE} logger={logger}>
      <div className="pdf__pages" ref={containerElemRef}>
        <IntersectionObserverContextProvider
          className="pdf__pages__container"
          style={{ paddingTop: pageGap / 2, paddingBottom: pageGap / 2 }}
        >
          <PdfPagesContent
            pages={pages}
            pageGap={pageGap}
            scaleFactor={scaleFactor}
            rotation={rotation}
            prerenderRange={prerenderRange}
            cacheRange={cacheRange}
            pageLayers={pageLayers}
          />
        </IntersectionObserverContextProvider>
      </div>
    </ErrorBoundary>
  );
}

/**
 * Pdf page for rendering
 */
export interface PdfPage extends PdfPageObject {
  /**
   * offset in the parent container
   */
  offset: number;
}

/**
 * Properties of PdfPagesContent
 */
export interface PdfPagesContentProps extends Required<PdfPagesProps> {
  /**
   * Pdf pages
   */
  pages: PdfPage[];
}

/**
 * Component for viewing pdf page content
 * @param props - properties of PdfPagesContent
 * @returns
 */
export function PdfPagesContent(props: PdfPagesContentProps) {
  const {
    pages,
    pageGap,
    rotation,
    scaleFactor,
    prerenderRange,
    cacheRange,
    pageLayers,
  } = props;

  const { visibleEntryIds } = useIntersectionObserver();

  const { gotoPage } = usePdfNavigator();

  const [minVisiblePageIndex, maxVisiblePageIndex] = useMemo((): [
    number,
    number,
  ] => {
    if (visibleEntryIds.size === 0) {
      return [0, 0];
    }

    const pageIndexes = [...visibleEntryIds].sort((indexA, indexB) => {
      return indexA - indexB;
    });

    let minPageIndex: number = pageIndexes[0];
    let maxPageIndex: number = pageIndexes[pageIndexes.length - 1];

    return [minPageIndex, maxPageIndex];
  }, [visibleEntryIds]);

  useEffect(() => {
    gotoPage(
      {
        destination: {
          pageIndex: minVisiblePageIndex,
          zoom: {
            mode: PdfZoomMode.Unknown,
          },
          view: [],
        },
      },
      PDF_NAVIGATOR_SOURCE_PAGES,
    );
  }, [minVisiblePageIndex, gotoPage]);

  return (
    <>
      {pages.map((page) => {
        const isVisible = visibleEntryIds.has(page.index);
        const inVisibleRange =
          page.index >= minVisiblePageIndex + prerenderRange[0] &&
          page.index <= maxVisiblePageIndex + prerenderRange[1];
        const inCacheRange =
          page.index >= minVisiblePageIndex + cacheRange[0] &&
          page.index <= maxVisiblePageIndex + cacheRange[1];

        return (
          <PdfPage
            key={page.index}
            isCurrent={page.index === minVisiblePageIndex}
            page={page}
            isVisible={isVisible}
            inVisibleRange={inVisibleRange}
            inCacheRange={inCacheRange}
            pageGap={pageGap}
            scaleFactor={scaleFactor}
            rotation={rotation}
          >
            {pageLayers.map((Layer, index) => {
              return (
                <Layer
                  key={index}
                  isCurrent={page.index === minVisiblePageIndex}
                  isVisible={isVisible}
                  inVisibleRange={inVisibleRange}
                  inCacheRange={inCacheRange}
                  page={page}
                  pageGap={pageGap}
                  scaleFactor={scaleFactor}
                  rotation={rotation}
                />
              );
            })}
          </PdfPage>
        );
      })}
    </>
  );
}

export interface PdfPageProps extends ComponentProps<'div'> {
  /**
   * Gap between pages
   */
  pageGap: number;
  /**
   * scaling factor
   */
  scaleFactor: number;
  /**
   * rotation angle
   */
  rotation: Rotation;
  /**
   * Pdf page object
   */
  page: PdfPageObject;
  /**
   * Whether is current page
   */
  isCurrent: boolean;
  /**
   * Whether page is visible
   */
  isVisible: boolean;
  /**
   * Whether page is in visible range
   */
  inVisibleRange: boolean;
  /**
   * Whether page is in cache range
   */
  inCacheRange: boolean;
}

export function PdfPage(props: PdfPageProps) {
  const { children, ...rest } = props;
  const { isCurrent, page, pageGap, rotation, scaleFactor } = rest;

  const visualSize = transformSize(page.size, rotation, scaleFactor);

  return (
    <IntersectionObserverEntry
      entryId={`${page.index}`}
      className={classNames('pdf__page', isCurrent ? 'pdf__page--current' : '')}
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
