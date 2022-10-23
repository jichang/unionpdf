import { PdfiumEngine } from '../src/index';
import wasmFile from 'url:../src/pdfium/pdfium.wasm';
import { createPdfiumModule } from '../src/pdfium/pdfium';

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
  const response = await fetch(wasmFile);
  const wasmBinary = await response.arrayBuffer();
  const wasmModule = await createPdfiumModule({ wasmBinary });
  const engine = new PdfiumEngine(wasmModule);

  engine.initialize();

  const inputElem = document.getElementById('pdf-file') as HTMLInputElement;
  const bookmarksElem = document.getElementById(
    'pdf-bookmarks'
  ) as HTMLParagraphElement;
  const canvasElem = document.getElementById('pdf-canvas') as HTMLCanvasElement;

  inputElem?.addEventListener('input', async (evt) => {
    const file = (evt.target as HTMLInputElement).files?.[0];
    if (file) {
      const abortController = new AbortController();
      const arrayBuffer = await readFile(file);
      const doc = engine.openDocument(arrayBuffer);
      const bookmarks = engine.getBookmarks(doc, abortController.signal);
      console.log(bookmarks);

      const page = doc.pages[0];

      const imageData = engine.renderPage(doc, page, 1, 0);

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

      engine.closeDocument(doc);
      engine.destroy();
    }
  });
}

window.addEventListener('DOMContentLoaded', run);
