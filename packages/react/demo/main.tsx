import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AllLogger,
  ConsoleLogger,
  Logger,
  PdfEngine,
  PdfEngineError,
  PdfFile,
  PerfLogger,
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
import { init } from '@unionpdf/pdfium';
import pdfiumWasm from 'url:@unionpdf/pdfium/pdfium.wasm';
import {
  Toolbar,
  ToolbarItemGroup,
  Button,
  Input,
  PdfNativeAdapterProvider,
  PanelMountPointContextProvider,
} from '../src/adapters/native';

export enum AppUI {
  Welcome,
  Opener,
  Merger,
}

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
  const [appUI, setAppUI] = useState(AppUI.Welcome);

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
        setAppUI(AppUI.Opener);
      }
    },
    [setFile],
  );

  const closeFile = useCallback(() => {
    setFile(null);
    setPassword('');
    setAppUI(AppUI.Welcome);
  }, [setFile, setPassword, setAppUI]);

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

  const openMerger = useCallback(() => {
    setAppUI(AppUI.Merger);
    setFiles([]);
  }, [setAppUI, setFiles]);

  const exitMerger = useCallback(() => {
    setAppUI(AppUI.Welcome);
    setFiles([]);
  }, [setAppUI, setFiles]);

  const panelMountPointElemRef = useRef<HTMLDivElement>(null);

  let content = null;
  switch (appUI) {
    case AppUI.Welcome:
      content = (
        <div>
          <Button
            scenario={{ usage: 'test' }}
            type="button"
            date-testid="demo__app__merge__files__btn"
            onClick={openMerger}
          >
            Merge Files
          </Button>
          <Input
            type="file"
            data-testid="demo__app__select__file__btn"
            onChange={selectFile}
          />
        </div>
      );
      break;
    case AppUI.Opener:
      content = (
        <PdfApplication>
          <PdfNavigatorContextProvider>
            <PdfDocument
              file={file}
              password={password}
              onOpenSuccess={() => {
                setIsPasswordOpened(false);
              }}
              onOpenFailure={(error: PdfEngineError) => {
                if (
                  (error.reason.code as number) === PdfiumErrorCode.Password
                ) {
                  setIsPasswordOpened(true);
                }
              }}
            >
              <PdfEditorContextProvider>
                <PdfToolbar
                  fileItems={<button onClick={closeFile}>Close</button>}
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
      );
      break;
    case AppUI.Merger:
      content = (
        <div>
          <Toolbar
            scenario={{ usage: 'test' }}
            className="pdf__merger__toolbar"
          >
            <ToolbarItemGroup
              scenario={{ usage: 'test' }}
              className="pdf__toolbar__item__group--left"
            >
              <Input type="file" multiple onChange={selectFiles} />
            </ToolbarItemGroup>
            <ToolbarItemGroup
              scenario={{ usage: 'test' }}
              className="pdf__toolbar__item__group--right"
            >
              <Button scenario={{ usage: 'test' }} onClick={exitMerger}>
                Exit
              </Button>
            </ToolbarItemGroup>
          </Toolbar>
          <PdfMerger
            files={files}
            onRemoveFile={removeFile}
            onMerged={() => {}}
          />
        </div>
      );
      break;
  }

  return (
    <PdfNativeAdapterProvider>
      <div className="App">
        <div
          className="pdf__panel__mount__point"
          ref={panelMountPointElemRef}
        />
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
                    {content}
                  </PdfEngineContextProvider>
                </PdfEditorStampsContextProvider>
              </PdfApplicationContextProvider>
            </ThemeContextProvider>
          </LoggerContextProvider>
        </PanelMountPointContextProvider>
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

export function PerfViewer() {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpened = useCallback(() => {
    setIsOpened((isOpened) => {
      return !isOpened;
    });
  }, [setIsOpened]);

  const [entries, setEntries] = useState<PerformanceEntryList>([]);

  const refresh = useCallback(() => {
    const entries = window.performance.getEntries();
    setEntries(entries);
  }, [setEntries]);

  useEffect(() => {
    if (isOpened) {
      refresh();
    } else {
      setEntries([]);
    }
  }, [isOpened, refresh]);

  return (
    <div className="perf__viewer">
      <div className="toolbar">
        <button onClick={toggleOpened}>
          {isOpened ? 'Close PerfViewer' : 'Open PerfViewer'}
        </button>
        <button onClick={refresh}>Refresh</button>
      </div>
      {isOpened ? (
        <div>
          <table>
            <thead>
              <tr>
                <td>Type</td>
                <td>Name</td>
                <td>StartTime</td>
                <td>Duration</td>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => {
                return (
                  <tr key={index}>
                    <td>{entry.entryType}</td>
                    <td>{entry.name}</td>
                    <td>{entry.startTime}</td>
                    <td>{entry.duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

async function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  });
}

async function run() {
  const consoleLogger = new ConsoleLogger();
  const perfLogger = new PerfLogger();
  const logger = new AllLogger([consoleLogger, perfLogger]);
  const url = new URL(window.location.href);
  const enableWebworker = url.searchParams.get('webworker') === 'true';
  const enablePerfViewer = url.searchParams.get('perfviewer') === 'true';
  let engine: PdfEngine;
  if (enableWebworker) {
    const worker = new Worker(new URL('./webworker.ts', import.meta.url), {
      type: 'module',
    });
    engine = new WebWorkerEngine(worker, logger);
  } else {
    const response = await fetch(pdfiumWasm);
    const wasmBinary = await response.arrayBuffer();
    const wasmModule = await init({ wasmBinary });
    engine = new PdfiumEngine(wasmModule, logger);
  }
  engine.initialize?.();

  const appElem = document.querySelector('#root') as HTMLElement;
  const root = ReactDOM.createRoot(appElem);
  root.render(
    <React.StrictMode>
      <App engine={engine} logger={logger} />
      {enablePerfViewer ? <PerfViewer /> : null}
    </React.StrictMode>,
  );
}

run();
