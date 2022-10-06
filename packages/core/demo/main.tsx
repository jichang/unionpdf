import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  PdfEngine,
  PdfPageObject,
  PdfSource,
  PdfDocumentObject,
} from '@onepdf/models';
import {
  PdfEngineContextProvider,
  PdfDocument,
  usePdfDocument,
  PdfApplication,
  PdfApplicationMode,
} from '../src';
import { ThemeContextProvider } from '../src/theme.context';

function createMockPdfEngine(engine?: Partial<PdfEngine>) {
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
    open: async (url: PdfSource) => {
      return {
        pageCount: pageCount,
        size: {
          width: pageWidth,
          height: pageHeight,
        },
        pages: pages,
      };
    },
    renderPage: (page: PdfPageObject) => {
      return new ImageData(page.size.width, page.size.height);
    },
    renderThumbnail: (page: PdfPageObject) => {
      return new ImageData(page.size.width, page.size.height);
    },
    getOutlines: () => {
      return {
        entries: [],
      };
    },
    getPageAnnotations: (page: PdfPageObject) => {
      return [];
    },
    close: async (pdf: PdfDocumentObject) => {},
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
            source="https://localhost"
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
