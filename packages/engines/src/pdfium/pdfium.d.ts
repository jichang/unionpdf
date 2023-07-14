import { Module, ModuleRuntimeMethods } from './emscripten';

export interface PdfiumModule extends Module, ModuleRuntimeMethods {}

/**
 * Create an instance of pdfium wasm module
 * @param init - override pdfium methods
 */
export default function createPdfiumModule(
  init: Partial<PdfiumModule>,
): Promise<PdfiumModule>;
