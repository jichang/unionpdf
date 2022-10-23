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
      const result = engine.open(arrayBuffer);
      const bookmarks = engine.getBookmarks(result, abortController.signal);
      bookmarksElem.innerText = JSON.stringify(bookmarks, null, 2);

      engine.close(result);
      engine.destroy();
    }
  });
}

window.addEventListener('DOMContentLoaded', run);
