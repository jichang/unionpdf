export * from './wrapper';
export * from './engine';
export { createPdfiumModule } from './pdfium';
import * as _pdfiumWasm from 'url:./pdfium.wasm';

export const pdfiumWasmFile = _pdfiumWasm;
