import { PdfActionObject, PdfZoomMode } from '@unionpdf/models';
import { PdfDestinationObject } from '@unionpdf/models';
import {
  PdfBookmarkObject,
  PdfDocumentObject,
  PdfEngine,
  PdfError,
  PdfPageObject,
  PdfActionType,
  Rect,
  Rotation,
} from '@unionpdf/models';
import { WasmModule } from './wasm';
import { WasmModuleWrapper, wrap } from './wrapper';
import { readString } from './helper';

export type PdfiumPdfDocumentObject = PdfDocumentObject<number>;

export class PdfiumEngine implements PdfEngine<number> {
  wasmModuleWrapper: WasmModuleWrapper;

  constructor(private wasmModule: WasmModule) {
    this.wasmModuleWrapper = wrap(wasmModule);
  }

  initialize() {
    this.wasmModuleWrapper.PDFium_Init();
  }

  destroy() {
    this.wasmModuleWrapper.FPDF_DestroyLibrary();
  }

  open(
    arrayBuffer: ArrayBuffer,
    signal?: AbortSignal
  ): PdfiumPdfDocumentObject {
    const array = new Uint8Array(arrayBuffer);
    const length = array.length;
    const ptr = this.wasmModuleWrapper.malloc(length);
    this.wasmModule.HEAPU8.set(array, ptr);

    const doc = this.wasmModuleWrapper.FPDF_LoadMemDocument(ptr, length, '');
    if (this.wasmModuleWrapper.FPDF_GetLastError()) {
      this.wasmModuleWrapper.free(ptr);
      throw new PdfError('');
    }

    const pageCount = this.wasmModuleWrapper.FPDF_GetPageCount(doc);

    const pages: PdfPageObject[] = [];
    const width = this.wasmModuleWrapper.malloc(8);
    const height = this.wasmModuleWrapper.malloc(8);
    for (let index = 0; index < pageCount; index++) {
      const result = this.wasmModuleWrapper.FPDF_GetPageSizeByIndex(
        doc,
        index,
        width,
        height
      );
      if (result === 0) {
        this.wasmModuleWrapper.free(ptr);
        this.wasmModuleWrapper.free(width);
        this.wasmModuleWrapper.free(height);
        throw new PdfError('');
      }

      const page = {
        index,
        size: {
          width: this.wasmModule.getValue(width, 'double'),
          height: this.wasmModule.getValue(height, 'double'),
        },
      };

      pages.push(page);
    }
    this.wasmModuleWrapper.free(width);
    this.wasmModuleWrapper.free(height);

    return {
      id: doc,
      pageCount,
      pages,
    };
  }

