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
  PdfFile,
} from '@unionpdf/models';
import * as ReactDOM from 'react-dom/client';
import {
  PdfApplicationMode,
  PdfEngineContextProvider,
  ThemeContextProvider,
  PdfNavigatorContextProvider,
  PdfApplication,
  PdfMetadata,
  PdfToolbar,
  PdfToolbarPluginItemGroup,
  PdfToolbarPagesItemGroup,
  PdfToolbarEditorItemGroup,
  PdfToolbarFileItemGroup,
  PdfThumbnails,
  PdfDownloader,
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
  Stamp,
  PdfApplicationContextProvider,
  PdfDocument,
  PdfPrinter,
  PrinterMethod,
  PdfMerger,
  Toolbar,
  ToolbarItemGroup,
  Button,
  Input,
  Downloader,
} from '../src/index';
import { PdfiumErrorCode, WebWorkerEngine } from '@unionpdf/engines';
import { PdfiumEngine } from '@unionpdf/engines';
import { createPdfiumModule } from '@unionpdf/engines';
import { pdfiumWasm } from '@unionpdf/engines';

export interface AppProps {
  logger: Logger;
  engine: PdfEngine;
}

function App(props: AppProps) {
  const { logger, engine } = props;
  const [mode, setMode] = useState(PdfApplicationMode.View);

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

  const [isDownloaderOpened, setIsDownloaderOpened] = useState(false);
  const toggleIsSaverVisible = useCallback(() => {
    setIsDownloaderOpened((isDownloaderOpened) => {
      return !isDownloaderOpened;
    });
  }, [setIsDownloaderOpened]);

  const [isPrinterOpened, setIsPrinterOpened] = useState(false);
  const toggleIsPrinterVisible = useCallback(() => {
    setIsPrinterOpened((isPrinterOpened) => {
      return !isPrinterOpened;
    });
  }, [setIsPrinterOpened]);

  const [password, setPassword] = useState('');
  const [isPasswordOpened, setIsPasswordOpened] = useState(false);

  const [file, setFile] = useState<PdfFile | null>(null);
  const selectFile = useCallback(
    async (evt: ChangeEvent<HTMLInputElement>) => {
      const files = evt.target.files;
      if (files?.[0]) {
        const file = files[0];
        const arrayBuffer = await readFile(file);
        setFile({
          id: file.name,
          name: file.name,
          content: arrayBuffer,
        });
        setPassword('');
        setRotation(0);
        setScaleFactor(1);
      }
    },
    [setFile]
  );

  const closeFile = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      setFile(null);
      setPassword('');
      setRotation(0);
      setScaleFactor(1);
    },
    [setFile]
  );

  const [stamps, setStamps] = useState<Stamp[]>([]);

  const addStamp = useCallback(
    (stamp: Stamp) => {
      setStamps((stamps) => {
        return [...stamps, stamp];
      });
    },
    [setStamps]
  );

  const [isMergerOpened, setIsMergerOpened] = useState(false);

  const toggleIsMergerOpened = useCallback(() => {
    setIsMergerOpened((isMergerOpened) => {
      return !isMergerOpened;
    });
  }, [setIsMergerOpened]);

  const [files, setFiles] = useState<PdfFile[]>([]);
  const selectFiles = useCallback(
    async (evt: ChangeEvent<HTMLInputElement>) => {
      const rawFiles = evt.target.files;
      if (rawFiles) {
        const files: PdfFile[] = [];
        for (let i = 0; i < rawFiles.length; i++) {
          const rawFile = rawFiles[i];
          const arrayBuffer = await readFile(rawFile);
          files.push({
            id: rawFile.name,
            name: rawFile.name,
            content: arrayBuffer,
          });
        }
        setFiles(files);
      }
    },
    [setFiles]
  );

  const removeFile = useCallback(
    (file: PdfFile) => {
      setFiles((files) => {
        const index = files.findIndex((_file) => {
          return _file.id === file.id;
        });
        if (index !== -1) {
          return files.filter((_file) => {
            return _file.id !== file.id;
          });
        }
        return files;
      });
    },
    [setFiles]
  );

  const exitMerger = useCallback(() => {
    toggleIsMergerOpened();
    setFiles([]);
  }, [setFiles, toggleIsMergerOpened]);

  return (
    <div className="App">
      <LoggerContextProvider logger={logger}>
        <ThemeContextProvider
          theme={{
            background: 'blue',
          }}
        >
          <PdfApplicationContextProvider
            initialMode={PdfApplicationMode.Edit}
            supportsEdit={true}
            onChangeMode={setMode}
          >
            <PdfEditorStampsContextProvider
              stamps={stamps}
              onAddStamp={addStamp}
              onRemoveStamp={() => {}}
            >
              <PdfEngineContextProvider engine={engine}>
                <PdfApplication>
                  <PdfNavigatorContextProvider>
                    <PdfDocument
                      file={file}
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
                            <PdfToolbarPluginItemGroup
                              className="pdf__toolbar__item__group--left"
                              onToggleMetadata={toggleMetadataIsVisible}
                              onToggleOutlines={toggleBookmarksIsVisible}
                              onToggleThumbnails={toggleThumbnailsIsVisible}
                              onToggleAttachments={toggleIsAttachmentsVisible}
                              onToggleSignatures={toggleSignaturesIsVisible}
                            />
                          ) : (
                            <PdfToolbarEditorItemGroup />
                          )}
                          <PdfToolbarPagesItemGroup
                            className="pdf__toolbar__item__group--center"
                            scaleFactor={scaleFactor}
                            changeScaleFactor={changeScaleFactor}
                            rotation={rotation}
                            changeRotation={changeRotation}
                            toggleIsSearchPanelOpened={
                              toggleIsSearchPanelOpened
                            }
                          />
                          <PdfToolbarFileItemGroup
                            className="pdf__toolbar__item__group--right"
                            onSave={toggleIsSaverVisible}
                            onPrint={toggleIsPrinterVisible}
                          >
                            <button type="button" onClick={closeFile}>
                              Close
                            </button>
                          </PdfToolbarFileItemGroup>
                        </PdfToolbar>
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
                              cacheRange={[-1, 1]}
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
                        {metadataIsVisible ? (
                          <div className="app__dialog">
                            <PdfMetadata />
                          </div>
                        ) : null}
                        {thumbnailsIsVisible ? (
                          <div className="app__pdf__thumbnails">
                            <PdfThumbnails
                              layout={{
                                direction: 'vertical',
                                itemsCount: 2,
                              }}
                              size={{ width: 100, height: 100 }}
                              scaleFactor={0.25}
                            />
                          </div>
                        ) : null}
                        {bookmarksIsVisible ? (
                          <div className="app__dialog">
                            <PdfBookmarks />
                          </div>
                        ) : null}
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
                        {isDownloaderOpened ? (
                          <div className="app__dialog">
                            <PdfDownloader />
                          </div>
                        ) : null}
                        {isPrinterOpened ? (
                          <div className="app__dialog">
                            <PdfPrinter
                              method={PrinterMethod.Iframe}
                              onCancel={toggleIsPrinterVisible}
                            />
                          </div>
                        ) : null}
                        <PdfEditor />
                      </PdfEditorContextProvider>
                    </PdfDocument>
                  </PdfNavigatorContextProvider>
                </PdfApplication>
                {isMergerOpened ? (
                  <div>
                    <Toolbar className="pdf__merger__toolbar">
                      <ToolbarItemGroup className="pdf__toolbar__item__group--left">
                        <Input type="file" multiple onChange={selectFiles} />
                      </ToolbarItemGroup>
                      <ToolbarItemGroup className="pdf__toolbar__item__group--right">
                        <Button onClick={exitMerger}>Exit</Button>
                      </ToolbarItemGroup>
                    </Toolbar>
                    <PdfMerger
                      files={files}
                      onRemoveFile={removeFile}
                      onMerged={(mergedFile) => {}}
                    />
                  </div>
                ) : null}
              </PdfEngineContextProvider>
            </PdfEditorStampsContextProvider>
          </PdfApplicationContextProvider>
        </ThemeContextProvider>
      </LoggerContextProvider>
      {file === null && !isMergerOpened ? (
        <div>
          <Button type="button" onClick={toggleIsMergerOpened}>
            Merge Files
          </Button>
          <Input type="file" onChange={selectFile} />
        </div>
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
  const url = new URL(window.location.href);
  const enableWebworker = url.searchParams.get('webworker');
  let engine: PdfEngine;
  if (enableWebworker) {
    engine = new WebWorkerEngine(new URL('./webworker'), logger);
  } else {
    const response = await fetch(pdfiumWasm);
    const wasmBinary = await response.arrayBuffer();
    const wasmModule = await createPdfiumModule({ wasmBinary });
    engine = new PdfiumEngine(wasmModule, logger);
  }
  engine.initialize?.();

  const appElem = document.querySelector('#root') as HTMLElement;
  const root = ReactDOM.createRoot(appElem);
  root.render(
    <React.StrictMode>
      <App engine={engine} logger={logger} />
    </React.StrictMode>
  );
}

run();
