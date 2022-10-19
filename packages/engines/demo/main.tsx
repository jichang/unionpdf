import { PdfiumEngine } from '../src/index';
import wasmFile from 'url:../src/pdfium/pdfium.wasm';

async function run() {
  const response = await fetch(wasmFile);
  const body = await response.arrayBuffer();
  const engine = new PdfiumEngine();
  engine.initialize({ wasmBinary: body });
}

run();
