import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  PdfEngine,
  PdfPageModel,
  PdfSource,
  PdfDocumentModel,
} from "@onepdf/models";
import { PdfEngineContextProvider, PdfDocument, usePdfDocument } from "../src";
import { ThemeContextProvider } from "../src/theme";

function createMockPdfEngine(engine?: Partial<PdfEngine>) {
  const pageCount = 10;
  const pageWidth = 320;
  const pageHeight = 480;
  const pages: PdfPageModel[] = [];
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
    renderPage: (page: PdfPageModel) => {
      const pixelCount = page.size.width * page.size.height;
      const array = new Uint8ClampedArray(pixelCount * 4);
      const rgbValue = page.index % 255;
      const alphaValue = 255;
      for (let i = 0; i < pixelCount; i++) {
        for (let j = 0; j < 3; j++) {
          const index = i * 4 + j;
          array[index] = rgbValue;
        }
        array[i * 4 + 3] = alphaValue;
      }

      return new ImageData(array, page.size.width, page.size.height);
    },
    close: async (pdf: PdfDocumentModel) => {},
    ...engine,
  };
}

export function PdfMetadata() {
  const pdf = usePdfDocument();

  return (
    <div
      style={{
        whiteSpace: "pre",
      }}
    >
      {JSON.stringify(pdf, null, 2)}
    </div>
  );
}

function App() {
  const engine = createMockPdfEngine();

  return (
    <div className="App">
      <ThemeContextProvider
        theme={{
          background: "blue",
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
    </div>
  );
}

const appElem = document.querySelector("#app") as HTMLElement;
const root = ReactDOM.createRoot(appElem);
root.render(<App />);
