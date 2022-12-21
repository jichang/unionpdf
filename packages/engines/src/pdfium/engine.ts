import {
  calculateSize,
  PdfActionObject,
  PdfAnnotationObject,
  PdfTextRectObject,
  PdfAnnotationSubtype,
  PdfLinkAnnoObject,
  PdfWidgetAnnoObject,
  PdfLinkTarget,
  PdfZoomMode,
  TaskBase,
  Logger,
  NoopLogger,
  SearchResult,
  SearchTarget,
  Task,
  MatchFlag,
  compareSearchTarge,
  PdfDestinationObject,
  PdfBookmarkObject,
  PdfDocumentObject,
  PdfEngine,
  PdfPageObject,
  PdfActionType,
  Rotation,
  PDF_FORM_FIELD_FLAG,
  PDF_FORM_FIELD_TYPE,
  PdfWidgetAnnoOption,
} from '@unionpdf/models';
import { WrappedModule, wrap } from './wrapper';
import { readString } from './helper';
import { PdfiumModule } from './pdfium';

export enum BitmapFormat {
  Bitmap_Gray = 1,
  Bitmap_BGR = 2,
  Bitmap_BGRx = 3,
  Bitmap_BGRA = 4,
}

export enum RenderFlag {
  ANNOT = 0x01, // Set if annotations are to be rendered.
  LCD_TEXT = 0x02, // Set if using text rendering optimized for LCD display.
  NO_NATIVETEXT = 0x04, // Don't use the native text output available on some platforms
  GRAYSCALE = 0x08, // Grayscale output.
  DEBUG_INFO = 0x80, // Set if you want to get some debug info. Please discuss with Foxit first if you need to collect debug info.
  NO_CATCH = 0x100, // Set if you don't want to catch exception.
  RENDER_LIMITEDIMAGECACHE = 0x200, // Limit image cache size.
  RENDER_FORCEHALFTONE = 0x400, // Always use halftone for image stretching.
  PRINTING = 0x800, // Render for printing.
  REVERSE_BYTE_ORDER = 0x10, // Set whether render in a reverse Byte order, this flag only.
}

export const DPR = self.devicePixelRatio || 1;

