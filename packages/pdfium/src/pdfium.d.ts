import type { Module, ModuleRuntimeMethods } from '@types/emscripten';

export interface PdfiumModule extends Module, ModuleRuntimeMethods {}

/**
 * Create an instance of pdfium wasm module
 * @param init - override pdfium methods
 */
export default function createPdfium(
  init: Partial<PdfiumModule>,
): Promise<PdfiumModule>;
