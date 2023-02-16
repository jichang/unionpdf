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
  PdfEngine,
  PdfEngineError,
} from '@unionpdf/models';
import * as ReactDOM from 'react-dom/client';
import {
  PdfApplicationMode,
  PdfEngineContextProvider,
  PdfDocument,
  ThemeContextProvider,
  PdfNavigatorContextProvider,
  PdfApplication,
  PdfMetadata,
  PdfToolbar,
  PdfToolbarBrowseItemGroup,
  PdfToolbarViewPagesItemGroup,
  PdfToolbarEditPagesItemGroup,
  PdfToolbarManageItemGroup,
  PdfThumbnails,
  PdfPages,
  PdfBookmarks,
  PdfSignatures,
  LoggerContextProvider,
  PdfSearchPanel,
  PdfAttachments,
  PdfPageAnnotationComponentContextProvider,
  PdfLinkAnnoContextProvider,
  PdfEditorContextProvider,
  PdfEditor,
  PdfPageAnnotationsLayer,
  PdfPageCanvasLayer,
  PdfPageTextLayer,
  PdfPageDefaultAnnotation,
  PdfPageEditorLayer,
  PdfEditorStampsContextProvider,
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
  const [mode, setMode] = useState(PdfApplicationMode.View);

  const toggleMode = useCallback(() => {
    setMode((mode: PdfApplicationMode) => {
      return mode === PdfApplicationMode.View
        ? PdfApplicationMode.Edit
        : PdfApplicationMode.View;
    });
  }, [setMode]);

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

  const [password, setPassword] = useState('');
  const [isPasswordOpened, setIsPasswordOpened] = useState(false);

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
        setPassword('');
        setRotation(0);
        setScaleFactor(1);
      }
    },
    [setFile]
  );

  const stamps = [
    { source: document.getElementById('stamp') as HTMLImageElement },
  ];

  return (
    <div className="App">
      <div className="app__toolbar">
        <input type="file" onChange={selectFile} />
      </div>
      {file ? (
        <LoggerContextProvider logger={logger}>
          <ThemeContextProvider
            theme={{
              background: 'blue',
            }}
          >
            <PdfEditorStampsContextProvider
              stamps={stamps}
              onAddStamp={() => {}}
              onRemoveStamp={() => {}}
            >
              <PdfEngineContextProvider engine={engine}>
                <PdfApplication mode={mode}>
                  <PdfNavigatorContextProvider>
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
                      <PdfEditorContextProvider>
                        <PdfToolbar>
                          {mode === PdfApplicationMode.View ? (
                            <PdfToolbarBrowseItemGroup
                              className="pdf__toolbar__item__group--left"
                              onToggleMetadata={toggleMetadataIsVisible}
                              onToggleOutlines={toggleBookmarksIsVisible}
                              onToggleThumbnails={toggleThumbnailsIsVisible}
                              onToggleAttachments={toggleIsAttachmentsVisible}
                              onToggleSignatures={toggleSignaturesIsVisible}
                            />
                          ) : null}
                          {mode === PdfApplicationMode.View ? (
                            <PdfToolbarViewPagesItemGroup
                              className="pdf__toolbar__item__group--center"
                              scaleFactor={scaleFactor}
                              changeScaleFactor={changeScaleFactor}
                              rotation={rotation}
                              changeRotation={changeRotation}
                              toggleIsSearchPanelOpened={
                                toggleIsSearchPanelOpened
                              }
                            />
                          ) : (
                            <PdfToolbarEditPagesItemGroup />
                          )}
                          <PdfToolbarManageItemGroup className="pdf__toolbar__item__group--right">
                            <button
                              onClick={toggleMode}
                              className="pdf__ui__button"
                            >
                              {mode === PdfApplicationMode.Edit
                                ? 'View'
                                : 'Edit'}
                            </button>
                          </PdfToolbarManageItemGroup>
                        </PdfToolbar>
                        {metadataIsVisible ? <PdfMetadata /> : null}
                        <PdfPageAnnotationComponentContextProvider
                          component={PdfPageDefaultAnnotation}
                        >
                          <PdfLinkAnnoContextProvider
                            onClick={(evt, annotation) => {
                              console.log(evt, annotation);
                            }}
                          >
                            <PdfPages
                              prerenderRange={[-1, 1]}
                              cacheRange={[-5, 5]}
                              scaleFactor={scaleFactor}
                              rotation={rotation}
                              pageLayers={[
                                PdfPageCanvasLayer,
                                PdfPageTextLayer,
                                PdfPageAnnotationsLayer,
                                PdfPageEditorLayer,
                              ]}
                            />
                          </PdfLinkAnnoContextProvider>
                        </PdfPageAnnotationComponentContextProvider>
                        {thumbnailsIsVisible ? (
                          <div className="app__pdf__thumbnails">
                            <PdfThumbnails
                              layout={{ direction: 'vertical', itemsCount: 2 }}
                              size={{ width: 100, height: 100 }}
                              scaleFactor={0.25}
                            />
                          </div>
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
                        <PdfEditor />
                      </PdfEditorContextProvider>
                    </PdfDocument>
                  </PdfNavigatorContextProvider>
                </PdfApplication>
              </PdfEngineContextProvider>
            </PdfEditorStampsContextProvider>
          </ThemeContextProvider>
        </LoggerContextProvider>
      ) : null}
      {isPasswordOpened ? (
        <div className="app__dialog">
          <div>
            <label>Input the password</label>
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
