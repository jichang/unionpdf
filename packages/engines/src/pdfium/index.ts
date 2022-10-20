import {
  PdfAnnotationObject,
  PdfDocumentObject,
  PdfEngine,
  PdfEngineFeature,
  PdfEngineFunResult,
  PdfEngineOperation,
  PdfError,
  PdfOutlinesObject,
  PdfPageObject,
  PdfSource,
  Rect,
  Rotation,
} from '@unionpdf/models';
import { create } from './pdfium';
import { ModuleInit, WasmModule } from './wasm';
import { wrap } from './wrapper';

export type PdfiumPdfDocumentObject = PdfDocumentObject<number>;

export class PdfiumEngine implements PdfEngine<number> {
  wasm: WasmModule | undefined;
  wrapper: ReturnType<typeof wrap> | undefined;

  async initialize(init: Omit<ModuleInit, 'onRuntimeInitialized'>) {
    const { wasmBinary } = init;
    return new Promise((resolve) => {
      this.wasm = create({
        wasmBinary,
        onRuntimeInitialized: () => {
          this.wrapper = wrap(this.wasm!);
          this.wrapper?.PDFium_Init();
          resolve(true);
        },
      });
    });
  }

  destroy() {
    const { wrapper } = this.access();
    wrapper.FPDF_DestroyLibrary();
  }

  open(
    arrayBuffer: ArrayBuffer,
    signal?: AbortSignal
  ): PdfiumPdfDocumentObject {
    const { wasm, wrapper } = this.access();

    console.log(wasm, wrapper);

    const array = new Uint8Array(arrayBuffer);
    const length = array.length;
    const ptr = wrapper.malloc(length);
    wasm.HEAPU8.set(array, ptr);

    const doc = wrapper.FPDF_LoadMemDocument(ptr, length, '');
    if (wrapper.FPDF_GetLastError()) {
      wrapper.free(ptr);
      throw new PdfError('');
    }

    const pageCount = wrapper.FPDF_GetPageCount(doc);

    const pages: PdfPageObject[] = [];
    const width = wrapper.malloc(8);
    const height = wrapper.malloc(8);
    for (let index = 0; index < pageCount; index++) {
      const result = wrapper.FPDF_GetPageSizeByIndex(doc, index, width, height);
      if (result === 0) {
        wrapper.free(ptr);
        wrapper.free(width);
        wrapper.free(height);
        throw new PdfError('');
      }

      const page = {
        index,
        size: {
          width: wasm.getValue(width, 'double'),
          height: wasm.getValue(height, 'double'),
        },
      };

      pages.push(page);
    }
    wrapper.free(width);
    wrapper.free(height);

    return {
      id: ptr,
      pageCount,
      pages,
    };
  }

  // @ts-ignore
  getOutlines(doc: PdfiumPdfDocumentObject, signal: AbortSignal) {}

  // @ts-ignore
  renderPage(
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    rect?: Rect | undefined,
    signal?: AbortSignal | undefined
  ) {}

  // @ts-ignore
  getPageAnnotations(page: PdfPageObject, signal?: AbortSignal | undefined) {}

  // @ts-ignore
  renderThumbnail(
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    signal?: AbortSignal | undefined
  ) {}

  close(pdf: PdfiumPdfDocumentObject, signal?: AbortSignal | undefined) {
    const { wasm, wrapper } = this.access();
    wrapper.FPDF_CloseDocument(pdf.id);
    wrapper.free(pdf.id);
  }

  access() {
    if (!this.wasm || !this.wrapper) {
      throw new Error('invalid wasm call');
    }

    return {
      wasm: this.wasm,
      wrapper: this.wrapper,
    };
  }
}
