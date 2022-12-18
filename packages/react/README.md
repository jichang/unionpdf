### @unionpdf/react

This pacakge contains several React components for showing PDF files on Web.

#### Install

```bash
npm install @unionpdf/react
```

### Usage

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

// This component will be rendered in every pdf page
function PdfPageContent(props: PdfPageContentProps) {
  const { page } = props;

  return (
    <>
      <PdfPageNumber index={page.index} />
    </>
  );
}

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
              <PdfPages
                visibleRange={[-1, 1]}
                viewport={viewport}
                content={PdfPageContent}
              />
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

// This component will be rendered in every pdf page
function PdfPageContent(props: PdfPageContentProps) {
  const { page } = props;

  return (
    <>
      <PdfPageCanvas />
      <PdfPageNumber index={page.index} />
    </>
  );
}

<PdfPages
  visibleRange={[-1, 1]}
  viewport={viewport}
  content={PdfPageContent}
/>;
```

For the full code you can check the [demo app](./packages/app/src/main.tsx)

#### Supported PDF Layers

1. Canvas Layer

   This layer will render PDF content into canvas

2. Text Layer

   This layer will display PDF text in HTML Node

3. Annotation Layer

   This layer will display annotations, supported annotations including

   3.1 Link
   3.2 Text

### How to write a pdf plugin

A PDF Plugin is a component that can add specific functionalty to PDF document. In the [plugins folder](./src/plugins), there are several buildin plugins.

1. PdfPages renders all the pdf pages in the PDF files.
2. PdfThumbnails renders thumbnails.
3. PdfOutlines renders outlines.

To build a pdf plugin, you just need to use hooks usePdfDocument and usePdfEngine to provide functionalities. Do note that you should avoid coupling between plugins.
