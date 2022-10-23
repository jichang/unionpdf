import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { PdfPageObject, Rotation, Size, calculateSize } from '@unionpdf/models';
import {
  PdfNavigatorEvent,
  PdfNavigatorGotoPageEvent,
  usePdfDocument,
  usePdfNavigator,
} from '@unionpdf/core';
import './pages.css';
import { calculateRectStyle } from './helpers/annotation';
import { ErrorBoundary } from './errorboundary';

export type PdfPageContentComponentProps = Omit<PdfPageProps, 'children'>;

export type PdfPageContentComponent = (
  props: PdfPageContentComponentProps
) => JSX.Element;

export interface PdfPagesProps {
  viewport: Size;
  pageGap?: number;
  visibleRange?: [number, number];
  scaleFactor?: number;
  rotation?: Rotation;
  pageContentComponent: PdfPageContentComponent;
  children?: any;
}

export const PDF_NAVIGATOR_SOURCE_PAGES = 'PdfPages';

export const PDF_PAGE_DEFAULT_GAP = 8;

export function PdfPages(props: PdfPagesProps) {
  const {
    viewport,
    pageGap = PDF_PAGE_DEFAULT_GAP,
    visibleRange = [-1, 1],
    scaleFactor = 1,
    rotation = 0,
    pageContentComponent: ContentComponent,
  } = props;
  const pdfDoc = usePdfDocument();
  const pdfNavigator = usePdfNavigator();

  const containerElemRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState({ top: 0, left: 0 });
  const [currPageIndex, setCurrPageIndex] = useState(
    pdfNavigator?.currPageIndex || 0
  );

  const pdfPages = useMemo(() => {
    if (!pdfDoc) {
      return [];
    }

    let pageOffset = pageGap;
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

  const handleScroll = useCallback(
    (evt: Event) => {
      const target = evt.target as HTMLDivElement;
      setScrollOffset({
        top: target.scrollTop,
        left: target.scrollLeft,
      });

      for (const page of pdfPages) {
        const pageBottomY = page.offset + page.size.height * scaleFactor;
        if (pageBottomY > target.scrollTop) {
          pdfNavigator?.gotoPage(
            { pageIndex: page.index },
            PDF_NAVIGATOR_SOURCE_PAGES
          );
          setCurrPageIndex(page.index);
          break;
        }
      }
    },
    [pdfNavigator, pdfPages, setCurrPageIndex]
  );

  useEffect(() => {
    const containerElem = containerElemRef.current;
    if (containerElem) {
      containerElem.addEventListener('scroll', handleScroll);

      return () => {
        containerElem.removeEventListener('scroll', handleScroll);
      };
    }
  }, [containerElemRef.current, handleScroll]);

  const visibleRangeTop = Math.max(
    0,
    scrollOffset.top + visibleRange[0] * viewport.height
  );
  const visibleRangeBottom = Math.max(
    0,
    scrollOffset.top + viewport.height + visibleRange[1] * viewport.height
  );

  const gotoPage = useCallback(
    (data: PdfNavigatorGotoPageEvent['data']) => {
      const containerElem = containerElemRef.current;
      if (containerElem) {
        const { pageIndex, rect } = data;
        const page = pdfPages[pageIndex];
        if (!page) {
          return;
        }

        if (!rect) {
          containerElem.scrollTo({ left: 0, top: page.offset });
        } else {
          const style = calculateRectStyle(rect, scaleFactor, rotation);
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
          containerElem.scrollTo(scrollOffset);
        }
        setCurrPageIndex(pageIndex);
      }
    },
    [pdfPages, setCurrPageIndex, scaleFactor, rotation]
  );

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
      <div className="pdf__pages">
        <div
          className="pdf__pages__container"
          style={{
            width: viewport.width,
            height: viewport.height,
          }}
          ref={containerElemRef}
        >
          {pdfPages.map((page) => {
            const isVisible = !(
              page.offset > visibleRangeBottom ||
              page.offset + page.size.height * scaleFactor < visibleRangeTop
            );

            return (
              <PdfPage
                key={page.index}
                isCurrent={page.index === currPageIndex}
                page={page}
                isVisible={isVisible}
                pageGap={pageGap}
                scaleFactor={scaleFactor}
                rotation={rotation}
                visualSize={page.visualSize}
              >
                <ContentComponent
                  isCurrent={page.index === currPageIndex}
                  page={page}
                  isVisible={isVisible}
                  pageGap={pageGap}
                  scaleFactor={scaleFactor}
                  rotation={rotation}
                  visualSize={page.visualSize}
                />
              </PdfPage>
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export interface PdfPageProps {
  page: PdfPageObject;
  isCurrent: boolean;
  isVisible: boolean;
  pageGap: number;
  scaleFactor: number;
  rotation: Rotation;
  visualSize: Size;
  children: JSX.Element;
}

export function PdfPage(props: PdfPageProps) {
  const { children, ...rest } = props;
  const { isCurrent, pageGap, visualSize } = rest;

  const style = useMemo(() => {
    return {
      marginTop: pageGap,
      marginBottom: pageGap,
      width: visualSize.width,
      height: visualSize.height,
    };
  }, [pageGap, visualSize]);

  return (
    <div
      tabIndex={0}
      className={`pdf__page ${isCurrent ? 'pdf__page--current' : ''}`}
      style={style}
    >
      {children}
    </div>
  );
}
