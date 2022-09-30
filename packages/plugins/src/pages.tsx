import {
  useRef,
  useState,
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  CSSProperties,
  useMemo,
} from "react";
import { PdfPageModel, Rotation, Size } from "@onepdf/models";
import {
  PdfNavigatorEvent,
  usePdfDocument,
  usePdfEngine,
  usePdfNavigator,
} from "@onepdf/core";

export type Decoration = (props: PdfPageProps) => JSX.Element;

export type PageContentContextValue = {
  decorations: Decoration[];
  addDecoration: (decoration: Decoration) => void;
  removeDecoration: (decoration: Decoration) => void;
};

export const PageContentContext = createContext<PageContentContextValue>({
  decorations: [],
  addDecoration: (decoration: Decoration) => {},
  removeDecoration: (decoration: Decoration) => {},
});

export interface PdfPagesContextProviderProps {
  decorations: Decoration[];
  addDecoration: (decoration: Decoration) => void;
  removeDecoration: (decoration: Decoration) => void;
  children: ReactNode;
}

export function PdfPagesContextProvider(props: PdfPagesContextProviderProps) {
  const { children, decorations, addDecoration, removeDecoration } = props;

  return (
    <PageContentContext.Provider
      value={{ decorations, addDecoration, removeDecoration }}
    >
      {children}
    </PageContentContext.Provider>
  );
}

export interface PageContentProps {
  viewport: Size;
  visibleRange?: [number, number];
  scale?: number;
  rotation?: Rotation;
  children?: ReactNode;
}

export const PDF_NAVIGATOR_SOURCE_PAGES = "PdfPages";

export function PdfPages(props: PageContentProps) {
  const {
    viewport,
    visibleRange = [-1, 1],
    scale = 1,
    rotation = 0,
    children,
  } = props;
  const doc = usePdfDocument();
  const pdfNavigator = usePdfNavigator();

  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const addDecoration = useCallback((decoration: Decoration) => {
    setDecorations((decorations) => {
      return [...decorations, decoration];
    });
  }, []);
  const removeDecoration = useCallback((decoration: Decoration) => {
    setDecorations((decorations) => {
      return decorations.filter((_decoration) => _decoration !== decoration);
    });
  }, []);

  const containerElemRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState({ top: 0, left: 0 });
  const [currPageIndex, setCurrPageIndex] = useState(
    pdfNavigator?.currPageIndex || 0
  );

  const handleScroll = useCallback(
    (evt: Event) => {
      const target = evt.target as HTMLDivElement;
      setScrollOffset({
        top: target.scrollTop,
        left: target.scrollLeft,
      });

      if (doc?.pages) {
        let pageOffset = 0;
        for (const page of doc.pages) {
          const pageBottomY = pageOffset + page.size.height;
          if (pageBottomY > target.scrollTop) {
            pdfNavigator?.gotoPage(page.index, PDF_NAVIGATOR_SOURCE_PAGES);
            setCurrPageIndex(page.index);
            break;
          }
          pageOffset += page.size.height;
        }
      }
    },
    [pdfNavigator, doc?.pages, setCurrPageIndex]
  );

  useEffect(() => {
    const containerElem = containerElemRef.current;
    if (containerElem) {
      containerElem.addEventListener("scroll", handleScroll);

      return () => {
        containerElem.removeEventListener("scroll", handleScroll);
      };
    }
  }, [containerElemRef.current, handleScroll]);

  const pages = useMemo(() => {
    let pageOffset = 0;
    return doc?.pages.map((page) => {
      const visibleRangeTop = Math.max(
        0,
        scrollOffset.top + visibleRange[0] * viewport.height
      );
      const visibleRangeBottom = Math.max(
        0,
        scrollOffset.top + viewport.height + visibleRange[1] * viewport.height
      );

      const isVisible = !(
        pageOffset > visibleRangeBottom || pageOffset < visibleRangeTop
      );

      pageOffset += page.size.height;

      return (
        <PdfPage
          key={page.index}
          isCurrent={page.index === currPageIndex}
          page={page}
          needRender={isVisible}
          scale={scale}
          rotation={rotation}
        />
      );
    });
  }, [
    doc?.pages,
    currPageIndex,
    viewport,
    visibleRange,
    scrollOffset,
    scale,
    rotation,
  ]);

  const gotoPage = useCallback(
    (pageIndex: number) => {
      const containerElem = containerElemRef.current;
      if (containerElem && doc?.pages) {
        let pageOffset = 0;
        for (let i = 0; i < pageIndex; i++) {
          pageOffset += doc.pages[i].size.height;
        }
        containerElem.scrollTo({ left: 0, top: pageOffset });
        setCurrPageIndex(pageIndex);
      }
    },
    [doc?.pages, setCurrPageIndex]
  );

  useEffect(() => {
    if (pdfNavigator) {
      const handle = (evt: PdfNavigatorEvent, source: string) => {
        switch (evt.kind) {
          case "Change":
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
      style={
        {
          width: viewport.width,
          height: viewport.height,
          overflow: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        } as CSSProperties
      }
      ref={containerElemRef}
    >
      <div className="pdf__pages">
        <PdfPagesContextProvider
          decorations={decorations}
          addDecoration={addDecoration}
          removeDecoration={removeDecoration}
        >
          {pages}
          {children}
        </PdfPagesContextProvider>
      </div>
    </div>
  );
}

export interface PdfPageProps {
  page: PdfPageModel;
  isCurrent: boolean;
  needRender: boolean;
  scale: number;
  rotation: Rotation;
}

export function PdfPage(props: PdfPageProps) {
  const engine = usePdfEngine();
  const { isCurrent, page, scale, rotation, needRender } = props;
  const canvasElemRef = useRef<HTMLCanvasElement>(null);
  const { decorations } = useContext(PageContentContext);

  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem && engine && needRender) {
      const render = (imageData: ImageData) => {
        const ctx = canvasElem.getContext("2d");
        if (ctx) {
          ctx.putImageData(imageData, 0, 0);
        }
      };

      const result = engine.renderPage(page, scale, rotation);
      if (result instanceof Promise) {
        result.then(render);
      } else {
        render(result);
      }
    }
  }, [page, engine, needRender, scale, rotation]);

  return (
    <div
      tabIndex={0}
      className={`pdf__page ${isCurrent ? "pdf__page--current" : ""}`}
      style={{
        position: "relative",
        width: page.size.width,
        height: page.size.height,
      }}
    >
      {needRender ? (
        <canvas
          style={{ width: "100%", height: "100%" }}
          className="pdf__page__canvas"
          ref={canvasElemRef}
        />
      ) : null}
      <div className="pdf__page__decorations">
        {decorations.map((Decoration, index) => {
          return (
            <Decoration
              isCurrent={isCurrent}
              key={index}
              needRender={needRender}
              page={page}
              scale={scale}
              rotation={rotation}
            />
          );
        })}
      </div>
    </div>
  );
}

export interface PdfPageDecorationProps {
  decoration: Decoration;
}

export function PdfPageDecoration(props: PdfPageDecorationProps) {
  const { decoration } = props;
  const { addDecoration, removeDecoration } = useContext(PageContentContext);

  useEffect(() => {
    addDecoration(decoration);
    return () => {
      removeDecoration(decoration);
    };
  }, [decoration, addDecoration, removeDecoration]);

  return null;
}
