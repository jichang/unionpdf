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
  calculateSize,
  PdfZoomMode,
} from '@unionpdf/models';
import './pages.css';
import { calculateRectStyle } from '../helpers/annotation';
import {
  calculateScrollOffset,
  findScollableContainer,
} from '../helpers/scrollable';
import { ErrorBoundary } from '../../ui/errorboundary';
import { usePdfDocument } from '../../core/document.context';
import {
  PdfNavigatorGotoPageEvent,
  PdfNavigatorEvent,
} from '../../core/navigator.context';
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
export const LOG_SOURCE = 'PdfPages';

export const PDF_PAGE_DEFAULT_GAP = 8;

export function PdfPages(props: PdfPagesProps) {
  const {
    pageGap = PDF_PAGE_DEFAULT_GAP,
    prerenderRange = [0, 0],
    cacheRange = [0, 0],
    scaleFactor = 1,
    rotation = 0,
    pageLayers,
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

  const { addEventListener, removeEventListener } = usePdfNavigator();
  useEffect(() => {
    const handle = (evt: PdfNavigatorEvent, source: string) => {
      switch (evt.kind) {
        case 'GotoPage':
          if (source !== PDF_NAVIGATOR_SOURCE_PAGES) {
            gotoPage(evt.data);
          }
          break;
      }
    };
    addEventListener(PDF_NAVIGATOR_SOURCE_PAGES, handle);

    return () => {
      removeEventListener(PDF_NAVIGATOR_SOURCE_PAGES, handle);
    };
  }, [addEventListener, removeEventListener, gotoPage]);

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
            layers={pageLayers}
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
  layers: PdfPageLayerComponent[];
}

export function PdfPagesContent(props: PdfPagesContentProps) {
  const {
    pdfPages,
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
      {pdfPages.map((page) => {
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
            visualSize={page.visualSize}
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
                  visualSize={page.visualSize}
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
  visualSize: Size;
}

export function PdfPage(props: PdfPageProps) {
  const { children, ...rest } = props;
  const { isCurrent, page, pageGap, visualSize } = rest;

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
