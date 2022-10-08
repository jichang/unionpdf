### UnionPDF

UnionPDF contains several React components for showing PDF files on Web.

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
    <div className="App">
      <div className="pdf__app" ref={pdfAppElemRef}>
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
              <PdfPages visibleRange={[-1, 1]} viewport={viewport}>
                <PdfPageLayer layer={PdfPageCanvas}>
                <PdfPageLayer layer={PdfPageAnnotations}>
              </PdfPages>
              <PdfThumbnails
                layout={{ colsCount: 100, rowsCount: 100 }}
                size={{ width: 100, height: 100 }}
              />
              <PdfOutlines />
            </PdfDocument>
          </PdfEngineContextProvider>
        </ThemeContextProvider>
      </div>
    </div>
  );
}
```

### PDF Engine

PDF engine is used for parsing and rendering PDF file. Right now, there's no PDF engine in this repo, you need to build your own engine, like providing an object that contains all the methods specified in the [PdfEngine](./packages/models/src/index.ts).

There are several ways for building pdf engine

1. build it from scratch (more work, but easier to control)
2. compiling PDFium to WASM (this should be easier)

### PDF Page Layer

Every pdf page contains multiple layers, like canvas layer for rendering content or annotation layer for showing differnt kinds of annotations

Of course, you can build your own pdf page layer, since it's a React component that will be rendered into pdf page, say if you want to display the page number in the bottom of every pdf page

```typescript
function PdfPageNumber(props: PdfPageLayerComponentProps) {
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
```

Then you can register it with PdfPageLayer, like below

```typescript
<PdfPages visibleRange={[-1, 1]} viewport={viewport}>
  <PdfPageLayer layer={PdfPageNumber} />
</PdfPages>
```

For the full code you can check the [demo app](./packages/plugins/demo/main.tsx)

### How to write a pdf plugin

A PDF Plugin is a component that can add specific functionalty to PDF document. Like in the @unionpdf/plugins repo, PdfPages is used to display PDF content, PdfThumbnails is to show thumbnails. To build a pdf plugin, you just need to use hooks usePdfDocument and usePdfEngine to provide functionalities. Do note that you should avoid coupling between plugins.

### Dev

1. clone repo

```
git clone https://github.com/jichang/unionpdf.git
```

2. bootstrap

```
lerna bootstrap --hoist
```

3. build

```
lerna run build
```

4. test

```
lerna run test
```
