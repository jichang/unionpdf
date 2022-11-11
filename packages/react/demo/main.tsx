import React, {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  PdfPageObject,
  Rotation,
  PdfTextAnnoObject,
  PdfAnnotationSubtype,
  ConsoleLogger,
  Logger,
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
  PdfToolbar,
  PdfThumbnails,
  PdfPageContentComponentProps,
  PdfPages,
  PdfPageCanvas,
  PdfPageAnnotationComponentProps,
  PdfPageAnnotations,
  PdfPageAnnotationBase,
  PdfPageLinkAnnotation,
  PdfBookmarks,
  LoggerContextProvider,
} from '../src/index';
import {
  createPdfiumModule,
  PdfiumEngine,
  pdfiumWasm,
} from '@unionpdf/engines';
import { PdfEngine } from '@unionpdf/models';

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
    case PdfAnnotationSubtype.LINK:
      return (
        <PdfPageLinkAnnotation
          page={page}
          annotation={annotation}
          rotation={rotation}
          scaleFactor={scaleFactor}
        />
      );
    case PdfAnnotationSubtype.TEXT:
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

export interface AppProps {
  logger: Logger;
  engine: PdfEngine;
}

function App(props: AppProps) {
  const { logger, engine } = props;
  const [mode, setMode] = useState(PdfApplicationMode.Read);

  const toggleMode = useCallback(() => {
    setMode((mode: PdfApplicationMode) => {
      return mode === PdfApplicationMode.Read
        ? PdfApplicationMode.Edit
        : PdfApplicationMode.Read;
    });
  }, [setMode]);

  const [pdfNavigator] = useState(() => {
    return new PdfNavigator(logger);
  });
  const pdfAppElemRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 640, height: 480 });

  useLayoutEffect(() => {
    const pdfAppElem = pdfAppElemRef.current;
    if (pdfAppElem) {
      const style = getComputedStyle(pdfAppElem);
      console.log(style.height, style.width);
    }
  }, [pdfAppElemRef.current]);

  const [bookmarksIsVisible, setBookmarksIsVisible] = useState(false);
  const toggleBookmarksIsVisible = useCallback(() => {
    setBookmarksIsVisible((isVisible) => {
      return !isVisible;
    });
  }, [setBookmarksIsVisible]);

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

  const [file, setFile] = useState<{
    id: string;
    source: ArrayBuffer;
  } | null>(null);
  const selectFile = useCallback(
    async (evt: ChangeEvent<HTMLInputElement>) => {
      const files = evt.target.files;
      if (files?.[0]) {
        const file = files[0];
        const arrayBuffer = await readFile(file);
        setFile({
          id: file.name,
          source: arrayBuffer,
        });
        setRotation(0);
        setScaleFactor(1);
        pdfNavigator.gotoPage(
          {
            pageIndex: 0,
          },
          'App'
        );
      }
    },
    [setFile, pdfNavigator]
  );

  return (
    <div className="App">
      <div className="app__toolbar">
        <input type="file" onChange={selectFile} />
        <button onClick={toggleThumbnailsIsVisible}>Thumbnails</button>
        <button onClick={toggleBookmarksIsVisible}>Bookmarks</button>
      </div>
      {file ? (
        <LoggerContextProvider logger={logger}>
          <ThemeContextProvider
            theme={{
              background: 'blue',
            }}
          >
            <PdfEngineContextProvider engine={engine}>
              <PdfApplication mode={mode}>
                <PdfNavigatorContextProvider navigator={pdfNavigator}>
                  <PdfDocument
                    id={file.id}
                    source={file.source}
                    onOpenSuccess={() => {}}
                    onOpenFailure={() => {}}
                  >
                    <PdfPages
                      prerenderRange={[-5, 5]}
                      cacheRange={[-10, 10]}
                      scaleFactor={scaleFactor}
                      rotation={rotation}
                      pageContentComponent={PdfPageContent}
                    />
                    {thumbnailsIsVisible ? (
                      <PdfThumbnails
                        layout={{ direction: 'vertical', itemsCount: 2 }}
                        size={{ width: 100, height: 100 }}
                        scaleFactor={0.25}
                      />
                    ) : null}
                    {bookmarksIsVisible ? <PdfBookmarks /> : null}
                    <PdfToolbar
                      scaleFactor={scaleFactor}
                      changeScaleFactor={changeScaleFactor}
                      rotation={rotation}
                      changeRotation={changeRotation}
                    />
                  </PdfDocument>
                </PdfNavigatorContextProvider>
              </PdfApplication>
            </PdfEngineContextProvider>
          </ThemeContextProvider>
        </LoggerContextProvider>
      ) : null}
    </div>
  );
}

async function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      resolve(reader.result as ArrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  });
}

async function run() {
  const logger = new ConsoleLogger();
  const response = await fetch(pdfiumWasm);
  const wasmBinary = await response.arrayBuffer();
  const wasmModule = await createPdfiumModule({ wasmBinary });
  const engine = new PdfiumEngine(wasmModule, logger);
  engine.initialize();

  const appElem = document.querySelector('#root') as HTMLElement;
  const root = ReactDOM.createRoot(appElem);
  root.render(<App engine={engine} logger={logger} />);
}

run();
