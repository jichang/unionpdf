import { PdfiumEngineRunner } from '../src/index';
import pdfiumWasm from '../src/pdfium/pdfium.wasm';

async function init() {
  const response = await fetch(pdfiumWasm);
  const wasmBinary = await response.arrayBuffer();
  const runner = new PdfiumEngineRunner(wasmBinary);
  runner.prepare();
}

init();
