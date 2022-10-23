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

  inputElem?.addEventListener('input', async (evt) => {
    const file = (evt.target as HTMLInputElement).files?.[0];
    if (file) {
      const arrayBuffer = await readFile(file);
      const doc = engine.openDocument(arrayBuffer);

      for (let i = 0; i < doc.pageCount; i++) {
        const page = doc.pages[i];

        const imageData = engine.renderPage(doc, page, 2, 0);

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
      }

      engine.closeDocument(doc);
      engine.destroy();
    }
  });
}

window.addEventListener('DOMContentLoaded', run);
