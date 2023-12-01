import React, {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  ConsoleLogger,
  Logger,
  PdfEngine,
  PdfEngineError,
  PdfFile,
} from '@unionpdf/models';
import * as ReactDOM from 'react-dom/client';
import {
  PdfEngineContextProvider,
  ThemeContextProvider,
  PdfNavigatorContextProvider,
  PdfApplication,
  PdfMetadata,
  PdfToolbar,
  PdfThumbnails,
  PdfDownloader,
  PdfPages,
  PdfBookmarks,
  PdfSignatures,
  LoggerContextProvider,
  PdfSearch,
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
  StoragePdfApplicationConfigurationProvider,
} from '../src/index';
import { PdfiumErrorCode, WebWorkerEngine } from '@unionpdf/engines';
import { PdfiumEngine } from '@unionpdf/engines';
import { createPdfiumModule } from '@unionpdf/engines';
import pdfiumWasm from 'url:@unionpdf/engines/wasm/pdfium.wasm';
import {
  Toolbar,
  ToolbarItemGroup,
  Button,
  Input,
  PdfNativeAdapterProvider,
  PanelMountPointContextProvider,
} from '../src/adapters/native';

export interface AppProps {
  logger: Logger;
  engine: PdfEngine;
}

function App(props: AppProps) {
  const { logger, engine } = props;
  const [provider] = useState(() => {
    return new StoragePdfApplicationConfigurationProvider(
      localStorage,
      'pdfviewer.configurtion',
    );
  });

  const pdfAppElemRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const pdfAppElem = pdfAppElemRef.current;
    if (pdfAppElem) {
      const style = getComputedStyle(pdfAppElem);
      console.log(style.height, style.width);
    }
  }, [pdfAppElemRef.current]);

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
      }
    },
    [setFile, provider],
  );

  const closeFile = useCallback(() => {
    setFile(null);
    setPassword('');
  }, [setFile, setPassword, provider]);

  const [stamps, setStamps] = useState<Stamp[]>([]);

  const addStamp = useCallback(
    (stamp: Stamp) => {
      setStamps((stamps) => {
        return [...stamps, stamp];
      });
    },
    [setStamps],
  );

  const removeStamp = useCallback(
    (stamp: Stamp) => {
      setStamps((stamps) => {
        return stamps.filter((_stamp) => {
          return _stamp.source !== stamp.source;
        });
      });
    },
    [setStamps],
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
    [setFiles],
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
    [setFiles],
  );

  const exitMerger = useCallback(() => {
    toggleIsMergerOpened();
    setFiles([]);
  }, [setFiles, toggleIsMergerOpened]);

  const panelMountPointElemRef = useRef<HTMLDivElement>(null);

  return (
    <PdfNativeAdapterProvider>
      <div className="App">
        <div
          className="pdf__panel__mount__point"
          ref={panelMountPointElemRef}
        ></div>
        <PanelMountPointContextProvider
          domElem={panelMountPointElemRef.current}
        >
          <LoggerContextProvider logger={logger}>
            <ThemeContextProvider
              theme={{
                background: 'blue',
              }}
            >
              <PdfApplicationContextProvider provider={provider}>
                <PdfEditorStampsContextProvider
                  stamps={stamps}
                  onAddStamp={addStamp}
                  onRemoveStamp={removeStamp}
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
                            <PdfToolbar
                              fileItems={
                                <button onClick={closeFile}>Close</button>
                              }
                            />
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
                                  pageLayers={[
                                    PdfPageCanvasLayer,
                                    PdfPageTextLayer,
                                    PdfPageAnnotationsLayer,
                                    PdfPageEditorLayer,
                                  ]}
                                />
                              </PdfLinkAnnoContextProvider>
                            </PdfPageAnnotationComponentContextProvider>
                            <PdfMetadata />
                            <PdfThumbnails
                              layout={{
                                direction: 'vertical',
                                itemsCount: 2,
                              }}
                              size={{ width: 100, height: 100 }}
                              scaleFactor={0.25}
                            />
                            <PdfBookmarks />
                            <PdfSearch />
                            <PdfAttachments />
                            <PdfSignatures />
                            <PdfDownloader />
                            <PdfPrinter method={PrinterMethod.Iframe} />
                            <PdfEditor />
                          </PdfEditorContextProvider>
                        </PdfDocument>
                      </PdfNavigatorContextProvider>
                    </PdfApplication>
                    {isMergerOpened ? (
                      <div>
                        <Toolbar
                          scenario={{ usage: 'test' }}
                          className="pdf__merger__toolbar"
                        >
                          <ToolbarItemGroup
                            scenario={{ usage: 'test' }}
                            className="pdf__toolbar__item__group--left"
                          >
                            <Input
                              type="file"
                              multiple
                              onChange={selectFiles}
                            />
                          </ToolbarItemGroup>
                          <ToolbarItemGroup
                            scenario={{ usage: 'test' }}
                            className="pdf__toolbar__item__group--right"
                          >
                            <Button
                              scenario={{ usage: 'test' }}
                              onClick={exitMerger}
                            >
                              Exit
                            </Button>
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
        </PanelMountPointContextProvider>
        {file === null && !isMergerOpened ? (
          <div>
            <Button
              scenario={{ usage: 'test' }}
              type="button"
              date-testid="demo__app__merge__files__btn"
              onClick={toggleIsMergerOpened}
            >
              Merge Files
            </Button>
            <Input
              type="file"
              data-testid="demo__app__select__file__btn"
              onChange={selectFile}
            />
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
    </PdfNativeAdapterProvider>
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
    const worker = new Worker(new URL('./webworker.ts', import.meta.url), {
      type: 'module',
    });
    engine = new WebWorkerEngine(worker, logger);
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
    </React.StrictMode>,
  );
}

run();
