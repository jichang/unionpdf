import { PdfiumEngine } from '../src/index';
import wasmFile from 'url:../src/pdfium/pdfium.wasm';

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
  const body = await response.arrayBuffer();
  const engine = new PdfiumEngine();
  engine.initialize({ wasmBinary: body });

  const input = document.getElementById('pdf-file') as HTMLInputElement;
  const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;

  input?.addEventListener('input', async (evt) => {
    const file = (evt.target as HTMLInputElement).files?.[0];
    if (file) {
      const arrayBuffer = await readFile(file);
      const result = engine.open(arrayBuffer);
      console.log(result);
    }
  });
}

window.addEventListener('DOMContentLoaded', run);
