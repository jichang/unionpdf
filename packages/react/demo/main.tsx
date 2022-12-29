import React, {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Rotation,
  ConsoleLogger,
  Logger,
  PdfZoomMode,
  PdfEngine,
  PdfEngineError,
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
  PdfMetadata,
  PdfToolbar,
  PdfPagesToolbar,
  PdfToolbarDocItemGroup,
  PdfThumbnails,
  PdfPages,
  PdfBookmarks,
  PdfSignatures,
  LoggerContextProvider,
  PdfToolbarNavigationtemGroup,
  PdfSearchPanel,
  PdfAttachments,
  PdfFullFledgedPageContent,
} from '../src/index';
import {
  createPdfiumModule,
  PdfiumEngine,
  pdfiumWasm,
  PdfiumErrorCode,
} from '@unionpdf/engines';

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

  useLayoutEffect(() => {
    const pdfAppElem = pdfAppElemRef.current;
    if (pdfAppElem) {
      const style = getComputedStyle(pdfAppElem);
      console.log(style.height, style.width);
    }
  }, [pdfAppElemRef.current]);

  const [metadataIsVisible, setMetadataIsVisible] = useState(false);
  const toggleMetadataIsVisible = useCallback(() => {
    setMetadataIsVisible((isVisible) => {
      return !isVisible;
    });
  }, [setMetadataIsVisible]);

  const [signaturesIsVisible, setSignaturesIsVisible] = useState(false);
  const toggleSignaturesIsVisible = useCallback(() => {
    setSignaturesIsVisible((isVisible) => {
      return !isVisible;
    });
  }, [setSignaturesIsVisible]);

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

  const [isSearchPanelOpened, setIsSearchPanelOpened] = useState(false);

  const toggleIsSearchPanelOpened = useCallback(() => {
    setIsSearchPanelOpened((isSearchPanelOpened) => {
      return !isSearchPanelOpened;
    });
  }, [setIsSearchPanelOpened]);

  const [isAttachmentsOpened, setIsAttachmentsOpened] = useState(false);

  const toggleIsAttachmentsVisible = useCallback(() => {
    setIsAttachmentsOpened((isAttachmentsOpened) => {
      return !isAttachmentsOpened;
    });
  }, [setIsAttachmentsOpened]);

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
            destination: {
              pageIndex: 0,
              zoom: {
                mode: PdfZoomMode.Unknown,
              },
              view: [],
            },
          },
          'App'
        );
      }
    },
    [setFile, pdfNavigator]
  );

  const [password, setPassword] = useState('');
  const [isPasswordOpened, setIsPasswordOpened] = useState(false);

  return (
    <div className="App">
      <div className="app__toolbar">
        <input type="file" onChange={selectFile} />
        <button onClick={toggleMode}>
          {mode === PdfApplicationMode.Edit ? 'View' : 'Edit'}
        </button>
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
                    password={password}
                    onOpenSuccess={() => {
                      setIsPasswordOpened(false);
                    }}
                    onOpenFailure={(error: PdfEngineError) => {
                      if (error.code === PdfiumErrorCode.Password) {
                        setIsPasswordOpened(true);
                      }
                    }}
                  >
                    <PdfToolbar>
                      <PdfToolbarNavigationtemGroup
                        onToggleMetadata={toggleMetadataIsVisible}
                        onToggleOutlines={toggleBookmarksIsVisible}
                        onToggleThumbnails={toggleThumbnailsIsVisible}
                        onToggleAttachments={toggleIsAttachmentsVisible}
                        onToggleSignatures={toggleSignaturesIsVisible}
                      />
                      <PdfPagesToolbar
                        scaleFactor={scaleFactor}
                        changeScaleFactor={changeScaleFactor}
                        rotation={rotation}
                        changeRotation={changeRotation}
                        toggleIsSearchPanelOpened={toggleIsSearchPanelOpened}
                      />
                      <PdfToolbarDocItemGroup />
                    </PdfToolbar>
                    {metadataIsVisible ? <PdfMetadata /> : null}
                    <PdfPages
                      prerenderRange={[-1, 1]}
                      cacheRange={[-5, 5]}
                      scaleFactor={scaleFactor}
                      rotation={rotation}
                      pageContentComponent={PdfFullFledgedPageContent}
                    />
                    {thumbnailsIsVisible ? (
                      <PdfThumbnails
                        layout={{ direction: 'vertical', itemsCount: 2 }}
                        size={{ width: 100, height: 100 }}
                        scaleFactor={0.25}
                      />
                    ) : null}
                    {bookmarksIsVisible ? <PdfBookmarks /> : null}
                    {isSearchPanelOpened ? (
                      <div className="app__dialog">
                        <PdfSearchPanel />
                      </div>
                    ) : null}
                    {isAttachmentsOpened ? (
                      <div className="app__dialog">
                        <PdfAttachments />
                      </div>
                    ) : null}
                    {signaturesIsVisible ? (
                      <div className="app__dialog">
                        <PdfSignatures
                          onSignaturesLoaded={(signatures) => {
                            console.log(
                              'You can verify the signature here: ',
                              signatures
                            );
                          }}
                        />
                      </div>
                    ) : null}
                  </PdfDocument>
                </PdfNavigatorContextProvider>
              </PdfApplication>
            </PdfEngineContextProvider>
          </ThemeContextProvider>
        </LoggerContextProvider>
      ) : null}
      {isPasswordOpened ? (
        <div className="app__dialog">
          <div>
            <input
              type="text"
              value={password}
              onChange={(evt) => {
                setPassword(evt.target.value);
              }}
            />
          </div>
        </div>
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
