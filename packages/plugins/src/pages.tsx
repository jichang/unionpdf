import React, {
  useRef,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  combine,
  PdfPageObject,
  rotate,
  Rotation,
  scale,
  Size,
} from '@onepdf/models';
import {
  PdfNavigatorEvent,
  usePdfDocument,
  usePdfEngine,
  usePdfNavigator,
} from '@onepdf/core';
import {
  PdfPageDecorationComponent,
  PdfPageDecorationsContext,
  PdfPageDecorationsContextProvider,
  usePdfPageDecorationComponents,
} from './pages.context';
import './pages.css';

export interface PageContentProps {
  viewport: Size;
  visibleRange?: [number, number];
  scaleFactor?: number;
  rotation?: Rotation;
  children?: ReactNode;
}

export const PDF_NAVIGATOR_SOURCE_PAGES = 'PdfPages';

export function PdfPages(props: PageContentProps) {
  const {
    viewport,
    visibleRange = [-1, 1],
    scaleFactor = 1,
    rotation = 0,
    children,
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

    let pageOffset = 0;
    const rotateFunc = rotate(rotation);
    const scaleFunc = scale(scaleFactor);
    return pdfDoc?.pages.map((page) => {
      const offset = pageOffset;
      const rotatedSize = rotateFunc(page.size);
      const scaledSize = scaleFunc(rotatedSize);
      pageOffset = pageOffset + scaledSize.height;

      return {
        ...page,
        offset,
      };
    });
  }, [pdfDoc, scaleFactor, rotation]);

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
    <div className="pdf__content">
      <PdfPageDecorationsContextProvider>
        <div
          className="pdf__pages"
          style={{ width: viewport.width, height: viewport.height }}
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
                needRender={isVisible}
                scaleFactor={scaleFactor}
                rotation={rotation}
              />
            );
          })}
        </div>
        {children}
      </PdfPageDecorationsContextProvider>
    </div>
  );
}

export interface PdfPageProps {
  page: PdfPageObject;
  isCurrent: boolean;
  needRender: boolean;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPage(props: PdfPageProps) {
  const engine = usePdfEngine();
  const { isCurrent, page, scaleFactor, rotation, needRender } = props;
  const canvasElemRef = useRef<HTMLCanvasElement>(null);
  const { decorationComponents } = usePdfPageDecorationComponents();

  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem && engine && needRender) {
      const render = (imageData: ImageData) => {
        const ctx = canvasElem.getContext('2d');
        if (ctx) {
          ctx.putImageData(
            imageData,
            0,
            0,
            0,
            0,
            imageData.width,
            imageData.height
          );
        }
      };

      const result = engine.renderPage(page, scaleFactor, rotation);
      if (result instanceof Promise) {
        result.then(render);
      } else {
        render(result);
      }
    }
  }, [page, engine, needRender, scaleFactor, rotation]);

  const renderSize = useMemo(() => {
    return combine([scale(scaleFactor), rotate(rotation)])(page.size);
  }, [scaleFactor, rotation, page.size]);

  return (
    <div
      tabIndex={0}
      className={`pdf__page ${isCurrent ? 'pdf__page--current' : ''}`}
      style={renderSize}
    >
      {needRender ? (
        <canvas className="pdf__page__canvas" ref={canvasElemRef} />
      ) : null}
      <div className="pdf__page__decorations">
        {decorationComponents.map((DecorationComponent, index) => {
          return (
            <DecorationComponent
              isCurrent={isCurrent}
              key={index}
              needRender={needRender}
              page={page}
              scaleFactor={scaleFactor}
              rotation={rotation}
            />
          );
        })}
      </div>
    </div>
  );
}

export interface PdfPageDecorationProps {
  decoration: PdfPageDecorationComponent;
}

export function PdfPageDecoration(props: PdfPageDecorationProps) {
  const { decoration } = props;
  const {
    addDecorationComponent: addDecoration,
    removeDecorationComponent: removeDecoration,
  } = useContext(PdfPageDecorationsContext);

  useEffect(() => {
    addDecoration(decoration);
    return () => {
      removeDecoration(decoration);
    };
  }, [decoration, addDecoration, removeDecoration]);

  return null;
}
