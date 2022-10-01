import React, { useLayoutEffect, useRef, useState } from "react";
import {
  PdfEngine,
  PdfPageObject,
  PdfSource,
  PdfDocumentObject,
  PdfLinkAnnoObject,
} from "@onepdf/models";
import * as ReactDOM from "react-dom/client";
import {
  PdfEngineContextProvider,
  PdfDocument,
  PdfNavigator,
  ThemeContextProvider,
  PdfNavigatorContextProvider,
} from "@onepdf/core";
import { PdfThumbnails } from "../src/thumbnails";
import { PdfPageDecoration, PdfPageProps, PdfPages } from "../src/pages";
import { PdfPageAnnotations } from "../src/annotations";
import { PdfOutlines } from "../src/outlines";

function PdfPageNumber(props: PdfPageProps) {
  return (
    <div
      className="pdf__page__number"
      style={{
        color: "white",
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {props.page.index + 1}
    </div>
  );
}

const rgbValues = [
  [255, 0, 0, 255],
  [0, 255, 0, 255],
  [0, 0, 255, 255],
  [127, 0, 0, 255],
  [0, 128, 0, 255],
  [0, 0, 127, 255],
  [63, 0, 0, 255],
  [0, 63, 0, 255],
  [0, 0, 63, 255],
];

function createMockPdfEngine(engine?: Partial<PdfEngine>) {
  const pageCount = 9;
  const pageWidth = 320;
  const pageHeight = 480;
  const pages: PdfPageObject[] = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push({
      index: i,
      size: {
        width: pageWidth,
        height: pageHeight,
      },
    });
  }
  return {
    open: async (url: PdfSource) => {
      return {
        pageCount: pageCount,
        size: {
          width: pageWidth,
          height: pageHeight,
        },
        pages: pages,
      };
    },
    getOutlines: () => {
      return {
        entries: [
          {
            text: "Page 1",
            pageIndex: 0,
          },
          {
            text: "Page 2",
            pageIndex: 1,
            children: [
              {
                text: "Page 3",
                pageIndex: 2,
              },
            ],
          },
        ],
      };
    },
    renderPage: (page: PdfPageObject) => {
      const pixelCount = page.size.width * page.size.height;
      const array = new Uint8ClampedArray(pixelCount * 4);
      const rgbValue = rgbValues[page.index];
      for (let i = 0; i < pixelCount; i++) {
        for (let j = 0; j < 4; j++) {
          const index = i * 4 + j;
          array[index] = rgbValue[j];
        }
      }

      return new ImageData(array, page.size.width, page.size.height);
    },
    renderThumbnail: (page: PdfPageObject) => {
      const thumbnailWidth = page.size.width / 4;
      const thumbnailHeight = page.size.height / 4;
      const pixelCount = thumbnailWidth * thumbnailHeight;
      const array = new Uint8ClampedArray(pixelCount * 4);
      const rgbValue = rgbValues[page.index];
      for (let i = 0; i < pixelCount; i++) {
        for (let j = 0; j < 4; j++) {
          const index = i * 4 + j;
          array[index] = rgbValue[j];
        }
      }

      return new ImageData(array, thumbnailWidth, thumbnailHeight);
    },
    getPageAnnotations: (page: PdfPageObject) => {
      const pdfLinkAnnoObject: PdfLinkAnnoObject = {
        type: "link",
        url: "https://localhost",
        text: "localhost",
        rect: {
          x: 0,
          y: 0,
          width: 50,
          height: 50,
        },
      };

      return [
        pdfLinkAnnoObject
      ];
    },
    close: async (pdf: PdfDocumentObject) => {},
    ...engine,
  };
}

function App() {
  const [pdfNavigator] = useState(() => {
    return new PdfNavigator();
  });
  const engine = createMockPdfEngine();
  const pdfAppElemRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 320, height: 480 });

  useLayoutEffect(() => {
    const pdfAppElem = pdfAppElemRef.current;
    if (pdfAppElem) {
      const style = getComputedStyle(pdfAppElem);
      console.log(style.height, style.width);
    }
  }, [pdfAppElemRef.current]);

  return (
    <div className="App">
      <div className="pdf__app" ref={pdfAppElemRef}>
        <ThemeContextProvider
          theme={{
            background: "blue",
          }}
        >
          <PdfEngineContextProvider engine={engine}>
            <PdfDocument
              source="https://localhost"
              onOpenSuccess={() => {}}
              onOpenFailure={() => {}}
            >
              <PdfNavigatorContextProvider navigator={pdfNavigator}>
                <PdfPages visibleRange={[-1, 1]} viewport={viewport}>
                  <PdfPageDecoration decoration={PdfPageNumber} />
                  <PdfPageDecoration decoration={PdfPageAnnotations} />
                </PdfPages>
                <PdfThumbnails
                  layout={{ colsCount: 100, rowsCount: 100 }}
                  size={{ width: 100, height: 100 }}
                />
                <PdfOutlines />
              </PdfNavigatorContextProvider>
            </PdfDocument>
          </PdfEngineContextProvider>
        </ThemeContextProvider>
      </div>
    </div>
  );
}

const appElem = document.querySelector("#root") as HTMLElement;
const root = ReactDOM.createRoot(appElem);
root.render(<App />);
