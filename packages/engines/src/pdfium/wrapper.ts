import { WasmModule } from './wasm';

export function wrap(wasm: WasmModule) {
  return {
    malloc: wasm.cwrap('malloc', 'number', ['number'] as const),
    free: wasm.cwrap('malloc', '', ['number'] as const),
    PDFium_Init: wasm.cwrap('PDFium_Init', '', []),
    FPDF_RenderPageBitmap: wasm.cwrap('FPDF_RenderPageBitmap', '', [
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
    ] as const),
    FPDF_Bitmap_FillRect: wasm.cwrap('FPDFBitmap_FillRect', '', [
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
    ] as const),
    FPDF_Bitmap_CreateEx: wasm.cwrap('FPDFBitmap_CreateEx', 'number', [
      'number',
      'number',
      'number',
      'number',
      'number',
    ] as const),
    FPDF_Bitmap_Destroy: wasm.cwrap('FPDFBitmap_Destroy', '', [
      'number',
    ] as const),

    FPDF_LoadPage: wasm.cwrap('FPDF_LoadPage', 'number', [
      'number',
      'number',
    ] as const),
    FPDF_ClosePage: wasm.cwrap('FPDF_ClosePage', '', ['number'] as const),
    FPDF_LoadMemDocument: wasm.cwrap('FPDF_LoadMemDocument', 'number', [
      'number',
      'number',
      'string',
    ] as const),
    FPDF_GetPageSizeByIndex: wasm.cwrap('FPDF_GetPageSizeByIndex', 'number', [
      'number',
      'number',
      'number',
      'number',
    ] as const),
    FPDF_GetLastError: wasm.cwrap('FPDF_GetLastError', 'number', [] as const),
    FPDF_GetPageCount: wasm.cwrap('FPDF_GetPageCount', 'number', [
      'number',
    ] as const),
    FPDF_CloseDocument: wasm.cwrap('FPDF_CloseDocument', '', [
      'number',
    ] as const),
    FPDF_DestroyLibrary: wasm.cwrap('FPDF_DestroyLibrary', '', [] as const),
  };
}
