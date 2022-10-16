import React, {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  PdfEngine,
  PdfPageObject,
  PdfSource,
  PdfDocumentObject,
  PdfLinkAnnoObject,
  Rotation,
  swap,
  PdfTextAnnoObject,
} from '@unionpdf/models';
import * as ReactDOM from 'react-dom/client';
import {
  PdfApplicationMode,
  PdfEngineContextProvider,
  PdfDocument,
  PdfNavigator,
  ThemeContextProvider,
  PdfNavigatorContextProvider,
  PdfApplication,
} from '@unionpdf/core';
import { PdfToolbar } from '../src/toolbar';
import { PdfThumbnails } from '../src/thumbnails';
import { PdfPageContentComponentProps, PdfPages } from '../src/pages';
import { PdfOutlines } from '../src/outlines';
import { PdfPageCanvas } from '../src/pageLayers/canvas';
import {
  PdfPageAnnotationComponentProps,
  PdfPageAnnotations,
} from '../src/pageLayers/annotations';
import { PdfPageAnnotationBase } from '../src/annotations/annotation';
import { PdfPageLinkAnnotation } from '../src/annotations/link';

function PdfPageNumber(props: { page: PdfPageObject }) {
  const { page } = props;

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
      {page.index + 1}
    </div>
  );
}

function PdfPageTextAnnotationCustomize(
  props: PdfPageAnnotationComponentProps<PdfTextAnnoObject>
) {
  const { annotation, scaleFactor, rotation } = props;

  return (
    <PdfPageAnnotationBase
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      <p>{annotation.text}</p>
    </PdfPageAnnotationBase>
  );
}

function PdfPageAnnotation(props: PdfPageAnnotationComponentProps) {
  const { page, annotation, rotation, scaleFactor } = props;
  switch (annotation.type) {
    case 'link':
      return (
        <PdfPageLinkAnnotation
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
    case 'text':
      return (
        <PdfPageTextAnnotationCustomize
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
    default:
      return <PdfPageAnnotationBase {...props} />;
  }
}

function PdfPageContent(props: PdfPageContentComponentProps) {
  return (
    <>
      <PdfPageCanvas {...props} />
      <PdfPageAnnotations {...props} annotationComponent={PdfPageAnnotation} />
      <PdfPageNumber {...props} />
    </>
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
      const pdfLinkAnnoObject1: PdfLinkAnnoObject = {
        id: page.index + 1,
        type: 'link',
        target: {
          type: 'url',
          url: 'https://localhost',
        },
        text: 'url link',
        rect: {
          origin: {
            x: 10,
            y: 10,
          },
          size: {
            width: 100,
            height: 50,
          },
        },
      };
      const pdfLinkAnnoObject2: PdfLinkAnnoObject = {
        id: page.index + 2,
        type: 'link',
        target: {
          type: 'page',
          pageIndex: page.index + 1,
          rect: {
            origin: {
              x: 100,
              y: 100,
            },
            size: {
              width: 100,
              height: 100,
            },
          },
        },
        text: 'rect link',
        rect: {
          origin: {
            x: 10,
            y: 100,
          },
          size: {
            width: 100,
            height: 50,
          },
        },
      };

      return [pdfLinkAnnoObject1, pdfLinkAnnoObject2];
    },
    close: async (pdf: PdfDocumentObject) => {},
    ...engine,
  };
}

function App() {
  const [mode, setMode] = useState(PdfApplicationMode.Read);

  const toggleMode = useCallback(() => {
    setMode((mode: PdfApplicationMode) => {
      return mode === PdfApplicationMode.Read
        ? PdfApplicationMode.Edit
        : PdfApplicationMode.Read;
    });
  }, [setMode]);

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
  const changeRotation = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      const rotation = parseInt(evt.target.value, 10) as Rotation;
      console.log(rotation);
      setRotation(rotation);
    },
    [setRotation]
  );

  const [scaleFactor, setScaleFactor] = useState(1.0);
  const changeScaleFactor = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setScaleFactor(Number(evt.target.value));
    },
    [setScaleFactor]
  );

  return (
    <div className="App">
      <ThemeContextProvider
        theme={{
          background: 'blue',
        }}
      >
        <PdfEngineContextProvider engine={engine}>
          <PdfApplication mode={mode}>
            <PdfNavigatorContextProvider navigator={pdfNavigator}>
              <PdfDocument
                source="https://localhost"
                onOpenSuccess={() => {}}
                onOpenFailure={() => {}}
              >
                <PdfPages
                  visibleRange={[-1, 1]}
                  viewport={viewport}
                  scaleFactor={scaleFactor}
                  rotation={rotation}
                  pageContentComponent={PdfPageContent}
                />
                {thumbnailsIsVisible ? (
                  <PdfThumbnails
                    layout={{ direction: 'vertical', itemsCount: 5 }}
                    size={{ width: 100, height: 100 }}
                  />
                ) : null}
                {outlinesIsVisible ? <PdfOutlines /> : null}
                <div className="pdf__toolbar__container">
                  <PdfToolbar
                    scaleFactor={scaleFactor}
                    changeScaleFactor={changeScaleFactor}
                    rotation={rotation}
                    changeRotation={changeRotation}
                  />
                </div>
              </PdfDocument>
            </PdfNavigatorContextProvider>
          </PdfApplication>
        </PdfEngineContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

const appElem = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(appElem);
root.render(<App />);
