import {
  pdfiumDebugWasm,
  createDebugPdfiumModule,
  pdfiumWasm,
  createPdfiumModule,
  PdfiumEngine,
} from '../src/index';

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
  const url = new URL(window.location.href);
  const isDebug = !!url.searchParams.get('debug');
  const response = await fetch(isDebug ? pdfiumDebugWasm : pdfiumWasm);
  const wasmBinary = await response.arrayBuffer();
  const wasmModule = await (isDebug
    ? createDebugPdfiumModule(pdfiumDebugWasm)
    : createPdfiumModule({ wasmBinary }));
  const engine = new PdfiumEngine(wasmModule);

  engine.initialize();

  const inputElem = document.getElementById('pdf-file') as HTMLInputElement;
  const bookmarksElem = document.getElementById(
    'pdf-bookmarks'
  ) as HTMLParagraphElement;

  inputElem?.addEventListener('input', async (evt) => {
    const file = (evt.target as HTMLInputElement).files?.[0];
    if (file) {
      const arrayBuffer = await readFile(file);
      const doc = engine.openDocument(arrayBuffer);

      const bookmarks = engine.getBookmarks(doc);
      console.log(bookmarks);

      for (let i = 0; i < doc.pageCount; i++) {
        const page = doc.pages[i];

        const imageData = engine.renderPage(doc, page, 1, 0);

        const canvasElem = document.createElement(
          'canvas'
        ) as HTMLCanvasElement;
        const rootElem = document.getElementById('root') as HTMLDivElement;
        rootElem.appendChild(canvasElem);
        canvasElem.style.width = `${page.size.width}px`;
        canvasElem.style.height = `${page.size.height}px`;
        canvasElem.width = imageData.width;
        canvasElem.height = imageData.height;

        const ctx = canvasElem.getContext('2d');
        ctx?.putImageData(
          imageData,
          0,
          0,
          0,
          0,
          imageData.width,
          imageData.height
        );

        const annotations = engine.getPageAnnotations(doc, page, 1, 0);
        console.log(page.index, annotations);
      }

      engine.closeDocument(doc);
      engine.destroy();
    }
  });
}

window.addEventListener('DOMContentLoaded', run);
