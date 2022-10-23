import { WasmModule } from './wasm';
import { wrap } from './wrapper';

describe('wrap', () => {
  it('should return module with cwrap function', () => {
    const fakeModule = {
      cwrap: (identity: any, returnType: any, argTypes: any) => {
        return {
          identity,
          returnType,
          argTypes,
        };
      },
    } as unknown as WasmModule;

    const result = wrap(fakeModule);
    expect(result).toEqual({
      FPDFBookmark_GetFirstChild: {
        argTypes: ['number', 'number'],
        identity: 'FPDFBookmark_GetFirstChild',
        returnType: 'number',
      },
      FPDFBookmark_GetNextSibling: {
        argTypes: ['number', 'number'],
        identity: 'FPDFBookmark_GetNextSibling',
        returnType: 'number',
      },
      FPDF_Bitmap_CreateEx: {
        argTypes: ['number', 'number', 'number', 'number', 'number'],
        identity: 'FPDFBitmap_CreateEx',
        returnType: 'number',
      },
      FPDF_Bitmap_Destroy: {
        argTypes: ['number'],
        identity: 'FPDFBitmap_Destroy',
        returnType: '',
      },
      FPDF_Bitmap_FillRect: {
        argTypes: ['number', 'number', 'number', 'number', 'number', 'number'],
        identity: 'FPDFBitmap_FillRect',
        returnType: '',
      },
      FPDF_CloseDocument: {
        argTypes: ['number'],
        identity: 'FPDF_CloseDocument',
        returnType: '',
      },
      FPDF_ClosePage: {
        argTypes: ['number'],
        identity: 'FPDF_ClosePage',
        returnType: '',
      },
      FPDF_DestroyLibrary: {
        argTypes: [],
        identity: 'FPDF_DestroyLibrary',
        returnType: '',
      },
      FPDF_GetLastError: {
        argTypes: [],
        identity: 'FPDF_GetLastError',
        returnType: 'number',
      },
      FPDF_GetPageCount: {
        argTypes: ['number'],
        identity: 'FPDF_GetPageCount',
        returnType: 'number',
      },
      FPDF_GetPageSizeByIndex: {
        argTypes: ['number', 'number', 'number', 'number'],
        identity: 'FPDF_GetPageSizeByIndex',
        returnType: 'number',
      },
      FPDF_LoadMemDocument: {
        argTypes: ['number', 'number', 'string'],
        identity: 'FPDF_LoadMemDocument',
        returnType: 'number',
      },
      FPDF_LoadPage: {
        argTypes: ['number', 'number'],
        identity: 'FPDF_LoadPage',
        returnType: 'number',
      },
      FPDF_RenderPageBitmap: {
        argTypes: [
          'number',
          'number',
          'number',
          'number',
          'number',
          'number',
          'number',
          'number',
        ],
        identity: 'FPDF_RenderPageBitmap',
        returnType: '',
      },
      FPDFBookmark_GetTitle: {
        argTypes: ['number', 'number', 'number'],
        identity: 'FPDFBookmark_GetTitle',
        returnType: 'number',
      },
      FPDFAction_GetType: {
        argTypes: ['number'],
        identity: 'FPDFAction_GetType',
        returnType: 'number',
      },
      FPDFAction_GetFilePath: {
        argTypes: ['number', 'number', 'number'],
        identity: 'FPDFAction_GetFilePath',
        returnType: 'number',
      },
      FPDFAction_GetURIPath: {
        argTypes: ['number', 'number', 'number'],
        identity: 'FPDFAction_GetURIPath',
        returnType: 'number',
      },
      FPDFBookmark_GetAction: {
        argTypes: ['number'],
        identity: 'FPDFBookmark_GetAction',
        returnType: 'number',
      },
      FPDFBookmark_GetDest: {
        argTypes: ['number', 'number'],
        identity: 'FPDFBookmark_GetDest',
        returnType: 'number',
      },
      FPDFDest_GetDestPageIndex: {
        argTypes: ['number', 'number'],
        identity: 'FPDFDest_GetDestPageIndex',
        returnType: 'number',
      },
      FPDFDest_GetView: {
        argTypes: ['number', 'number', 'number'],
        identity: 'FPDFDest_GetView',
        returnType: 'number',
      },
      PDFium_Init: {
        argTypes: [],
        identity: 'PDFium_Init',
        returnType: '',
      },
      free: {
        argTypes: ['number'],
        identity: 'malloc',
        returnType: '',
      },
      malloc: {
        argTypes: ['number'],
        identity: 'malloc',
        returnType: 'number',
      },
      AsciiToString: {
        argTypes: ['number'],
        identity: 'AsciiToString',
        returnType: 'string',
      },
      UTF8ToString: {
        argTypes: ['number'],
        identity: 'UTF8ToString',
        returnType: 'string',
      },
      UTF16ToString: {
        argTypes: ['number'],
        identity: 'UTF16ToString',
        returnType: 'string',
      },
      UTF32ToString: {
        argTypes: ['number'],
        identity: 'UTF32ToString',
        returnType: 'string',
      },
      FPDFAction_GetDest: {
        argTypes: ['number', 'number'],
        identity: 'FPDFAction_GetDest',
        returnType: 'number',
      },
    });
  });
});
