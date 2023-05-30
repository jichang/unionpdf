import React, {
  useRef,
  useCallback,
  useEffect,
  useMemo,
  ComponentProps,
} from 'react';
import {
  PdfPageObject,
  Rotation,
  Size,
  PdfZoomMode,
  transformSize,
  transformPosition,
} from '@unionpdf/models';
import './pages.css';
import {
  calculateScrollOffset,
  findScollableContainer,
} from '../helpers/scrollable';
import { ErrorBoundary } from '../../ui/errorboundary';
import { usePdfDocument } from '../../core/document.context';
import { PdfNavigatorEvent } from '../../core/navigator.context';
import { usePdfNavigator } from '../../core/navigator.context';
import {
  IntersectionObserverContextProvider,
  useIntersectionObserver,
} from '../../ui/intersectionobserver.context';
import { IntersectionObserverEntry } from '../../ui/intersectionobserver.entry';
import { useLogger } from '../../core';
import classNames from 'classnames';
import { PdfPageLayerComponent } from '../pageLayers';

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
  pageLayers: PdfPageLayerComponent[];
  children?: any;
}

export const PDF_NAVIGATOR_SOURCE_PAGES = 'PdfPages';
export const PAGES_LOG_SOURCE = 'PdfPages';

export const PDF_PAGE_DEFAULT_GAP = 8;

export function PdfPages(props: PdfPagesProps) {
  const {
    pageGap = PDF_PAGE_DEFAULT_GAP,
    prerenderRange = [0, 0],
    cacheRange = [0, 0],
    scaleFactor = 1,
    rotation = Rotation.Degree0,
    pageLayers,
  } = props;
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
                rotation
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
    <ErrorBoundary>
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
            layers={pageLayers}
          />
        </IntersectionObserverContextProvider>
      </div>
    </ErrorBoundary>
  );
}

export interface PdfPage extends PdfPageObject {
  offset: number;
}

export interface PdfPagesContentProps {
  pageGap: number;
  pages: PdfPage[];
  prerenderRange: [number, number];
  cacheRange: [number, number];
  scaleFactor: number;
  rotation: Rotation;
  layers: PdfPageLayerComponent[];
}

export function PdfPagesContent(props: PdfPagesContentProps) {
  const {
    pages,
    pageGap,
    rotation,
    scaleFactor,
    prerenderRange,
    cacheRange,
    layers,
  } = props;

  const { visibleEntryIds } = useIntersectionObserver();

  const { gotoPage } = usePdfNavigator();

  const [minVisiblePageIndex, maxVisiblePageIndex] = useMemo((): [
    number,
    number
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
      PDF_NAVIGATOR_SOURCE_PAGES
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
            {layers.map((Layer, index) => {
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
  page: PdfPageObject;
  isCurrent: boolean;
  isVisible: boolean;
  inVisibleRange: boolean;
  inCacheRange: boolean;
  pageGap: number;
  scaleFactor: number;
  rotation: Rotation;
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
