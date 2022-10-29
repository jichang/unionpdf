import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  PdfEngine,
  PdfPageObject,
  PdfDocumentObject,
  Rotation,
  TaskBase,
  PdfBookmarkObject,
  PdfAnnotationObject,
} from '@unionpdf/models';
import {
  PdfEngineContextProvider,
  PdfDocument,
  usePdfDocument,
  PdfApplication,
  PdfApplicationMode,
  ThemeContextProvider,
} from '../src';

function createMockPdfEngine(engine?: Partial<PdfEngine>): PdfEngine {
  const pageCount = 10;
  const pageWidth = 320;
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
    openDocument: (id: string, data: ArrayBuffer) => {
      return TaskBase.resolve({
        id: 'id',
        pageCount: pageCount,
        pages: pages,
      });
    },
    renderPage: (doc: PdfDocumentObject, page: PdfPageObject) => {
      return TaskBase.resolve(new ImageData(page.size.width, page.size.height));
    },
    renderThumbnail: (doc: PdfDocumentObject, page: PdfPageObject) => {
      return TaskBase.resolve(new ImageData(page.size.width, page.size.height));
    },
    getBookmarks: (doc: PdfDocumentObject) => {
      const bookmarks: PdfBookmarkObject[] = [];
      return TaskBase.resolve({
        bookmarks,
      });
    },
    getPageAnnotations: (
      doc: PdfDocumentObject,
      page: PdfPageObject,
      scaleFactor: number,
      rotation: Rotation
    ) => {
      const annotations: PdfAnnotationObject[] = [];
      return TaskBase.resolve(annotations);
    },
    closeDocument: (pdf: PdfDocumentObject) => {
      return TaskBase.resolve(true);
    },
    ...engine,
  };
}

export function PdfMetadata() {
  const pdf = usePdfDocument();

  return (
    <div
      style={{
        whiteSpace: 'pre',
      }}
    >
      {JSON.stringify(pdf, null, 2)}
    </div>
  );
}

function App() {
  const engine = createMockPdfEngine();

  return (
    <PdfApplication mode={PdfApplicationMode.Read}>
      <ThemeContextProvider
        theme={{
          background: 'blue',
        }}
      >
        <PdfEngineContextProvider engine={engine}>
          <PdfDocument
            id="test"
            source={new Uint8Array()}
            onOpenSuccess={() => {}}
            onOpenFailure={() => {}}
          >
            <PdfMetadata />
          </PdfDocument>
        </PdfEngineContextProvider>
      </ThemeContextProvider>
    </PdfApplication>
  );
}

const appElem = document.querySelector('#app') as HTMLElement;
const root = ReactDOM.createRoot(appElem);
root.render(<App />);