  getBookmarks(doc: PdfiumPdfDocumentObject, signal?: AbortSignal) {
    const bookmarks = this.readPdfBookmarks(doc.id, 0);
    return {
      bookmarks,
    };
  }

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
    this.wasmModuleWrapper.FPDF_CloseDocument(pdf.id);
    this.wasmModuleWrapper.free(pdf.id);
  }

  readPdfBookmarks(docPtr: number, rootBookmarkPtr = 0) {
    let bookmarkPtr = this.wasmModuleWrapper.FPDFBookmark_GetFirstChild(
      docPtr,
      rootBookmarkPtr
    );

    const bookmarks: PdfBookmarkObject[] = [];
    while (bookmarkPtr) {
      const bookmark = this.readPdfBookmark(docPtr, bookmarkPtr);
      bookmarks.push(bookmark);

      const nextBookmarkPtr =
        this.wasmModuleWrapper.FPDFBookmark_GetNextSibling(docPtr, bookmarkPtr);

      this.wasmModuleWrapper.free(bookmarkPtr);

      bookmarkPtr = nextBookmarkPtr;
    }

    return bookmarks;
  }

  private readPdfBookmark(
    docPtr: number,
    bookmarkPtr: number
  ): PdfBookmarkObject {
    const defaultLength = 100;
    let buffer = this.wasmModuleWrapper.malloc(defaultLength);
    const actualLength = this.wasmModuleWrapper.FPDFBookmark_GetTitle(
      bookmarkPtr,
      buffer,
      defaultLength
    );
    if (actualLength > defaultLength) {
      this.wasmModuleWrapper.free(buffer);
      buffer = this.wasmModuleWrapper.malloc(actualLength);
      this.wasmModuleWrapper.FPDFBookmark_GetTitle(
        bookmarkPtr,
        buffer,
        defaultLength
      );
    }
    const title = this.wasmModule.UTF16ToString(buffer);
    this.wasmModuleWrapper.free(buffer);

    const bookmarks = this.readPdfBookmarks(docPtr, bookmarkPtr);

    const actionPtr =
      this.wasmModuleWrapper.FPDFBookmark_GetAction(bookmarkPtr);
    if (!actionPtr) {
      const action = this.readPdfAction(docPtr, actionPtr);
      return {
        title,
        target: {
          type: 'action',
          action,
        },
        children: bookmarks,
      };
    } else {
      const destinationPtr = this.wasmModuleWrapper.FPDFBookmark_GetDest(
        docPtr,
        bookmarkPtr
      );
      const destination = this.readPdfDestination(docPtr, destinationPtr);
      return {
        title,
        target: {
          type: 'destination',
          destination,
        },
        children: bookmarks,
      };
    }
  }

  private readPdfAction(docPtr: number, actionPtr: number): PdfActionObject {
    const actionType = this.wasmModuleWrapper.FPDFAction_GetType(
      actionPtr
    ) as PdfActionType;
    switch (actionType) {
      case PdfActionType.Unsupported:
        return {
          type: PdfActionType.Unsupported,
        };
      case PdfActionType.Goto: {
        const destinationPtr = this.wasmModuleWrapper.FPDFAction_GetDest(
          docPtr,
          actionPtr
        );
        const destination = this.readPdfDestination(docPtr, destinationPtr);
        return {
          type: PdfActionType.Goto,
          destination,
        };
      }
      case PdfActionType.RemoteGoto: {
        // In case of remote goto action,
        // the application should first use FPDFAction_GetFilePath
        // to get file path, then load that particular document,
        // and use its document handle to call this
        return {
          type: PdfActionType.Unsupported,
        };
      }
      case PdfActionType.URI: {
        const uri = readString(
          this.wasmModuleWrapper,
          (buffer, bufferLength) => {
            return this.wasmModuleWrapper.FPDFAction_GetURIPath(
              actionPtr,
              buffer,
              bufferLength
            );
          },
          this.wasmModuleWrapper.UTF16ToString
        );
        return {
          type: PdfActionType.URI,
          uri,
        };
      }
      case PdfActionType.LaunchAppOrOpenFile: {
        const path = readString(
          this.wasmModuleWrapper,
          (buffer, bufferLength) => {
            return this.wasmModuleWrapper.FPDFAction_GetFilePath(
              actionPtr,
              buffer,
              bufferLength
            );
          },
          this.wasmModuleWrapper.UTF16ToString
        );
        return {
          type: PdfActionType.LaunchAppOrOpenFile,
          path,
        };
      }
    }
  }

  private readPdfDestination(
    docPtr: number,
    destinationPtr: number
  ): PdfDestinationObject {
    const pageIndex = this.wasmModuleWrapper.FPDFDest_GetDestPageIndex(
      docPtr,
      destinationPtr
    );
    // Every params is a float value
    const paramsCountPtr = this.wasmModuleWrapper.malloc(4);
    const paramsPtr = this.wasmModuleWrapper.malloc(4 * 4);
    const zoomMode = this.wasmModuleWrapper.FPDFDest_GetView(
      destinationPtr,
      paramsCountPtr,
      paramsPtr
    ) as PdfZoomMode;
    const paramsCount = this.wasmModule.getValue(paramsCountPtr, 'i32');
    const params: number[] = [];
    for (let i = 0; i < paramsCount; i++) {
      const paramPtr = paramsPtr + i * 4;
      params.push(this.wasmModule.getValue(paramPtr, 'float'));
    }
    this.wasmModuleWrapper.free(paramsCount);
    this.wasmModuleWrapper.free(paramsPtr);

    return {
      pageIndex,
      zoom: {
        mode: zoomMode,
        params,
      },
    };
  }
}
