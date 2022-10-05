import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  PdfEngine,
  PdfPageObject,
  PdfSource,
  PdfDocumentObject,
  PdfLinkAnnoObject,
  Rotation,
  swap,
} from '@onepdf/models';
import * as ReactDOM from 'react-dom/client';
import {
  PdfEngineContextProvider,
  PdfDocument,
  PdfNavigator,
  ThemeContextProvider,
  PdfNavigatorContextProvider,
} from '@onepdf/core';
import { PdfThumbnails } from '../src/thumbnails';
import { PdfPageDecoration, PdfPageProps, PdfPages } from '../src/pages';
import { PdfPageAnnotations } from '../src/annotations';
import { PdfOutlines } from '../src/outlines';

function PdfPageNumber(props: PdfPageProps) {
  return (
    <div
      className="pdf__page__number"
      style={{
        color: 'white',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
  const pageCount = 10;
  const pageWidth = 640;
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
            text: 'Page 1',
            pageIndex: 0,
          },
          {
            text: 'Page 2',
            pageIndex: 1,
            children: [
              {
                text: 'Page 3',
                pageIndex: 2,
              },
            ],
          },
        ],
      };
    },
    renderPage: (
      page: PdfPageObject,
      scaleFactor: number,
      rotation: Rotation
    ) => {
      const pageSize = rotation % 2 === 0 ? page.size : swap(page.size);
      const imageSize = {
        width: Math.ceil(pageSize.width * scaleFactor),
        height: Math.ceil(pageSize.height * scaleFactor),
      };
      const pixelCount = imageSize.width * imageSize.height;
      const array = new Uint8ClampedArray(pixelCount * 4);
      const rgbValue = rgbValues[page.index % 9];
      const alphaValue = 255;
      for (let i = 0; i < pixelCount; i++) {
        for (let j = 0; j < 3; j++) {
          const index = i * 4 + j;
          array[index] = rgbValue[j];
        }
        array[i * 4 + 3] = alphaValue;
      }

      return new ImageData(array, imageSize.width, imageSize.height);
    },
    renderThumbnail: (page: PdfPageObject) => {
      const thumbnailWidth = page.size.width / 4;
      const thumbnailHeight = page.size.height / 4;
      const pixelCount = thumbnailWidth * thumbnailHeight;
      const array = new Uint8ClampedArray(pixelCount * 4);
      const rgbValue = rgbValues[page.index % rgbValues.length];
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
        type: 'link',
        url: 'https://localhost',
        text: 'localhost',
        rect: {
          origin: {
            x: 0,
            y: 0,
          },
          size: {
            width: 100,
            height: 50,
          },
        },
      };

      return [pdfLinkAnnoObject];
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
  const [viewport, setViewport] = useState({ width: 640, height: 480 });

  useLayoutEffect(() => {
    const pdfAppElem = pdfAppElemRef.current;
    if (pdfAppElem) {
      const style = getComputedStyle(pdfAppElem);
      console.log(style.height, style.width);
    }
  }, [pdfAppElemRef.current]);

  const [outlinesIsVisible, setOutlinesIsVisible] = useState(false);
  const toggleOutlinesIsVisible = useCallback(() => {
    setOutlinesIsVisible((isVisible) => {
      return !isVisible;
    });
  }, [setOutlinesIsVisible]);

  const [thumbnailsIsVisible, setThumbnailsIsVisible] = useState(false);
  const toggleThumbnailsIsVisible = useCallback(() => {
    setThumbnailsIsVisible((isVisible) => {
      return !isVisible;
    });
  }, [setThumbnailsIsVisible]);

  const [rotation, setRotation] = useState<Rotation>(0);
  const rotate = useCallback(() => {
    setRotation((rotation) => {
      return ((rotation + 1) % 4) as Rotation;
    });
  }, [setRotation]);

  const [scaleFactor, setScaleFactor] = useState(1.0);
  const scale = useCallback(() => {
    setScaleFactor((scaleFactor) => {
      scaleFactor += 0.1;
      if (scaleFactor > 2.0) {
        return 0.5;
      }

      return scaleFactor;
    });
  }, [setScaleFactor]);

  return (
    <div className="App">
      <div className="pdf__app" ref={pdfAppElemRef}>
        <div className="pdf__app__toolbar">
          <button onClick={toggleThumbnailsIsVisible}>Thumbnails</button>
          <button onClick={toggleOutlinesIsVisible}>Outlines</button>
          <button onClick={rotate}>Rotate</button>
          <button onClick={scale}>Scale</button>
        </div>
        <div className="pdf__app__body">
          <ThemeContextProvider
            theme={{
              background: 'blue',
            }}
          >
            <PdfEngineContextProvider engine={engine}>
              <PdfDocument
                source="https://localhost"
                onOpenSuccess={() => {}}
                onOpenFailure={() => {}}
              >
                <PdfNavigatorContextProvider navigator={pdfNavigator}>
                  <PdfPages
                    visibleRange={[-1, 1]}
                    viewport={viewport}
                    scaleFactor={scaleFactor}
                    rotation={rotation}
                  >
                    <PdfPageDecoration decoration={PdfPageNumber} />
                    <PdfPageDecoration decoration={PdfPageAnnotations} />
                  </PdfPages>
                  {thumbnailsIsVisible ? (
                    <PdfThumbnails
                      layout={{ direction: 'vertical', itemsCount: 5 }}
                      size={{ width: 100, height: 100 }}
                    />
                  ) : null}
                  {outlinesIsVisible ? <PdfOutlines /> : null}
                </PdfNavigatorContextProvider>
              </PdfDocument>
            </PdfEngineContextProvider>
          </ThemeContextProvider>
        </div>
      </div>
    </div>
  );
}

const appElem = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(appElem);
root.render(<App />);
