### @unionpdf/react

This pacakge contains several React components for showing PDF files on Web.

#### Install

```bash
npm install @unionpdf/react
```

### Usage

```typescript
function App() {
  const engine = createMockPdfEngine();
  const pdfAppElemRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const pdfAppElem = pdfAppElemRef.current;
    if (pdfAppElem) {
      const style = getComputedStyle(pdfAppElem);
      console.log(style.height, style.width);
    }
  }, [pdfAppElemRef.current]);

  return (
    <PdfNativeAdapterProvider>
      <div className="App">
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
                          <PdfToolbar onClose={closeFile} />
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
                          <PdfSearchPanel />
                          <PdfAttachments />
                          <PdfSignatures />
                          <PdfDownloader />
                          <PdfPrinter method={PrinterMethod.Iframe} />
                          <PdfEditor />
                        </PdfEditorContextProvider>
                      </PdfDocument>
                    </PdfNavigatorContextProvider>
                  </PdfApplication>
                </PdfEngineContextProvider>
              </PdfEditorStampsContextProvider>
            </PdfApplicationContextProvider>
          </ThemeContextProvider>
        </LoggerContextProvider>
      </div>
    </PdfNativeAdapterProvider>
  );
}
```

### PDF Page Layer

Every pdf page contains multiple layers, like canvas layer for rendering content or annotation layer for showing differnt kinds of annotations

Of course, you can build your own pdf page layer, every layer is a React component that will be rendered into pdf page

Below shows how to display the page number in the bottom of every pdf page

```typescript
function PdfPageNumber(props: { index: number }) {
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
      {index + 1}
    </div>
  );
}

<PdfPages
  visibleRange={[-1, 1]}
  viewport={viewport}
  pageLayers={[PdfPageCanvasLayer, PdfPageNumber]}
/>;
```

For the full code you can check the [demo app](./packages/app/src/main.tsx)

#### Supported PDF Page Layers

1. Canvas Layer

   This layer will render PDF content into canvas

2. Text Layer

   This layer will display PDF text in HTML Node

3. Annotation Layer

   This layer will display annotations, supported annotations including

   3.1 Link

   3.2 Text

   3.3 Widget (Basic ArcoForm, XFA is not supported yet)

4. Editor Layer

   This layer is for editing pdf files, supports features

   4.1 drawing new ink annotations
   4.2 move annotations through drag and drop

   Also, it has build in support for undo/redo.

5. Decoration Layer
   This laywer is for showing dynamic decoration on pdf page, which won't save to pdf file

### How to write a pdf plugin

A PDF Plugin is a component that can add specific functionalty to PDF document. In the [plugins folder](./src/plugins), there are several buildin plugins.

1. PdfPages renders all the pdf pages in the PDF files.
2. PdfThumbnails renders thumbnails.
3. PdfOutlines renders outlines.
4. PdfAttachments for accessing attachments
5. PdfMetadata for rendering file metadata
6. PdfSearchPanel for searing text in pdf file
7. PdfSignatures for retrieving signatures in pdf file
8. PdfEditor for editing files
9. PdfPrinter for printing files
10. PdfDownloader for downloading file
11. PdfUploader for uploading file

To build a pdf plugin, you just need to use hooks usePdfDocument and usePdfEngine to provide functionalities. Do note that you should avoid coupling between plugins.
