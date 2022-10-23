import type { WasmModule } from './wasm';

export type WasmModuleWrapper = ReturnType<typeof wrap>;

export function wrap(wasm: WasmModule) {
  return {
    malloc: wasm.cwrap('malloc', 'number', ['number'] as const),
    free: wasm.cwrap('malloc', '', ['number'] as const),
    UTF8ToString: wasm.cwrap('UTF8ToString', 'string', ['number'] as const),
    UTF16ToString: wasm.cwrap('UTF16ToString', 'string', ['number'] as const),
    UTF32ToString: wasm.cwrap('UTF32ToString', 'string', ['number'] as const),
    AsciiToString: wasm.cwrap('AsciiToString', 'string', ['number'] as const),
    PDFium_Init: wasm.cwrap('PDFium_Init', '', [] as const),
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
    FPDFBookmark_GetFirstChild: wasm.cwrap(
      'FPDFBookmark_GetFirstChild',
      'number',
      ['number', 'number'] as const
    ),
    FPDFBookmark_GetNextSibling: wasm.cwrap(
      'FPDFBookmark_GetNextSibling',
      'number',
      ['number', 'number'] as const
    ),
    FPDFBookmark_GetTitle: wasm.cwrap('FPDFBookmark_GetTitle', 'number', [
      'number',
      'number',
      'number',
    ] as const),
    FPDFBookmark_GetAction: wasm.cwrap('FPDFBookmark_GetAction', 'number', [
      'number',
    ] as const),
    FPDFBookmark_GetDest: wasm.cwrap('FPDFBookmark_GetDest', 'number', [
      'number',
      'number',
    ] as const),
    FPDFAction_GetType: wasm.cwrap('FPDFAction_GetType', 'number', [
      'number',
    ] as const),
    FPDFAction_GetFilePath: wasm.cwrap('FPDFAction_GetFilePath', 'number', [
      'number',
      'number',
      'number',
    ] as const),
    FPDFAction_GetDest: wasm.cwrap('FPDFAction_GetDest', 'number', [
      'number',
      'number',
    ] as const),
    FPDFAction_GetURIPath: wasm.cwrap('FPDFAction_GetURIPath', 'number', [
      'number',
      'number',
      'number',
    ] as const),
    FPDFDest_GetDestPageIndex: wasm.cwrap(
      'FPDFDest_GetDestPageIndex',
      'number',
      ['number', 'number'] as const
    ),
    FPDFDest_GetView: wasm.cwrap('FPDFDest_GetView', 'number', [
      'number',
      'number',
      'number',
    ] as const),
    FPDF_LoadPage: wasm.cwrap('FPDF_LoadPage', 'number', [
      'number',
      'number',
    ] as const),
    FPDF_ClosePage: wasm.cwrap('FPDF_ClosePage', '', ['number'] as const),
  };
}