export const wrappedModuleMethods = {
  UTF8ToString: [['number'] as const, 'string' as const] as const,
  UTF16ToString: [['number'] as const, 'string'] as const,
  UTF32ToString: [['number'] as const, 'string'] as const,
  AsciiToString: [['number'] as const, 'string'] as const,
  PDFium_Init: [[] as const, ''] as const,
  PDFium_OpenFileWriter: [[] as const, 'number'] as const,
  PDFium_CloseFileWriter: [['number'] as const, ''] as const,
  PDFium_GetFileWriterSize: [['number'] as const, 'number'] as const,
  PDFium_GetFileWriterData: [
    ['number', 'number', 'number'] as const,
    '',
  ] as const,
  PDFium_OpenFormFillInfo: [[] as const, 'number'] as const,
  PDFium_CloseFormFillInfo: [['number'] as const, ''] as const,
  PDFium_InitFormFillEnvironment: [
    ['number', 'number'] as const,
    'number',
  ] as const,
  PDFium_ExitFormFillEnvironment: [['number'] as const, 'number'] as const,
  PDFium_SaveAsCopy: [['number', 'number'] as const, ''] as const,
  FPDF_LoadMemDocument: [
    ['number', 'number', 'string'] as const,
    'number' as const,
  ] as const,
  FPDF_GetPageSizeByIndexF: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDF_GetLastError: [[] as const, 'number'] as const,
  FPDF_GetPageCount: [['number'] as const, 'number'] as const,
  FPDF_CloseDocument: [['number'] as const, ''] as const,
  FPDF_DestroyLibrary: [[] as const, ''] as const,
  FPDF_GetMetaText: [
    ['number', 'string', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFBitmap_FillRect: [
    ['number', 'number', 'number', 'number', 'number', 'number'] as const,
    '',
  ] as const,
  FPDFBitmap_CreateEx: [
    ['number', 'number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFBitmap_Destroy: [['number'] as const, ''] as const,
  FPDFBookmark_GetFirstChild: [
    ['number', 'number'] as const,
    'number',
  ] as const,
  FPDFBookmark_GetNextSibling: [
    ['number', 'number'] as const,
    'number',
  ] as const,
  FPDFBookmark_Find: [['number', 'string'] as const, 'number'] as const,
  FPDFBookmark_GetTitle: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFBookmark_GetAction: [['number'] as const, 'number'] as const,
  FPDFBookmark_GetDest: [['number', 'number'] as const, 'number'] as const,
  FPDFAction_GetType: [['number'] as const, 'number'] as const,
  FPDFAction_GetFilePath: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAction_GetDest: [['number', 'number'] as const, 'number'] as const,
  FPDFAction_GetURIPath: [
    ['number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFDest_GetDestPageIndex: [['number', 'number'] as const, 'number'] as const,
  FPDFDest_GetView: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFDest_GetLocationInPage: [
    [
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
    ] as const,
    'boolean',
  ] as const,
  FPDF_LoadPage: [['number', 'number'] as const, 'number'] as const,
  FPDF_RenderPageBitmap: [
    [
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
    ] as const,
    '',
  ] as const,
  FPDF_PageToDevice: [
    [
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
    ] as const,
    '',
  ] as const,
  FPDF_DeviceToPage: [
    [
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
    ] as const,
    'boolean',
  ] as const,
  FPDFPage_GetAnnotCount: [['number'] as const, 'number'] as const,
  FPDFPage_GetAnnot: [['number', 'number'] as const, 'number'] as const,
  FPDF_ClosePage: [['number'] as const, ''] as const,
  FPDFAnnot_GetSubtype: [['number'] as const, 'number'] as const,
  FPDFAnnot_GetRect: [['number', 'number'] as const, 'boolean'] as const,
  FPDFAnnot_GetLink: [['number'], 'number'] as const,
  FPDFAnnot_GetFormFieldType: [
    ['number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetFormFieldFlags: [
    ['number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetFormFieldName: [
    ['number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetFormFieldAlternateName: [
    ['number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetFormFieldValue: [
    ['number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetOptionCount: [['number', 'number'] as const, 'number'] as const,
  FPDFAnnot_GetOptionLabel: [
    ['number', 'number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_IsOptionSelected: [
    ['number', 'number', 'number'] as const,
    'boolean',
  ] as const,
  FPDFAnnot_IsChecked: [['number', 'number'] as const, 'boolean'] as const,
  FPDFLink_GetDest: [['number', 'number'] as const, 'number'] as const,
  FPDFLink_GetAction: [['number'] as const, 'number'] as const,
  FPDFText_LoadPage: [['number'] as const, 'number'] as const,
  FPDFText_CountChars: [['number'] as const, 'number'] as const,
  FPDFText_CountRects: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFText_GetRect: [
    ['number', 'number', 'number', 'number', 'number', 'number'],
    'boolean',
  ] as const,
  FPDFText_GetCharIndexAtPos: [
    ['number', 'number', 'number', 'number', 'number'],
    'number',
  ] as const,
  FPDFText_GetFontSize: [['number', 'number'], 'number'] as const,
  FPDFText_GetBoundedText: [
    ['number', 'number', 'number', 'number', 'number', 'number', 'number'],
    'number',
  ] as const,
  FPDFText_FindStart: [
    ['number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFText_FindNext: [['number'] as const, 'boolean'] as const,
  FPDFText_FindPrev: [['number'] as const, 'boolean'] as const,
  FPDFText_GetSchResultIndex: [['number'] as const, 'number'] as const,
  FPDFText_GetSchCount: [['number'] as const, 'number'] as const,
  FPDFText_FindClose: [['number'] as const, ''] as const,
  FPDFText_ClosePage: [['number'] as const, ''] as const,
  FPDFPage_CloseAnnot: [['number'] as const, ''] as const,
};

const LOG_SOURCE = 'PDFiumEngine';
const LOG_CATEGORY = 'Engine';

export interface SearchContext {
  target: SearchTarget;
  currPageIndex: number;
  startIndex: number; // -1 means reach the end
}

export class PdfiumEngine implements PdfEngine {
  wasmModuleWrapper: WrappedModule<typeof wrappedModuleMethods>;
  docs: Record<
    string,
    {
      filePtr: number;
      docPtr: number;
      searchContexts: Map<number, SearchContext>;
    }
  > = {};

  constructor(
    private wasmModule: PdfiumModule,
    private logger: Logger = new NoopLogger()
  ) {
    this.wasmModuleWrapper = wrap(wasmModule.cwrap, wrappedModuleMethods);
  }

  initialize() {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'initialize');
    this.wasmModuleWrapper.PDFium_Init();
    return TaskBase.resolve(true);
  }

  destroy() {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'destroy');
    this.wasmModuleWrapper.FPDF_DestroyLibrary();
    return TaskBase.resolve(true);
  }

  openDocument(id: string, arrayBuffer: ArrayBuffer) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'openDocument', arguments);
    const array = new Uint8Array(arrayBuffer);
    const length = array.length;
    const filePtr = this.malloc(length);
    this.wasmModule.HEAPU8.set(array, filePtr);

    const docPtr = this.wasmModuleWrapper.FPDF_LoadMemDocument(
      filePtr,
      length,
      ''
    );
    const lastError = this.wasmModuleWrapper.FPDF_GetLastError();
    if (lastError) {
      this.logger.error(
        LOG_SOURCE,
        LOG_CATEGORY,
        `FPDF_LoadMemDocument failed with ${lastError}`
      );
      this.free(filePtr);
      return TaskBase.reject<PdfDocumentObject>(
        new Error(`FPDF_LoadMemDocument failed with ${lastError}`)
      );
    }

    const pageCount = this.wasmModuleWrapper.FPDF_GetPageCount(docPtr);

    const pages: PdfPageObject[] = [];
    const sizePtr = this.malloc(8);
    for (let index = 0; index < pageCount; index++) {
      const result = this.wasmModuleWrapper.FPDF_GetPageSizeByIndexF(
        docPtr,
        index,
        sizePtr
      );
      if (result === 0) {
        this.logger.error(
          LOG_SOURCE,
          LOG_CATEGORY,
          `FPDF_GetPageSizeByIndexF failed with ${lastError}`
        );
        this.free(sizePtr);
        this.wasmModuleWrapper.FPDF_CloseDocument(docPtr);
        this.free(filePtr);
        return TaskBase.reject<PdfDocumentObject>(
          new Error(`FPDF_GetPageSizeByIndexF failed with ${lastError}`)
        );
      }

      const page = {
        index,
        size: {
          width: this.wasmModule.getValue(sizePtr, 'float'),
          height: this.wasmModule.getValue(sizePtr + 4, 'float'),
        },
      };

      pages.push(page);
    }
    this.free(sizePtr);

    const pdfDoc = {
      id,
      pageCount,
      pages,
    };
    this.docs[id] = {
      filePtr,
      docPtr,
      searchContexts: new Map(),
    };

    return TaskBase.resolve(pdfDoc);
  }

  getMetadata(doc: PdfDocumentObject) {
    const { docPtr } = this.docs[doc.id];

    return TaskBase.resolve({
      title: this.readMetaText(docPtr, 'Title'),
      author: this.readMetaText(docPtr, 'Author'),
      subject: this.readMetaText(docPtr, 'Subject'),
      keywords: this.readMetaText(docPtr, 'Keywords'),
      producer: this.readMetaText(docPtr, 'Producer'),
      creator: this.readMetaText(docPtr, 'Creator'),
      creationDate: this.readMetaText(docPtr, 'CreationDate'),
      modificationDate: this.readMetaText(docPtr, 'ModDate'),
    });
  }

  getBookmarks(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getBookmarks', arguments);
    const { docPtr } = this.docs[doc.id];
    const bookmarks = this.readPdfBookmarks(docPtr, 0);
    return TaskBase.resolve({
      bookmarks,
    });
  }

  renderPage(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderPage', arguments);
    const { docPtr } = this.docs[doc.id];
    const format = BitmapFormat.Bitmap_BGRA;
    const bytesPerPixel = 4;
    const bitmapSize = calculateSize(page.size, scaleFactor * DPR, rotation);
    const bitmapHeapLength =
      bitmapSize.width * bitmapSize.height * bytesPerPixel;
    const bitmapHeapPtr = this.malloc(bitmapHeapLength);
    const bitmapPtr = this.wasmModuleWrapper.FPDFBitmap_CreateEx(
      bitmapSize.width,
      bitmapSize.height,
      format,
      bitmapHeapPtr,
      bitmapSize.width * bytesPerPixel
    );
    this.wasmModuleWrapper.FPDFBitmap_FillRect(
      bitmapPtr,
      0,
      0,
      bitmapSize.width,
      bitmapSize.height,
      0xffffffff
    );
    const flags = RenderFlag.REVERSE_BYTE_ORDER | RenderFlag.ANNOT;
    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, page.index);
    this.wasmModuleWrapper.FPDF_RenderPageBitmap(
      bitmapPtr,
      pagePtr,
      0,
      0,
      bitmapSize.width,
      bitmapSize.height,
      rotation,
      flags
    );
    this.wasmModuleWrapper.FPDFBitmap_Destroy(bitmapPtr);
    this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

    const array = new Uint8ClampedArray(bitmapHeapLength);
    const dataView = new DataView(array.buffer);
    for (let i = 0; i < bitmapHeapLength; i++) {
      dataView.setInt8(i, this.wasmModule.getValue(bitmapHeapPtr + i, 'i8'));
    }
    this.free(bitmapHeapPtr);

    const imageData = new ImageData(array, bitmapSize.width, bitmapSize.height);

    return TaskBase.resolve(imageData);
  }

  getPageAnnotations(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    signal?: AbortSignal | undefined
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageAnnotations',
      arguments
    );
    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, page.index);
    const textPagePtr = this.wasmModuleWrapper.FPDFText_LoadPage(pagePtr);

    const annotations = this.readPageAnnotations(
      page,
      docPtr,
      pagePtr,
      textPagePtr
    );

    this.wasmModuleWrapper.FPDFText_ClosePage(textPagePtr);
    this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

    return TaskBase.resolve(annotations);
  }

  getPageTextRects(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    signal?: AbortSignal | undefined
  ) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getPageTextRects', arguments);
    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, page.index);
    const textPagePtr = this.wasmModuleWrapper.FPDFText_LoadPage(pagePtr);

    const textRects = this.readPageTextRects(
      page,
      docPtr,
      pagePtr,
      textPagePtr
    );

    this.wasmModuleWrapper.FPDFText_ClosePage(textPagePtr);
    this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

    return TaskBase.resolve(textRects);
  }

  renderThumbnail(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderThumbnail', arguments);
    scaleFactor = Math.max(scaleFactor, 0.5);
    return this.renderPage(doc, page, scaleFactor, rotation);
  }

  saveAsCopy(doc: PdfDocumentObject) {
    const { docPtr } = this.docs[doc.id];

    const writerPtr = this.wasmModuleWrapper.PDFium_OpenFileWriter();
    this.wasmModuleWrapper.PDFium_SaveAsCopy(docPtr, writerPtr);
    const size = this.wasmModuleWrapper.PDFium_GetFileWriterSize(writerPtr);
    const dataPtr = this.malloc(size);
    this.wasmModuleWrapper.PDFium_GetFileWriterData(writerPtr, dataPtr, size);
    const buffer = new ArrayBuffer(size);
    const view = new DataView(buffer);
    for (let i = 0; i < size; i++) {
      view.setInt8(i, this.wasmModule.getValue(dataPtr + i, 'i8'));
    }
    this.free(dataPtr);
    this.wasmModuleWrapper.PDFium_CloseFileWriter(writerPtr);

    return TaskBase.resolve(buffer);
  }

  startSearch(doc: PdfDocumentObject, contextId: number): Task<boolean, Error> {
    return TaskBase.resolve(true);
  }

  searchNext(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget
  ): Task<SearchResult | undefined, Error> {
    if (!this.docs[doc.id]) {
      return TaskBase.reject<SearchResult | undefined>(
        new Error('document is not opened')
      );
    }

    const { keyword, flags } = target;
    const searchContext = this.setupSearchContext(
      doc,
      contextId,
      keyword,
      flags
    );

    if (searchContext.currPageIndex === doc.pageCount) {
      return TaskBase.resolve<SearchResult | undefined>(undefined);
    }

    const { docPtr } = this.docs[doc.id];
    let pageIndex = searchContext.currPageIndex;
    let startIndex = searchContext.startIndex;

    const length = 2 * (keyword.length + 1);
    const keywordPtr = this.malloc(length);
    this.wasmModule.stringToUTF16(keyword, keywordPtr, length);

    const flag = flags.reduce((flag: MatchFlag, currFlag: MatchFlag) => {
      return flag | currFlag;
    }, MatchFlag.None);

    while (pageIndex < doc.pageCount) {
      const result = this.searchTextInPage(
        docPtr,
        pageIndex,
        startIndex,
        keywordPtr,
        flag
      );
      if (result) {
        searchContext.currPageIndex = result.pageIndex;
        searchContext.startIndex = result.charIndex + result.charCount;
        this.free(keywordPtr);

        return TaskBase.resolve<SearchResult | undefined>(result);
      }

      pageIndex++;
      startIndex = 0;
      searchContext.currPageIndex = pageIndex;
      searchContext.startIndex = startIndex;
    }
    this.free(keywordPtr);

    return TaskBase.resolve<SearchResult | undefined>(undefined);
  }

  searchPrev(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget
  ): Task<SearchResult | undefined, Error> {
    if (!this.docs[doc.id]) {
      return TaskBase.reject<SearchResult | undefined>(
        new Error('document is not opened')
      );
    }

    const { keyword, flags } = target;
    const searchContext = this.setupSearchContext(
      doc,
      contextId,
      keyword,
      flags
    );

    if (searchContext.currPageIndex === -1) {
      return TaskBase.resolve<SearchResult | undefined>(undefined);
    }

    const { docPtr } = this.docs[doc.id];
    let pageIndex = searchContext.currPageIndex;
    let startIndex = searchContext.startIndex;

    const length = 2 * (keyword.length + 1);
    const keywordPtr = this.malloc(length);
    this.wasmModule.stringToUTF16(keyword, keywordPtr, length);

    const flag = target.flags.reduce((flag: MatchFlag, currFlag: MatchFlag) => {
      return flag | currFlag;
    }, MatchFlag.None);

    while (pageIndex < doc.pageCount) {
      const result = this.searchTextInPage(
        docPtr,
        pageIndex,
        startIndex,
        keywordPtr,
        flag
      );
      if (result) {
        searchContext.currPageIndex = pageIndex;
        searchContext.startIndex = result.charIndex + result.charCount;
        this.free(keywordPtr);

        return TaskBase.resolve<SearchResult | undefined>(result);
      }

      pageIndex--;
      startIndex = 0;
      searchContext.currPageIndex = pageIndex;
      searchContext.startIndex = startIndex;
    }

    this.free(keywordPtr);

    return TaskBase.resolve<SearchResult | undefined>(undefined);
  }

  stopSearch(doc: PdfDocumentObject, contextId: number): Task<boolean, Error> {
    const { searchContexts } = this.docs[doc.id];
    if (searchContexts) {
      searchContexts.delete(contextId);
    }

    return TaskBase.resolve(true);
  }

  closeDocument(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'closeDocument', arguments);
    const docData = this.docs[doc.id];
    if (!docData) {
      this.logger.error(
        LOG_SOURCE,
        LOG_CATEGORY,
        `can not close document ${doc.id}`
      );
      return TaskBase.reject<boolean>(
        new Error(`can not close document ${doc.id}`)
      );
    }

    const { docPtr, filePtr } = this.docs[doc.id];
    this.wasmModuleWrapper.FPDF_CloseDocument(docPtr);
    this.free(filePtr);
    delete this.docs[doc.id];
    return TaskBase.resolve(true);
  }

  malloc(size: number) {
    const ptr = this.wasmModule._malloc(size);
    for (let i = 0; i < size; i++) {
      this.wasmModule.HEAP8[ptr + i] = 0;
    }

    return ptr;
  }

  free(ptr: number) {
    this.wasmModule._free(ptr);
  }

  readMetaText(docPtr: number, key: string) {
    return readString(
      this.wasmModule,
      (buffer, bufferLength) => {
        return this.wasmModuleWrapper.FPDF_GetMetaText(
          docPtr,
          key,
          buffer,
          bufferLength
        );
      },
      this.wasmModule.UTF16ToString
    );
  }

  setupSearchContext(
    doc: PdfDocumentObject,
    contextId: number,
    keyword: string,
    flags: MatchFlag[]
  ): SearchContext {
    const { searchContexts } = this.docs[doc.id];
    let searchContext = searchContexts.get(contextId);
    if (
      searchContext &&
      compareSearchTarge(searchContext.target, { keyword, flags })
    ) {
      return searchContext;
    }

    const currPageIndex = 0;
    const startIndex = 0;
    searchContext = {
      currPageIndex,
      startIndex,
      target: {
        keyword,
        flags,
      },
    };
    searchContexts.set(contextId, searchContext);

    return searchContext;
  }

  searchTextInPage(
    docPtr: number,
    pageIndex: number,
    startIndex: number,
    keywordPtr: number,
    flag: number
  ) {
    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, pageIndex);
    const textPagePtr = this.wasmModuleWrapper.FPDFText_LoadPage(pagePtr);

    let result: SearchResult | undefined;
    const searchHandle = this.wasmModuleWrapper.FPDFText_FindStart(
      textPagePtr,
      keywordPtr,
      flag,
      startIndex
    );
    const found = this.wasmModuleWrapper.FPDFText_FindNext(searchHandle);
    if (found) {
      const charIndex =
        this.wasmModuleWrapper.FPDFText_GetSchResultIndex(searchHandle);
      const charCount =
        this.wasmModuleWrapper.FPDFText_GetSchCount(searchHandle);

      result = {
        pageIndex,
        charIndex,
        charCount,
      };
    }

    this.wasmModuleWrapper.FPDFText_FindClose(searchHandle);
    this.wasmModuleWrapper.FPDFText_ClosePage(textPagePtr);
    this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

    return result;
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

      bookmarkPtr = nextBookmarkPtr;
    }

    return bookmarks;
  }

  private readPdfBookmark(
    docPtr: number,
    bookmarkPtr: number
  ): PdfBookmarkObject {
    const title = readString(
      this.wasmModule,
      (buffer, bufferLength) => {
        return this.wasmModuleWrapper.FPDFBookmark_GetTitle(
          bookmarkPtr,
          buffer,
          bufferLength
        );
      },
      this.wasmModule.UTF16ToString
    );

    const bookmarks = this.readPdfBookmarks(docPtr, bookmarkPtr);

    const target = this.readPdfBookmarkTarget(
      docPtr,
      () => {
        return this.wasmModuleWrapper.FPDFBookmark_GetAction(bookmarkPtr);
      },
      () => {
        return this.wasmModuleWrapper.FPDFBookmark_GetDest(docPtr, bookmarkPtr);
      }
    );

    return {
      title,
      target,
      children: bookmarks,
    };
  }

  private readPageTextRects(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number
  ) {
    const rectsCount = this.wasmModuleWrapper.FPDFText_CountRects(
      textPagePtr,
      0,
      -1
    );

    const textRects: PdfTextRectObject[] = [];
    for (let i = 0; i < rectsCount; i++) {
      const topPtr = this.malloc(8);
      const leftPtr = this.malloc(8);
      const rightPtr = this.malloc(8);
      const bottomPtr = this.malloc(8);
      const isSucceed = this.wasmModuleWrapper.FPDFText_GetRect(
        textPagePtr,
        i,
        leftPtr,
        topPtr,
        rightPtr,
        bottomPtr
      );
      if (!isSucceed) {
        this.free(leftPtr);
        this.free(topPtr);
        this.free(rightPtr);
        this.free(bottomPtr);
        continue;
      }

      const left = this.wasmModule.getValue(leftPtr, 'double');
      const top = this.wasmModule.getValue(topPtr, 'double');
      const right = this.wasmModule.getValue(rightPtr, 'double');
      const bottom = this.wasmModule.getValue(bottomPtr, 'double');

      this.free(leftPtr);
      this.free(topPtr);
      this.free(rightPtr);
      this.free(bottomPtr);

      const deviceXPtr = this.malloc(4);
      const deviceYPtr = this.malloc(4);
      this.wasmModuleWrapper.FPDF_PageToDevice(
        pagePtr,
        0,
        0,
        page.size.width,
        page.size.height,
        0,
        left,
        top,
        deviceXPtr,
        deviceYPtr
      );
      const x = this.wasmModule.getValue(deviceXPtr, 'i32');
      const y = this.wasmModule.getValue(deviceYPtr, 'i32');
      this.free(deviceXPtr);
      this.free(deviceYPtr);

      const rect = {
        origin: {
          x,
          y,
        },
        size: {
          width: Math.ceil(Math.abs(right - left)),
          height: Math.ceil(Math.abs(top - bottom)),
        },
      };

      const utf16Length = this.wasmModuleWrapper.FPDFText_GetBoundedText(
        textPagePtr,
        left,
        top,
        right,
        bottom,
        0,
        0
      );
      const bytesCount = (utf16Length + 1) * 2; // include NIL
      const textBuffer = this.malloc(bytesCount);
      this.wasmModuleWrapper.FPDFText_GetBoundedText(
        textPagePtr,
        left,
        top,
        right,
        bottom,
        textBuffer,
        utf16Length
      );
      const content = this.wasmModule.UTF16ToString(textBuffer);
      this.free(textBuffer);

      const charIndex = this.wasmModuleWrapper.FPDFText_GetCharIndexAtPos(
        textPagePtr,
        left,
        top,
        1,
        1
      );
      if (charIndex < 0) {
        continue;
      }

      const fontSize = this.wasmModuleWrapper.FPDFText_GetFontSize(
        textPagePtr,
        charIndex
      );

      const textRect: PdfTextRectObject = {
        content,
        rect,
        font: {
          size: fontSize,
        },
      };

      textRects.push(textRect);
    }

    return textRects;
  }

  private readPageAnnotations(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number
  ) {
    const formFillInfoPtr = this.wasmModuleWrapper.PDFium_OpenFormFillInfo();
    const formHandle = this.wasmModuleWrapper.PDFium_InitFormFillEnvironment(
      docPtr,
      formFillInfoPtr
    );

    const annotationCount =
      this.wasmModuleWrapper.FPDFPage_GetAnnotCount(pagePtr);

    const annotations: PdfAnnotationObject[] = [];
    for (let i = 0; i < annotationCount; i++) {
      const annotation = this.readPageAnnotion(
        page,
        docPtr,
        pagePtr,
        textPagePtr,
        formHandle,
        i
      );
      if (annotation) {
        annotations.push(annotation);
      }
    }

    this.wasmModuleWrapper.PDFium_ExitFormFillEnvironment(formHandle);
    this.wasmModuleWrapper.PDFium_CloseFormFillInfo(formFillInfoPtr);

    return annotations;
  }

  private readPageAnnotion(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number,
    formHandle: number,
    index: number
  ) {
    const annotationPtr = this.wasmModuleWrapper.FPDFPage_GetAnnot(
      pagePtr,
      index
    );
    const subType = this.wasmModuleWrapper.FPDFAnnot_GetSubtype(
      annotationPtr
    ) as PdfAnnotationObject['type'];
    let annotation: PdfAnnotationObject | undefined;
    switch (subType) {
      case PdfAnnotationSubtype.LINK:
        {
          annotation = this.readPdfLinkAnno(
            page,
            docPtr,
            pagePtr,
            textPagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.WIDGET:
        {
          annotation = this.readPdfWidgetAnno(
            page,
            pagePtr,
            annotationPtr,
            formHandle,
            index
          );
        }
        break;
    }
    this.wasmModuleWrapper.FPDFPage_CloseAnnot(annotationPtr);

    return annotation;
  }

  private readPdfLinkAnno(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfLinkAnnoObject | undefined {
    const linkPtr = this.wasmModuleWrapper.FPDFAnnot_GetLink(annotationPtr);
    if (!linkPtr) {
      return;
    }

    const annoRect = this.readAnnoRect(annotationPtr);
    const { left, top, right, bottom } = annoRect;

    const deviceXPtr = this.malloc(4);
    const deviceYPtr = this.malloc(4);
    this.wasmModuleWrapper.FPDF_PageToDevice(
      pagePtr,
      0,
      0,
      page.size.width,
      page.size.height,
      0,
      left,
      top,
      deviceXPtr,
      deviceYPtr
    );
    const x = this.wasmModule.getValue(deviceXPtr, 'i32');
    const y = this.wasmModule.getValue(deviceYPtr, 'i32');
    this.free(deviceXPtr);
    this.free(deviceYPtr);

    const rect = {
      origin: {
        x,
        y,
      },
      size: {
        width: Math.abs(right - left),
        height: Math.abs(top - bottom),
      },
    };

    const utf16Length = this.wasmModuleWrapper.FPDFText_GetBoundedText(
      textPagePtr,
      left,
      top,
      right,
      bottom,
      0,
      0
    );
    const bytesCount = (utf16Length + 1) * 2; // include NIL
    const textBuffer = this.malloc(bytesCount);
    this.wasmModuleWrapper.FPDFText_GetBoundedText(
      textPagePtr,
      left,
      top,
      right,
      bottom,
      textBuffer,
      utf16Length
    );
    const text = this.wasmModule.UTF16ToString(textBuffer);
    this.free(textBuffer);

    const target = this.readPdfLinkAnnoTarget(
      docPtr,
      () => {
        return this.wasmModuleWrapper.FPDFLink_GetAction(linkPtr);
      },
      () => {
        return this.wasmModuleWrapper.FPDFLink_GetDest(docPtr, linkPtr);
      }
    );

    return {
      id: index,
      type: PdfAnnotationSubtype.LINK,
      text,
      target,
      rect,
    };
  }

  private readPdfWidgetAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    formHandle: number,
    index: number
  ): PdfWidgetAnnoObject | undefined {
    const annoRect = this.readAnnoRect(annotationPtr);
    const { left, top, right, bottom } = annoRect;

    const deviceXPtr = this.malloc(4);
    const deviceYPtr = this.malloc(4);
    this.wasmModuleWrapper.FPDF_PageToDevice(
      pagePtr,
      0,
      0,
      page.size.width,
      page.size.height,
      0,
      left,
      top,
      deviceXPtr,
      deviceYPtr
    );
    const x = this.wasmModule.getValue(deviceXPtr, 'i32');
    const y = this.wasmModule.getValue(deviceYPtr, 'i32');
    this.free(deviceXPtr);
    this.free(deviceYPtr);

    const rect = {
      origin: {
        x,
        y,
      },
      size: {
        width: Math.abs(right - left),
        height: Math.abs(top - bottom),
      },
    };

    const field = this.readPdfWidgetAnnoField(formHandle, annotationPtr);

    return {
      id: index,
      type: PdfAnnotationSubtype.WIDGET,
      rect,
      field,
    };
  }

  private readPdfBookmarkTarget(
    docPtr: number,
    getActionPtr: () => number,
    getDestinationPtr: () => number
  ): PdfLinkTarget | undefined {
    const actionPtr = getActionPtr();
    if (actionPtr) {
      const action = this.readPdfAction(docPtr, actionPtr);

      return {
        type: 'action',
        action,
      };
    } else {
      const destinationPtr = getDestinationPtr();
      if (destinationPtr) {
        const destination = this.readPdfDestination(docPtr, destinationPtr);

        return {
          type: 'destination',
          destination,
        };
      }
    }
  }

  private readPdfWidgetAnnoField(
    formHandle: number,
    annotationPtr: number
  ): PdfWidgetAnnoObject['field'] {
    const flag = this.wasmModuleWrapper.FPDFAnnot_GetFormFieldFlags(
      formHandle,
      annotationPtr
    ) as PDF_FORM_FIELD_FLAG;

    const type = this.wasmModuleWrapper.FPDFAnnot_GetFormFieldType(
      formHandle,
      annotationPtr
    ) as PDF_FORM_FIELD_TYPE;

    const name = readString(
      this.wasmModule,
      (buffer: number, bufferLength) => {
        return this.wasmModuleWrapper.FPDFAnnot_GetFormFieldName(
          formHandle,
          annotationPtr,
          buffer,
          bufferLength
        );
      },
      this.wasmModule.UTF16ToString
    );

    const alternateName = readString(
      this.wasmModule,
      (buffer: number, bufferLength) => {
        return this.wasmModuleWrapper.FPDFAnnot_GetFormFieldAlternateName(
          formHandle,
          annotationPtr,
          buffer,
          bufferLength
        );
      },
      this.wasmModule.UTF16ToString
    );

    const value = readString(
      this.wasmModule,
      (buffer: number, bufferLength) => {
        return this.wasmModuleWrapper.FPDFAnnot_GetFormFieldValue(
          formHandle,
          annotationPtr,
          buffer,
          bufferLength
        );
      },
      this.wasmModule.UTF16ToString
    );

    const options: PdfWidgetAnnoOption[] = [];
    if (
      type === PDF_FORM_FIELD_TYPE.COMBOBOX ||
      type === PDF_FORM_FIELD_TYPE.LISTBOX
    ) {
      const count = this.wasmModuleWrapper.FPDFAnnot_GetOptionCount(
        formHandle,
        annotationPtr
      );
      for (let i = 0; i < count; i++) {
        const label = readString(
          this.wasmModule,
          (buffer: number, bufferLength) => {
            return this.wasmModuleWrapper.FPDFAnnot_GetOptionLabel(
              formHandle,
              annotationPtr,
              i,
              buffer,
              bufferLength
            );
          },
          this.wasmModule.UTF16ToString
        );
        const isSelected = this.wasmModuleWrapper.FPDFAnnot_IsOptionSelected(
          formHandle,
          annotationPtr,
          i
        );
        options.push({
          label,
          isSelected,
        });
      }
    }

    let isChecked = false;
    if (type === PDF_FORM_FIELD_TYPE.CHECKBOX) {
      isChecked = this.wasmModuleWrapper.FPDFAnnot_IsChecked(
        formHandle,
        annotationPtr
      );
    }

    return {
      flag,
      type,
      name,
      alternateName,
      value,
      isChecked,
      options,
    };
  }

  private readPdfLinkAnnoTarget(
    docPtr: number,
    getActionPtr: () => number,
    getDestinationPtr: () => number
  ): PdfLinkTarget | undefined {
    const destinationPtr = getDestinationPtr();
    if (destinationPtr) {
      const destination = this.readPdfDestination(docPtr, destinationPtr);

      return {
        type: 'destination',
        destination,
      };
    } else {
      const actionPtr = getActionPtr();
      if (actionPtr) {
        const action = this.readPdfAction(docPtr, actionPtr);

        return {
          type: 'action',
          action,
        };
      }
    }
  }

  private readPdfAction(docPtr: number, actionPtr: number): PdfActionObject {
    const actionType = this.wasmModuleWrapper.FPDFAction_GetType(
      actionPtr
    ) as PdfActionType;
    let action: PdfActionObject;
    switch (actionType) {
      case PdfActionType.Unsupported:
        action = {
          type: PdfActionType.Unsupported,
        };
        break;
      case PdfActionType.Goto:
        {
          const destinationPtr = this.wasmModuleWrapper.FPDFAction_GetDest(
            docPtr,
            actionPtr
          );
          if (destinationPtr) {
            const destination = this.readPdfDestination(docPtr, destinationPtr);

            action = {
              type: PdfActionType.Goto,
              destination,
            };
          } else {
            action = {
              type: PdfActionType.Unsupported,
            };
          }
        }
        break;
      case PdfActionType.RemoteGoto:
        {
          // In case of remote goto action,
          // the application should first use FPDFAction_GetFilePath
          // to get file path, then load that particular document,
          // and use its document handle to call this
          action = {
            type: PdfActionType.Unsupported,
          };
        }
        break;
      case PdfActionType.URI:
        {
          const uri = readString(
            this.wasmModule,
            (buffer, bufferLength) => {
              return this.wasmModuleWrapper.FPDFAction_GetURIPath(
                docPtr,
                actionPtr,
                buffer,
                bufferLength
              );
            },
            this.wasmModule.AsciiToString
          );

          action = {
            type: PdfActionType.URI,
            uri,
          };
        }
        break;
      case PdfActionType.LaunchAppOrOpenFile:
        {
          const path = readString(
            this.wasmModule,
            (buffer, bufferLength) => {
              return this.wasmModuleWrapper.FPDFAction_GetFilePath(
                actionPtr,
                buffer,
                bufferLength
              );
            },
            this.wasmModule.UTF8ToString
          );
          action = {
            type: PdfActionType.LaunchAppOrOpenFile,
            path,
          };
        }
        break;
    }

    return action;
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
    const maxParmamsCount = 4;
    const paramsCountPtr = this.malloc(maxParmamsCount);
    const paramsPtr = this.malloc(maxParmamsCount * 4);
    const zoomMode = this.wasmModuleWrapper.FPDFDest_GetView(
      destinationPtr,
      paramsCountPtr,
      paramsPtr
    ) as PdfZoomMode;
    const paramsCount = this.wasmModule.getValue(paramsCountPtr, 'i32');
    const view: number[] = [];
    for (let i = 0; i < paramsCount; i++) {
      const paramPtr = paramsPtr + i * 4;
      view.push(this.wasmModule.getValue(paramPtr, 'float'));
    }
    this.free(paramsCountPtr);
    this.free(paramsPtr);

    if (zoomMode === PdfZoomMode.XYZ) {
      const hasXPtr = this.malloc(1);
      const hasYPtr = this.malloc(1);
      const hasZPtr = this.malloc(1);
      const xPtr = this.malloc(4);
      const yPtr = this.malloc(4);
      const zPtr = this.malloc(4);

      const isSucceed = this.wasmModuleWrapper.FPDFDest_GetLocationInPage(
        destinationPtr,
        hasXPtr,
        hasYPtr,
        hasZPtr,
        xPtr,
        yPtr,
        zPtr
      );
      if (isSucceed) {
        const hasX = this.wasmModule.getValue(hasXPtr, 'i8');
        const hasY = this.wasmModule.getValue(hasYPtr, 'i8');
        const hasZ = this.wasmModule.getValue(hasZPtr, 'i8');

        const x = !!hasX ? this.wasmModule.getValue(xPtr, 'float') : 0;
        const y = !!hasY ? this.wasmModule.getValue(yPtr, 'float') : 0;
        const zoom = !!hasZ ? this.wasmModule.getValue(zPtr, 'float') : 0;

        this.free(hasXPtr);
        this.free(hasYPtr);
        this.free(hasZPtr);
        this.free(xPtr);
        this.free(yPtr);
        this.free(zPtr);

        return {
          pageIndex,
          zoom: {
            mode: zoomMode,
            params: {
              x,
              y,
              zoom,
            },
          },
          view,
        };
      }

      this.free(hasXPtr);
      this.free(hasYPtr);
      this.free(hasZPtr);
      this.free(xPtr);
      this.free(yPtr);
      this.free(zPtr);

      return {
        pageIndex,
        zoom: {
          mode: zoomMode,
          params: {
            x: 0,
            y: 0,
            zoom: 0,
          },
        },
        view,
      };
    }

    return {
      pageIndex,
      zoom: {
        mode: zoomMode,
      },
      view,
    };
  }

  private readAnnoRect(annotationPtr: number) {
    const rectPtr = this.malloc(4 * 4);
    const rect = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
    if (this.wasmModuleWrapper.FPDFAnnot_GetRect(annotationPtr, rectPtr)) {
      rect.left = this.wasmModule.getValue(rectPtr, 'float');
      rect.top = this.wasmModule.getValue(rectPtr + 4, 'float');
      rect.right = this.wasmModule.getValue(rectPtr + 8, 'float');
      rect.bottom = this.wasmModule.getValue(rectPtr + 12, 'float');
    }
    this.free(rectPtr);

    return rect;
  }
}
