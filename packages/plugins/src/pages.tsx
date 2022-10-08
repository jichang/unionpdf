import React, {
  useRef,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { PdfPageObject, Rotation, Size } from '@unionpdf/models';
import {
  PdfNavigatorEvent,
  usePdfDocument,
  usePdfNavigator,
} from '@unionpdf/core';
import {
  PdfPageLayerComponent,
  PdfPageLayersContextProvider,
  usePdfPageLayerComponents,
} from './pages.context';
import './pages.css';
import { calculatePageSize } from './helpers/page';

export interface PdfPagesProps {
  viewport: Size;
  pageGap?: number;
  visibleRange?: [number, number];
  scaleFactor?: number;
  rotation?: Rotation;
  children?: ReactNode;
}

export const PDF_NAVIGATOR_SOURCE_PAGES = 'PdfPages';

export const PDF_PAGE_DEFAULT_GAP = 8;

export function PdfPages(props: PdfPagesProps) {
  const { children, ...rest } = props;

  const [layerComponents, setLayerComponents] = useState<
    PdfPageLayerComponent[]
  >([]);
  const addLayerComponent = useCallback(
    (layerComponent: PdfPageLayerComponent) => {
      setLayerComponents((layerComponents) => {
        return [...layerComponents, layerComponent];
      });
    },
    []
  );
  const removeLayerComponent = useCallback(
    (layerComponent: PdfPageLayerComponent) => {
      setLayerComponents((layerComponents) => {
        return layerComponents.filter(
          (_layerComponent) => _layerComponent !== layerComponent
        );
      });
    },
    []
  );

  return (
    <PdfPageLayersContextProvider
      layerComponents={layerComponents}
      addLayerComponent={addLayerComponent}
      removeLayerComponent={removeLayerComponent}
    >
      <div className="pdf__pages">
        <PdfPagesContent {...rest} />
        {children}
      </div>
    </PdfPageLayersContextProvider>
  );
}

export interface PdfPagesContentProps extends Omit<PdfPagesProps, 'children'> {}

export function PdfPagesContent(props: PdfPagesContentProps) {
  const {
    viewport,
    pageGap = PDF_PAGE_DEFAULT_GAP,
    visibleRange = [-1, 1],
    scaleFactor = 1,
    rotation = 0,
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
      const visualSize = calculatePageSize(page.size, scaleFactor, rotation);
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
          pdfNavigator?.gotoPage(page.index, PDF_NAVIGATOR_SOURCE_PAGES);
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
    (pageIndex: number) => {
      const containerElem = containerElemRef.current;
      if (containerElem) {
        const page = pdfPages[pageIndex];
        containerElem.scrollTo({ left: 0, top: page.offset });
        setCurrPageIndex(pageIndex);
      }
    },
    [pdfPages, setCurrPageIndex]
  );

  useEffect(() => {
    if (pdfNavigator) {
      const handle = (evt: PdfNavigatorEvent, source: string) => {
        switch (evt.kind) {
          case 'Change':
            if (source !== PDF_NAVIGATOR_SOURCE_PAGES) {
              gotoPage(evt.data.pageIndex);
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
    <div
      className="pdf__content"
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
          />
        );
      })}
    </div>
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
}

export function PdfPage(props: PdfPageProps) {
  const {
    isCurrent,
    page,
    pageGap,
    scaleFactor,
    rotation,
    isVisible,
    visualSize,
  } = props;
  const { layerComponents } = usePdfPageLayerComponents();

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
      {layerComponents.map((PdfPageLayerComponent, index) => {
        return (
          <PdfPageLayerComponent
            isCurrent={isCurrent}
            key={index}
            isVisible={isVisible}
            page={page}
            pageGap={pageGap}
            scaleFactor={scaleFactor}
            rotation={rotation}
            visualSize={visualSize}
          />
        );
      })}
    </div>
  );
}
