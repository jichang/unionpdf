/// <reference types="emscripten" />

export interface PdfiumModule extends EmscriptenModule {}

/**
 * Create an instance of pdfium wasm module
 * @param init - override pdfium methods
 */
export default function createPdfium<T>(
  init: Partial<PdfiumModule>,
): Promise<PdfiumModule & T>;
