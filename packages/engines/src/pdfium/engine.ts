import {
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
  compareSearchTarget,
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
  PdfFileAttachmentAnnoObject,
  Rect,
  PdfAttachmentObject,
  PdfUnsupportedAnnoObject,
  PdfTextAnnoObject,
  PdfPopupAnnoObject,
  PdfEngineError,
  PdfSignatureObject,
  PdfMetadataObject,
  PdfBookmarksObject,
  PdfRenderOptions,
  PdfInkAnnoObject,
  PdfInkListObject,
  Position,
  PdfStampAnnoObject,
  PdfCircleAnnoObject,
  PdfSquareAnnoObject,
  PdfFreeTextAnnoObject,
  PdfCaretAnnoObject,
  PdfSquigglyAnnoObject,
  PdfStrikeOutAnnoObject,
  PdfUnderlineAnnoObject,
  transformSize,
  PdfFile,
  PdfAnnotationObjectStatus,
  PdfAnnotationTransformation,
  PdfSegmentObject,
  AppearanceMode,
  PdfImageObject,
  PdfPageObjectType,
  PdfPathObject,
  PdfFormObject,
} from '@unionpdf/models';
import { WrappedModule, wrap } from './wrapper';
import { readArrayBuffer, readString } from './helper';
import { PdfiumModule } from './pdfium';
import { PdfPolygonAnnoObject } from '@unionpdf/models';
import { PdfPolylineAnnoObject } from '@unionpdf/models';
import { PdfLineAnnoObject } from '@unionpdf/models';
import { PdfHighlightAnnoObject } from '@unionpdf/models';

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
    ['number', 'number', 'number'] as const,
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
  FPDFBitmap_Create: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFBitmap_CreateEx: [
    ['number', 'number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFBitmap_GetBuffer: [['number'] as const, 'number'] as const,
  FPDFBitmap_GetWidth: [['number'] as const, 'number'] as const,
  FPDFBitmap_GetHeight: [['number'] as const, 'number'] as const,
  FPDFBitmap_GetFormat: [['number'] as const, 'number'] as const,
  FPDFBitmap_Destroy: [['number'] as const, ''] as const,
  FPDFPageObj_Destroy: [['number'] as const, ''] as const,
  FPDFPageObj_NewImageObj: [['number'] as const, 'number'] as const,
  FPDFPageObj_SetMatrix: [['number', 'number'] as const, 'boolean'] as const,
  FPDFPageObj_GetBounds: [
    ['number', 'number', 'number', 'number', 'number'] as const,
    'boolean',
  ] as const,
  FPDFPageObj_Transform: [
    [
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
  FPDFImageObj_SetBitmap: [
    ['number', 'number', 'number', 'number'] as const,
    'boolean',
  ] as const,
  FPDFImageObj_GetBitmap: [['number'] as const, 'number'] as const,
  FPDFPath_CountSegments: [['number'] as const, 'number'] as const,
  FPDFPath_GetPathSegment: [['number', 'number'] as const, 'number'] as const,
  FPDFPathSegment_GetType: [['number'] as const, 'number'] as const,
  FPDFPathSegment_GetPoint: [
    ['number', 'number', 'number'] as const,
    'boolean',
  ] as const,
  FPDFPathSegment_GetClose: [['number'] as const, 'boolean'] as const,
  FPDFFormObj_CountObjects: [['number'] as const, 'number'] as const,
  FPDFFormObj_GetObject: [['number', 'number'] as const, 'number'] as const,
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
  FPDFPage_CreateAnnot: [['number', 'number'] as const, 'number'] as const,
  FPDFPage_InsertObject: [['number', 'number'] as const, 'boolean'] as const,
  FPDFPage_RemoveAnnot: [['number', 'number'] as const, 'boolean'] as const,
  FPDFPage_GenerateContent: [['number'] as const, 'boolean'] as const,
  FPDF_ClosePage: [['number'] as const, ''] as const,
  FPDFAnnot_GetSubtype: [['number'] as const, 'number'] as const,
  FPDFAnnot_GetAP: [
    ['number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetObjectCount: [['number'] as const, 'number'] as const,
  FPDFAnnot_GetObject: [['number', 'number'] as const, 'number'] as const,
  FPDFAnnot_AppendObject: [['number', 'number'] as const, 'boolean'] as const,
  FPDFAnnot_GetRect: [['number', 'number'] as const, 'boolean'] as const,
  FPDFAnnot_SetRect: [['number', 'number'] as const, 'boolean'] as const,
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
  FPDFAnnot_GetStringValue: [
    ['number', 'string', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetColor: [
    ['number', 'number', 'number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetLinkedAnnot: [['number', 'string'] as const, 'number'] as const,
  FPDFAnnot_GetInkListCount: [['number'] as const, 'number'] as const,
  FPDFAnnot_GetInkListPath: [
    ['number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_AddInkStroke: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_RemoveInkList: [['number'] as const, 'boolean'] as const,
  FPDFAnnot_GetVertices: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAnnot_GetLine: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFPageObj_GetType: [['number'] as const, 'number'] as const,
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
  FPDFText_GetFontInfo: [
    ['number', 'number', 'number', 'number', 'number'],
    'number',
  ] as const,
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
  FPDFText_GetText: [
    ['number', 'number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFPage_CloseAnnot: [['number'] as const, ''] as const,
  FPDFDoc_GetAttachmentCount: [['number'] as const, 'number'] as const,
  FPDFDoc_GetAttachment: [['number', 'number'] as const, 'number'] as const,
  FPDFAttachment_GetName: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAttachment_GetStringValue: [
    ['number', 'string', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFAttachment_GetFile: [
    ['number', 'number', 'number', 'number'] as const,
    'boolean',
  ] as const,
  FPDF_GetSignatureCount: [['number'] as const, 'number'] as const,
  FPDF_GetSignatureObject: [['number', 'number'] as const, 'number'] as const,
  FPDFSignatureObj_GetContents: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFSignatureObj_GetByteRange: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFSignatureObj_GetSubFilter: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFSignatureObj_GetReason: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFSignatureObj_GetTime: [
    ['number', 'number', 'number'] as const,
    'number',
  ] as const,
  FPDFSignatureObj_GetDocMDPPermission: [
    ['number'] as const,
    'number',
  ] as const,
  FPDF_CreateNewDocument: [[] as const, 'number'] as const,
  FPDF_ImportPagesByIndex: [
    ['number', 'number', 'number', 'number', 'number'] as const,
    'boolean',
  ] as const,
  FPDF_ImportPages: [
    ['number', 'number', 'number', 'number'] as const,
    'boolean',
  ] as const,
};

const LOG_SOURCE = 'PDFiumEngine';
const LOG_CATEGORY = 'Engine';

export interface SearchContext {
  target: SearchTarget;
  currPageIndex: number;
  startIndex: number; // -1 means reach the end
}

export enum PdfiumErrorCode {
  Success = 0,
  Unknown = 1,
  File = 2,
  Format = 3,
  Password = 4,
  Security = 5,
  Page = 6,
  XFALoad = 7,
  XFALayout = 8,
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

  openDocument(file: PdfFile, password: string) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'openDocument', file, password);
    const array = new Uint8Array(file.content);
    const length = array.length;
    const filePtr = this.malloc(length);
    this.wasmModule.HEAPU8.set(array, filePtr);

    const passwordBytesSize = new TextEncoder().encode(password).length + 1;
    const passwordPtr = this.malloc(passwordBytesSize);
    this.wasmModule.stringToUTF8(password, passwordPtr, passwordBytesSize);

    const docPtr = this.wasmModuleWrapper.FPDF_LoadMemDocument(
      filePtr,
      length,
      passwordPtr
    );

    this.free(passwordPtr);

    if (!docPtr) {
      const lastError = this.wasmModuleWrapper.FPDF_GetLastError();
      this.logger.error(
        LOG_SOURCE,
        LOG_CATEGORY,
        `FPDF_LoadMemDocument failed with ${lastError}`
      );
      this.free(filePtr);

      return TaskBase.reject<PdfDocumentObject>(
        new PdfEngineError(
          `FPDF_LoadMemDocument failed with ${lastError}`,
          lastError
        )
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
        const lastError = this.wasmModuleWrapper.FPDF_GetLastError();
        this.logger.error(
          LOG_SOURCE,
          LOG_CATEGORY,
          `FPDF_GetPageSizeByIndexF failed with ${lastError}`
        );
        this.free(sizePtr);
        this.wasmModuleWrapper.FPDF_CloseDocument(docPtr);
        this.free(passwordPtr);
        this.free(filePtr);
        return TaskBase.reject<PdfDocumentObject>(
          new PdfEngineError(
            `FPDF_GetPageSizeByIndexF failed with ${lastError}`
          )
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
      id: file.id,
      name: file.name,
      pageCount,
      pages,
    };
    this.docs[file.id] = {
      filePtr,
      docPtr,
      searchContexts: new Map(),
    };

    return TaskBase.resolve(pdfDoc);
  }

  getMetadata(doc: PdfDocumentObject): Task<PdfMetadataObject, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getMetadata', doc);

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

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

  getSignatures(
    doc: PdfDocumentObject
  ): Task<PdfSignatureObject[], PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getSignatures', doc);

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const signatures: PdfSignatureObject[] = [];

    const count = this.wasmModuleWrapper.FPDF_GetSignatureCount(docPtr);
    for (let i = 0; i < count; i++) {
      const signatureObjPtr = this.wasmModuleWrapper.FPDF_GetSignatureObject(
        docPtr,
        i
      );

      const contents = readArrayBuffer(
        this.wasmModule,
        (buffer, bufferSize) => {
          return this.wasmModuleWrapper.FPDFSignatureObj_GetContents(
            signatureObjPtr,
            buffer,
            bufferSize
          );
        }
      );

      const byteRange = readArrayBuffer(
        this.wasmModule,
        (buffer, bufferSize) => {
          return (
            this.wasmModuleWrapper.FPDFSignatureObj_GetByteRange(
              signatureObjPtr,
              buffer,
              bufferSize
            ) * 4
          );
        }
      );

      const subFilter = readArrayBuffer(
        this.wasmModule,
        (buffer, bufferSize) => {
          return this.wasmModuleWrapper.FPDFSignatureObj_GetSubFilter(
            signatureObjPtr,
            buffer,
            bufferSize
          );
        }
      );

      const reason = readString(
        this.wasmModule,
        (buffer, bufferLength) => {
          return this.wasmModuleWrapper.FPDFSignatureObj_GetReason(
            signatureObjPtr,
            buffer,
            bufferLength
          );
        },
        this.wasmModule.UTF16ToString
      );

      const time = readString(
        this.wasmModule,
        (buffer, bufferLength) => {
          return this.wasmModuleWrapper.FPDFSignatureObj_GetTime(
            signatureObjPtr,
            buffer,
            bufferLength
          );
        },
        this.wasmModule.AsciiToString
      );

      const docMDP =
        this.wasmModuleWrapper.FPDFSignatureObj_GetDocMDPPermission(
          signatureObjPtr
        );

      signatures.push({
        contents,
        byteRange,
        subFilter,
        reason,
        time,
        docMDP,
      });
    }

    return TaskBase.resolve(signatures);
  }

  getBookmarks(
    doc: PdfDocumentObject
  ): Task<PdfBookmarksObject, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getBookmarks', doc);

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

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
    rotation: Rotation,
    options: PdfRenderOptions
  ): Task<ImageData, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderPage',
      doc,
      page,
      scaleFactor,
      rotation,
      options
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const imageData = this.renderPageRectToImageData(
      docPtr,
      page,
      {
        origin: { x: 0, y: 0 },
        size: page.size,
      },
      scaleFactor,
      rotation,
      options
    );
    return TaskBase.resolve(imageData);
  }

  renderPageRect(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    rect: Rect,
    options: PdfRenderOptions
  ): Task<ImageData, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderPageRect',
      doc,
      page,
      scaleFactor,
      rotation,
      rect,
      options
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const imageData = this.renderPageRectToImageData(
      docPtr,
      page,
      rect,
      scaleFactor,
      rotation,
      options
    );

    return TaskBase.resolve(imageData);
  }

  getPageAnnotations(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ): Task<PdfAnnotationObject[], PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageAnnotations',
      doc,
      page,
      scaleFactor,
      rotation
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, page.index);
    const textPagePtr = this.wasmModuleWrapper.FPDFText_LoadPage(pagePtr);

    const annotations = this.readPageAnnotations(
      page,
      docPtr,
      pagePtr,
      textPagePtr,
      scaleFactor,
      rotation
    );

    this.wasmModuleWrapper.FPDFText_ClosePage(textPagePtr);
    this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

    return TaskBase.resolve(annotations);
  }

  createPageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'createPageAnnotation',
      doc,
      page,
      annotation
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, page.index);
    const annotationPtr = this.wasmModuleWrapper.FPDFPage_CreateAnnot(
      pagePtr,
      annotation.type
    );
    if (!annotationPtr) {
      return TaskBase.reject(
        new PdfEngineError('can not create annotation with specified type')
      );
    }

    if (
      !this.setAnnotationRect(page, pagePtr, annotationPtr, annotation.rect)
    ) {
      this.wasmModuleWrapper.FPDFPage_CloseAnnot(annotationPtr);
      this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);
      return TaskBase.reject(
        new PdfEngineError('can not set the rect of the rect')
      );
    }

    let isSucceed = false;
    switch (annotation.type) {
      case PdfAnnotationSubtype.INK:
        isSucceed = this.addInkStroke(
          page,
          pagePtr,
          annotationPtr,
          annotation.inkList
        );
        break;
      case PdfAnnotationSubtype.STAMP:
        isSucceed = this.addStamp(
          docPtr,
          page,
          pagePtr,
          annotationPtr,
          annotation
        );
        break;
    }

    if (!isSucceed) {
      this.wasmModuleWrapper.FPDFPage_RemoveAnnot(pagePtr, annotationPtr);
      this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

      return TaskBase.reject(
        new PdfEngineError('can not add content of the annotation')
      );
    }

    this.wasmModuleWrapper.FPDFPage_GenerateContent(pagePtr);

    this.wasmModuleWrapper.FPDFPage_CloseAnnot(annotationPtr);
    this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

    return TaskBase.resolve(true);
  }

  transformPageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
    transformation: PdfAnnotationTransformation
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'transformPageAnnotation',
      doc,
      page,
      annotation,
      transformation
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];

    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, page.index);
    const annotationPtr = this.wasmModuleWrapper.FPDFPage_GetAnnot(
      pagePtr,
      annotation.id
    );
    const rect = {
      origin: {
        x: annotation.rect.origin.x + transformation.offset.x,
        y: annotation.rect.origin.y + transformation.offset.y,
      },
      size: {
        width: annotation.rect.size.width * transformation.scale.width,
        height: annotation.rect.size.height * transformation.scale.height,
      },
    };
    if (!this.setAnnotationRect(page, pagePtr, annotationPtr, rect)) {
      this.wasmModuleWrapper.FPDFPage_CloseAnnot(annotationPtr);
      this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);
      return TaskBase.reject(
        new PdfEngineError('can not set the rect of the annotation')
      );
    }

    switch (annotation.type) {
      case PdfAnnotationSubtype.INK:
        {
          if (!this.wasmModuleWrapper.FPDFAnnot_RemoveInkList(annotationPtr)) {
            this.wasmModuleWrapper.FPDFPage_CloseAnnot(annotationPtr);
            this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);
            return TaskBase.reject(
              new PdfEngineError('can not remove the ink list of annotation')
            );
          }
          const inkList = annotation.inkList.map((inkStroke) => {
            return {
              points: inkStroke.points.map((point) => {
                return {
                  x:
                    rect.origin.x +
                    (point.x - annotation.rect.origin.x) *
                      transformation.scale.width,
                  y:
                    rect.origin.y +
                    (point.y - annotation.rect.origin.y) *
                      transformation.scale.height,
                };
              }),
            };
          });
          if (!this.addInkStroke(page, pagePtr, annotationPtr, inkList)) {
            this.wasmModuleWrapper.FPDFPage_CloseAnnot(annotationPtr);
            this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);
            return TaskBase.reject(
              new PdfEngineError(
                'can not add stroke to the ink list of annotation'
              )
            );
          }
        }
        break;
    }

    this.wasmModuleWrapper.FPDFPage_GenerateContent(pagePtr);

    this.wasmModuleWrapper.FPDFPage_CloseAnnot(annotationPtr);
    this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

    return TaskBase.resolve(true);
  }

  removePageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'removePageAnnotation',
      doc,
      page,
      annotation
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, page.index);
    const result = this.wasmModuleWrapper.FPDFPage_RemoveAnnot(
      pagePtr,
      annotation.id
    );
    this.wasmModuleWrapper.FPDFPage_GenerateContent(pagePtr);
    this.wasmModuleWrapper.FPDF_ClosePage(pagePtr);

    return TaskBase.resolve(result);
  }

  setAnnotationRect(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    rect: Rect
  ) {
    const pageXPtr = this.malloc(8);
    const pageYPtr = this.malloc(8);
    if (
      !this.wasmModuleWrapper.FPDF_DeviceToPage(
        pagePtr,
        0,
        0,
        page.size.width,
        page.size.height,
        0,
        rect.origin.x,
        rect.origin.y,
        pageXPtr,
        pageYPtr
      )
    ) {
      this.free(pageXPtr);
      this.free(pageYPtr);
      return false;
    }
    const pageX = this.wasmModule.getValue(pageXPtr, 'double');
    const pageY = this.wasmModule.getValue(pageYPtr, 'double');
    this.free(pageXPtr);
    this.free(pageYPtr);

    const pageRectPtr = this.malloc(4 * 4);
    this.wasmModule.setValue(pageRectPtr, pageX, 'float');
    this.wasmModule.setValue(pageRectPtr + 4, pageY, 'float');
    this.wasmModule.setValue(pageRectPtr + 8, pageX + rect.size.width, 'float');
    this.wasmModule.setValue(
      pageRectPtr + 12,
      pageY - rect.size.height,
      'float'
    );

    if (!this.wasmModuleWrapper.FPDFAnnot_SetRect(annotationPtr, pageRectPtr)) {
      this.free(pageRectPtr);
      return false;
    }
    this.free(pageRectPtr);

    return true;
  }

  addInkStroke(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    inkList: PdfInkListObject[]
  ) {
    for (const inkStroke of inkList) {
      const inkPointsCount = inkStroke.points.length;
      const inkPointsPtr = this.malloc(inkPointsCount * 8);
      for (let i = 0; i < inkPointsCount; i++) {
        const point = inkStroke.points[i];
        const { x, y } = this.convertDevicePointToPagePoint(page, point);

        this.wasmModule.setValue(inkPointsPtr + i * 8, x, 'float');
        this.wasmModule.setValue(inkPointsPtr + i * 8 + 4, y, 'float');
      }

      if (
        this.wasmModuleWrapper.FPDFAnnot_AddInkStroke(
          annotationPtr,
          inkPointsPtr,
          inkPointsCount
        ) === -1
      ) {
        this.free(inkPointsPtr);
        return false;
      }

      this.free(inkPointsPtr);
    }

    return true;
  }

  addStamp(
    docPtr: number,
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    annotation: PdfStampAnnoObject
  ) {
    for (const content of annotation.contents) {
      switch (content.type) {
        case PdfPageObjectType.IMAGE:
          return this.addImageObject(
            docPtr,
            page,
            pagePtr,
            annotationPtr,
            annotation.rect.origin,
            content.imageData
          );
      }
    }

    return false;
  }

  addImageObject(
    docPtr: number,
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    position: Position,
    imageData: ImageData
  ) {
    const bytesPerPixel = 4;
    const pixelCount = imageData.width * imageData.height;

    const bitmapBufferPtr = this.malloc(bytesPerPixel * pixelCount);
    if (!bitmapBufferPtr) {
      return false;
    }

    for (let i = 0; i < pixelCount; i++) {
      const red = imageData.data[i * bytesPerPixel];
      const green = imageData.data[i * bytesPerPixel + 1];
      const blue = imageData.data[i * bytesPerPixel + 2];
      const alpha = imageData.data[i * bytesPerPixel + 3];

      this.wasmModule.setValue(bitmapBufferPtr + i * bytesPerPixel, blue, 'i8');
      this.wasmModule.setValue(
        bitmapBufferPtr + i * bytesPerPixel + 1,
        green,
        'i8'
      );
      this.wasmModule.setValue(
        bitmapBufferPtr + i * bytesPerPixel + 2,
        red,
        'i8'
      );
      this.wasmModule.setValue(
        bitmapBufferPtr + i * bytesPerPixel + 3,
        alpha,
        'i8'
      );
    }

    const format = BitmapFormat.Bitmap_BGRA;
    const bitmapPtr = this.wasmModuleWrapper.FPDFBitmap_CreateEx(
      imageData.width,
      imageData.height,
      format,
      bitmapBufferPtr,
      0
    );
    if (!bitmapPtr) {
      this.free(bitmapBufferPtr);
      return false;
    }

    const imageObjectPtr =
      this.wasmModuleWrapper.FPDFPageObj_NewImageObj(docPtr);
    if (!imageObjectPtr) {
      this.wasmModuleWrapper.FPDFBitmap_Destroy(bitmapPtr);
      this.free(bitmapBufferPtr);
      return false;
    }

    if (
      !this.wasmModuleWrapper.FPDFImageObj_SetBitmap(
        pagePtr,
        0,
        imageObjectPtr,
        bitmapPtr
      )
    ) {
      this.wasmModuleWrapper.FPDFBitmap_Destroy(bitmapPtr);
      this.wasmModuleWrapper.FPDFPageObj_Destroy(imageObjectPtr);
      this.free(bitmapBufferPtr);
      return false;
    }

    const matrixPtr = this.malloc(6 * 4);
    this.wasmModule.setValue(matrixPtr, imageData.width, 'float');
    this.wasmModule.setValue(matrixPtr + 4, 0, 'float');
    this.wasmModule.setValue(matrixPtr + 8, 0, 'float');
    this.wasmModule.setValue(matrixPtr + 12, imageData.height, 'float');
    this.wasmModule.setValue(matrixPtr + 16, 0, 'float');
    this.wasmModule.setValue(matrixPtr + 20, 0, 'float');
    if (
      !this.wasmModuleWrapper.FPDFPageObj_SetMatrix(imageObjectPtr, matrixPtr)
    ) {
      this.free(matrixPtr);
      this.wasmModuleWrapper.FPDFBitmap_Destroy(bitmapPtr);
      this.wasmModuleWrapper.FPDFPageObj_Destroy(imageObjectPtr);
      this.free(bitmapBufferPtr);
      return false;
    }
    this.free(matrixPtr);

    this.wasmModuleWrapper.FPDFPageObj_Transform(
      imageObjectPtr,
      1,
      0,
      0,
      1,
      position.x,
      position.y
    );

    if (
      !this.wasmModuleWrapper.FPDFAnnot_AppendObject(
        annotationPtr,
        imageObjectPtr
      )
    ) {
      this.wasmModuleWrapper.FPDFBitmap_Destroy(bitmapPtr);
      this.wasmModuleWrapper.FPDFPageObj_Destroy(imageObjectPtr);
      this.free(bitmapBufferPtr);
      return false;
    }

    this.wasmModuleWrapper.FPDFPage_GenerateContent(pagePtr);
    this.wasmModuleWrapper.FPDFBitmap_Destroy(bitmapPtr);
    this.free(bitmapBufferPtr);

    return true;
  }

  getPageTextRects(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ): Task<PdfTextRectObject[], PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageTextRects',
      doc,
      page,
      scaleFactor,
      rotation
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

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
  ): Task<ImageData, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderThumbnail',
      doc,
      page,
      scaleFactor,
      rotation
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    scaleFactor = Math.max(scaleFactor, 0.5);
    return this.renderPage(doc, page, scaleFactor, rotation, {
      withAnnotations: true,
    });
  }

  startSearch(
    doc: PdfDocumentObject,
    contextId: number
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'startSearch', doc, contextId);

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    return TaskBase.resolve(true);
  }

  searchNext(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget
  ): Task<SearchResult | undefined, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'searchNext',
      doc,
      contextId,
      target
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
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
  ): Task<SearchResult | undefined, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'searchPrev',
      doc,
      contextId,
      target
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
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

  stopSearch(
    doc: PdfDocumentObject,
    contextId: number
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'stopSearch', doc, contextId);

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { searchContexts } = this.docs[doc.id];
    if (searchContexts) {
      searchContexts.delete(contextId);
    }

    return TaskBase.resolve(true);
  }

  getAttachments(
    doc: PdfDocumentObject
  ): Task<PdfAttachmentObject[], PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getAttachments', doc);

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const attachments: PdfAttachmentObject[] = [];

    const { docPtr } = this.docs[doc.id];
    const count = this.wasmModuleWrapper.FPDFDoc_GetAttachmentCount(docPtr);
    for (let i = 0; i < count; i++) {
      const attachment = this.readPdfAttachment(docPtr, i);
      attachments.push(attachment);
    }

    return TaskBase.resolve(attachments);
  }

  readAttachmentContent(
    doc: PdfDocumentObject,
    attachment: PdfAttachmentObject
  ): Task<ArrayBuffer, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'readAttachmentContent',
      doc,
      attachment
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const attachmentPtr = this.wasmModuleWrapper.FPDFDoc_GetAttachment(
      docPtr,
      attachment.index
    );
    const sizePtr = this.malloc(8);
    if (
      !this.wasmModuleWrapper.FPDFAttachment_GetFile(
        attachmentPtr,
        0,
        0,
        sizePtr
      )
    ) {
      this.free(sizePtr);
      return TaskBase.reject(
        new PdfEngineError('can not read attachment size')
      );
    }
    const size = this.wasmModule.getValue(sizePtr, 'i64');

    const contentPtr = this.malloc(size);
    if (
      !this.wasmModuleWrapper.FPDFAttachment_GetFile(
        attachmentPtr,
        contentPtr,
        size,
        sizePtr
      )
    ) {
      this.free(sizePtr);
      this.free(contentPtr);

      return TaskBase.reject(
        new PdfEngineError('can not read attachment content')
      );
    }

    const buffer = new ArrayBuffer(size);
    const view = new DataView(buffer);
    for (let i = 0; i < size; i++) {
      view.setInt8(i, this.wasmModule.getValue(contentPtr + i, 'i8'));
    }

    this.free(sizePtr);
    this.free(contentPtr);

    return TaskBase.resolve(buffer);
  }

  extractPages(
    doc: PdfDocumentObject,
    pageIndexes: number[]
  ): Task<ArrayBuffer, Error> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'extractPages',
      doc,
      pageIndexes
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];

    const newDocPtr = this.wasmModuleWrapper.FPDF_CreateNewDocument();
    if (!newDocPtr) {
      return TaskBase.reject(new PdfEngineError('can not create new document'));
    }

    const pageIndexesPtr = this.malloc(pageIndexes.length * 4);
    for (let i = 0; i < pageIndexes.length; i++) {
      this.wasmModule.setValue(pageIndexesPtr + i * 4, pageIndexes[i], 'i32');
    }

    if (
      !this.wasmModuleWrapper.FPDF_ImportPagesByIndex(
        newDocPtr,
        docPtr,
        pageIndexesPtr,
        pageIndexes.length,
        0
      )
    ) {
      this.wasmModuleWrapper.FPDF_CloseDocument(newDocPtr);
      return TaskBase.reject(
        new PdfEngineError('can not import pages to new document')
      );
    }

    const buffer = this.saveDocument(newDocPtr);

    this.wasmModuleWrapper.FPDF_CloseDocument(newDocPtr);

    return TaskBase.resolve(buffer);
  }

  extractText(
    doc: PdfDocumentObject,
    pageIndexes: number[]
  ): Task<string, Error> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'extractText',
      doc,
      pageIndexes
    );

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const strings: string[] = [];
    for (let i = 0; i < pageIndexes.length; i++) {
      const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(
        docPtr,
        pageIndexes[i]
      );
      const textPagePtr = this.wasmModuleWrapper.FPDFText_LoadPage(pagePtr);
      const charCount = this.wasmModuleWrapper.FPDFText_CountChars(textPagePtr);
      const bufferPtr = this.malloc((charCount + 1) * 2);
      this.wasmModuleWrapper.FPDFText_GetText(
        textPagePtr,
        0,
        charCount,
        bufferPtr
      );
      const text = this.wasmModule.UTF16ToString(bufferPtr);
      this.free(bufferPtr);
      strings.push(text);
    }

    return TaskBase.resolve(strings.join('\n\n'));
  }

  merge(files: PdfFile[]): Task<PdfFile, Error> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'merge', files);

    const newDocPtr = this.wasmModuleWrapper.FPDF_CreateNewDocument();
    if (!newDocPtr) {
      return TaskBase.reject(new PdfEngineError('can not create new document'));
    }

    const ptrs: { docPtr: number; filePtr: number }[] = [];
    for (const file of files.reverse()) {
      const array = new Uint8Array(file.content);
      const length = array.length;
      const filePtr = this.malloc(length);
      this.wasmModule.HEAPU8.set(array, filePtr);

      const docPtr = this.wasmModuleWrapper.FPDF_LoadMemDocument(
        filePtr,
        length,
        0
      );
      if (!docPtr) {
        const lastError = this.wasmModuleWrapper.FPDF_GetLastError();
        this.logger.error(
          LOG_SOURCE,
          LOG_CATEGORY,
          `FPDF_LoadMemDocument failed with ${lastError}`
        );
        this.free(filePtr);

        for (const ptr of ptrs) {
          this.wasmModuleWrapper.FPDF_CloseDocument(ptr.docPtr);
          this.free(ptr.filePtr);
        }

        return TaskBase.reject<PdfFile>(
          new PdfEngineError(
            `FPDF_LoadMemDocument failed with ${lastError}`,
            lastError
          )
        );
      }
      ptrs.push({ filePtr, docPtr });

      if (!this.wasmModuleWrapper.FPDF_ImportPages(newDocPtr, docPtr, 0, 0)) {
        this.wasmModuleWrapper.FPDF_CloseDocument(newDocPtr);

        for (const ptr of ptrs) {
          this.wasmModuleWrapper.FPDF_CloseDocument(ptr.docPtr);
          this.free(ptr.filePtr);
        }

        return TaskBase.reject(
          new PdfEngineError('can not import pages to new document')
        );
      }
    }
    const buffer = this.saveDocument(newDocPtr);

    this.wasmModuleWrapper.FPDF_CloseDocument(newDocPtr);

    for (const ptr of ptrs) {
      this.wasmModuleWrapper.FPDF_CloseDocument(ptr.docPtr);
      this.free(ptr.filePtr);
    }

    const file: PdfFile = {
      id: `${Math.random()}`,
      name: `merged.${Math.random()}.pdf`,
      content: buffer,
    };
    return TaskBase.resolve(file);
  }

  saveAsCopy(doc: PdfDocumentObject): Task<ArrayBuffer, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'saveAsCopy', doc);

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const buffer = this.saveDocument(docPtr);

    return TaskBase.resolve(buffer);
  }

  closeDocument(doc: PdfDocumentObject): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'closeDocument', doc);

    if (!this.docs[doc.id]) {
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const docData = this.docs[doc.id];
    if (!docData) {
      this.logger.error(
        LOG_SOURCE,
        LOG_CATEGORY,
        `can not close document ${doc.id}`
      );
      return TaskBase.reject<boolean>(
        new PdfEngineError(`can not close document ${doc.id}`)
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

  saveDocument(docPtr: number) {
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

    return buffer;
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
      compareSearchTarget(searchContext.target, { keyword, flags })
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
        2,
        2
      );
      let fontFamily = '';
      let fontSize = rect.size.height;
      if (charIndex >= 0) {
        fontSize = this.wasmModuleWrapper.FPDFText_GetFontSize(
          textPagePtr,
          charIndex
        );

        const fontNameLength = this.wasmModuleWrapper.FPDFText_GetFontInfo(
          textPagePtr,
          charIndex,
          0,
          0,
          0
        );

        const bytesCount = fontNameLength + 1; // include NIL
        const textBufferPtr = this.malloc(bytesCount);
        const flagsPtr = this.malloc(4);
        this.wasmModuleWrapper.FPDFText_GetFontInfo(
          textPagePtr,
          charIndex,
          textBufferPtr,
          bytesCount,
          flagsPtr
        );
        fontFamily = this.wasmModule.UTF8ToString(textBufferPtr);
        this.free(textBufferPtr);
        this.free(flagsPtr);
      }

      const textRect: PdfTextRectObject = {
        content,
        rect,
        font: {
          family: fontFamily,
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
    textPagePtr: number,
    scaleFactor: number,
    rotation: Rotation
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
      const annotation = this.readPageAnnotation(
        page,
        docPtr,
        pagePtr,
        textPagePtr,
        formHandle,
        i,
        scaleFactor,
        rotation
      );
      if (annotation) {
        annotations.push(annotation);
      }
    }

    this.wasmModuleWrapper.PDFium_ExitFormFillEnvironment(formHandle);
    this.wasmModuleWrapper.PDFium_CloseFormFillInfo(formFillInfoPtr);

    return annotations;
  }

  private readPageAnnotation(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number,
    formHandle: number,
    index: number,
    scaleFactor: number,
    rotation: Rotation
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
      case PdfAnnotationSubtype.TEXT:
        {
          annotation = this.readPdfTextAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.FREETEXT:
        {
          annotation = this.readPdfFreeTextAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
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
      case PdfAnnotationSubtype.FILEATTACHMENT:
        {
          annotation = this.readPdfFileAttachmentAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.INK:
        {
          annotation = this.readPdfInkAnno(page, pagePtr, annotationPtr, index);
        }
        break;
      case PdfAnnotationSubtype.POLYGON:
        {
          annotation = this.readPdfPolygonAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.POLYLINE:
        {
          annotation = this.readPdfPolylineAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.LINE:
        {
          annotation = this.readPdfLineAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.HIGHLIGHT:
        annotation = this.readPdfHighlightAnno(
          page,
          pagePtr,
          annotationPtr,
          index
        );
        break;
      case PdfAnnotationSubtype.STAMP:
        {
          annotation = this.readPdfStampAnno(
            docPtr,
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.SQUARE:
        {
          annotation = this.readPdfSquareAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.CIRCLE:
        {
          annotation = this.readPdfCircleAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.UNDERLINE:
        {
          annotation = this.readPdfUnderlineAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.SQUIGGLY:
        {
          annotation = this.readPdfSquigglyAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.STRIKEOUT:
        {
          annotation = this.readPdfStrikeOutAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.CARET:
        {
          annotation = this.readPdfCaretAnno(
            page,
            pagePtr,
            annotationPtr,
            index
          );
        }
        break;
      case PdfAnnotationSubtype.POPUP:
        break;
      default:
        {
          annotation = this.readPdfAnno(
            page,
            pagePtr,
            subType,
            annotationPtr,
            index
          );
        }
        break;
    }
    this.wasmModuleWrapper.FPDFPage_CloseAnnot(annotationPtr);

    return annotation;
  }

  private readPdfTextAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfTextAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const annoRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);

    const utf16Length = this.wasmModuleWrapper.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      0,
      0
    );
    const bytesCount = (utf16Length + 1) * 2; // include NIL
    const contentBufferPtr = this.malloc(bytesCount);
    this.wasmModuleWrapper.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      contentBufferPtr,
      bytesCount
    );
    const contents = this.wasmModule.UTF16ToString(contentBufferPtr);
    this.free(contentBufferPtr);

    const redPtr = this.malloc(4);
    const greenPtr = this.malloc(4);
    const bluePtr = this.malloc(4);
    const alphaPtr = this.malloc(4);

    this.wasmModuleWrapper.FPDFAnnot_GetColor(
      annotationPtr,
      0,
      redPtr,
      greenPtr,
      bluePtr,
      alphaPtr
    );
    const red = this.wasmModule.getValue(redPtr, 'i32');
    const green = this.wasmModule.getValue(redPtr, 'i32');
    const blue = this.wasmModule.getValue(redPtr, 'i32');
    const alpha = this.wasmModule.getValue(redPtr, 'i32');

    this.free(redPtr);
    this.free(greenPtr);
    this.free(bluePtr);
    this.free(alphaPtr);

    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.TEXT,
      contents,
      color: {
        red,
        green,
        blue,
        alpha,
      },
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfFreeTextAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfFreeTextAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const annoRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);

    const utf16Length = this.wasmModuleWrapper.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      0,
      0
    );
    const bytesCount = (utf16Length + 1) * 2; // include NIL
    const contentBufferPtr = this.malloc(bytesCount);
    this.wasmModuleWrapper.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      contentBufferPtr,
      bytesCount
    );
    const contents = this.wasmModule.UTF16ToString(contentBufferPtr);
    this.free(contentBufferPtr);

    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.FREETEXT,
      contents,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
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

    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const annoRect = this.readPageAnnoRect(annotationPtr);
    const { left, top, right, bottom } = annoRect;
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);

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
    const textBufferPtr = this.malloc(bytesCount);
    this.wasmModuleWrapper.FPDFText_GetBoundedText(
      textPagePtr,
      left,
      top,
      right,
      bottom,
      textBufferPtr,
      utf16Length
    );
    const text = this.wasmModule.UTF16ToString(textBufferPtr);
    this.free(textBufferPtr);

    const target = this.readPdfLinkAnnoTarget(
      docPtr,
      () => {
        return this.wasmModuleWrapper.FPDFLink_GetAction(linkPtr);
      },
      () => {
        return this.wasmModuleWrapper.FPDFLink_GetDest(docPtr, linkPtr);
      }
    );
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.LINK,
      text,
      target,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfWidgetAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    formHandle: number,
    index: number
  ): PdfWidgetAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    const field = this.readPdfWidgetAnnoField(formHandle, annotationPtr);

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.WIDGET,
      rect,
      field,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfFileAttachmentAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfFileAttachmentAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.FILEATTACHMENT,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfInkAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfInkAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    const inkList: PdfInkListObject[] = [];

    const count =
      this.wasmModuleWrapper.FPDFAnnot_GetInkListCount(annotationPtr);
    for (let i = 0; i < count; i++) {
      const points: Position[] = [];
      const pointsCount = this.wasmModuleWrapper.FPDFAnnot_GetInkListPath(
        annotationPtr,
        i,
        0,
        0
      );
      if (pointsCount > 0) {
        const pointMemorySize = 8;
        const pointsPtr = this.malloc(pointsCount * pointMemorySize);
        this.wasmModuleWrapper.FPDFAnnot_GetInkListPath(
          annotationPtr,
          i,
          pointsPtr,
          pointsCount
        );

        for (let j = 0; j < pointsCount; j++) {
          const pointX = this.wasmModule.getValue(pointsPtr + j * 8, 'float');
          const pointY = this.wasmModule.getValue(
            pointsPtr + j * 8 + 4,
            'float'
          );
          const { x, y } = this.convertPagePointToDevicePoint(page, {
            x: pointX,
            y: pointY,
          });
          points.push({ x, y });
        }

        this.free(pointsPtr);
      }

      inkList.push({ points });
    }

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.INK,
      rect,
      popup,
      inkList,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfPolygonAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfPolygonAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );
    const vertices = this.readPdfAnnoVertices(page, pagePtr, annotationPtr);

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.POLYGON,
      rect,
      popup,
      vertices,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfPolylineAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfPolylineAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );
    const vertices = this.readPdfAnnoVertices(page, pagePtr, annotationPtr);

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.POLYLINE,
      rect,
      popup,
      vertices,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfLineAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfLineAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );
    const startPointPtr = this.malloc(8);
    const endPointPtr = this.malloc(8);

    this.wasmModuleWrapper.FPDFAnnot_GetLine(
      annotationPtr,
      startPointPtr,
      endPointPtr
    );

    const startPointX = this.wasmModule.getValue(startPointPtr, 'float');
    const startPointY = this.wasmModule.getValue(startPointPtr + 4, 'float');
    const startPoint = this.convertPagePointToDevicePoint(page, {
      x: startPointX,
      y: startPointY,
    });

    const endPointX = this.wasmModule.getValue(endPointPtr, 'float');
    const endPointY = this.wasmModule.getValue(endPointPtr + 4, 'float');
    const endPoint = this.convertPagePointToDevicePoint(page, {
      x: endPointX,
      y: endPointY,
    });

    this.free(startPointPtr);
    this.free(endPointPtr);

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.LINE,
      rect,
      popup,
      startPoint,
      endPoint,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfHighlightAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfHighlightAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.HIGHLIGHT,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfUnderlineAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfUnderlineAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.UNDERLINE,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfStrikeOutAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfStrikeOutAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.STRIKEOUT,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfSquigglyAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfSquigglyAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.SQUIGGLY,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfCaretAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfCaretAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.CARET,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfStampAnno(
    docPtr: number,
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfStampAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );
    const contents: PdfStampAnnoObject['contents'] = [];

    const objectCount =
      this.wasmModuleWrapper.FPDFAnnot_GetObjectCount(annotationPtr);
    for (let i = 0; i < objectCount; i++) {
      const annotationObjectPtr = this.wasmModuleWrapper.FPDFAnnot_GetObject(
        annotationPtr,
        i
      );

      const pageObj = this.readPdfPageObject(annotationObjectPtr);
      if (pageObj) {
        contents.push(pageObj);
      }
    }

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.STAMP,
      rect,
      popup,
      contents,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfPageObject(pageObjectPtr: number) {
    const type = this.wasmModuleWrapper.FPDFPageObj_GetType(
      pageObjectPtr
    ) as PdfPageObjectType;
    switch (type) {
      case PdfPageObjectType.PATH:
        return this.readPathObject(pageObjectPtr);
      case PdfPageObjectType.IMAGE:
        return this.readImageObject(pageObjectPtr);
      case PdfPageObjectType.FORM:
        return this.readFormObject(pageObjectPtr);
    }
  }

  private readPathObject(pageObjectPtr: number): PdfPathObject {
    const segmentCount =
      this.wasmModuleWrapper.FPDFPath_CountSegments(pageObjectPtr);

    const leftPtr = this.malloc(4);
    const bottomPtr = this.malloc(4);
    const rightPtr = this.malloc(4);
    const topPtr = this.malloc(4);
    this.wasmModuleWrapper.FPDFPageObj_GetBounds(
      pageObjectPtr,
      leftPtr,
      bottomPtr,
      rightPtr,
      topPtr
    );
    const left = this.wasmModule.getValue(leftPtr, 'float');
    const bottom = this.wasmModule.getValue(bottomPtr, 'float');
    const right = this.wasmModule.getValue(rightPtr, 'float');
    const top = this.wasmModule.getValue(topPtr, 'float');
    const bounds = { left, bottom, right, top };
    this.free(leftPtr);
    this.free(bottomPtr);
    this.free(rightPtr);
    this.free(topPtr);
    const segments: PdfSegmentObject[] = [];
    for (let i = 0; i < segmentCount; i++) {
      const segment = this.readPdfSegment(pageObjectPtr, i);
      segments.push(segment);
    }

    return {
      type: PdfPageObjectType.PATH,
      bounds,
      segments,
    };
  }

  private readPdfSegment(
    annotationObjectPtr: number,
    segmentIndex: number
  ): PdfSegmentObject {
    const segmentPtr = this.wasmModuleWrapper.FPDFPath_GetPathSegment(
      annotationObjectPtr,
      segmentIndex
    );
    const segmentType =
      this.wasmModuleWrapper.FPDFPathSegment_GetType(segmentPtr);
    const isClosed =
      this.wasmModuleWrapper.FPDFPathSegment_GetClose(segmentPtr);
    const pointXPtr = this.malloc(4);
    const pointYPtr = this.malloc(4);
    this.wasmModuleWrapper.FPDFPathSegment_GetPoint(
      segmentPtr,
      pointXPtr,
      pointYPtr
    );
    const pointX = this.wasmModule.getValue(pointXPtr, 'float');
    const pointY = this.wasmModule.getValue(pointYPtr, 'float');
    this.free(pointXPtr);
    this.free(pointYPtr);

    return {
      type: segmentType,
      point: { x: pointX, y: pointY },
      isClosed,
    };
  }

  private readImageObject(imageObjectPtr: number): PdfImageObject {
    const bitmapPtr =
      this.wasmModuleWrapper.FPDFImageObj_GetBitmap(imageObjectPtr);
    const bitmapBufferPtr =
      this.wasmModuleWrapper.FPDFBitmap_GetBuffer(bitmapPtr);
    const bitmapWidth = this.wasmModuleWrapper.FPDFBitmap_GetWidth(bitmapPtr);
    const bitmapHeight = this.wasmModuleWrapper.FPDFBitmap_GetHeight(bitmapPtr);
    const format = this.wasmModuleWrapper.FPDFBitmap_GetFormat(
      bitmapPtr
    ) as BitmapFormat;

    const pixelCount = bitmapWidth * bitmapHeight;
    const bytesPerPixel = 4;
    const array = new Uint8ClampedArray(pixelCount * bytesPerPixel);
    for (let i = 0; i < pixelCount; i++) {
      switch (format) {
        case BitmapFormat.Bitmap_BGR:
          {
            const blue = this.wasmModule.getValue(
              bitmapBufferPtr + i * 3,
              'i8'
            );
            const green = this.wasmModule.getValue(
              bitmapBufferPtr + i * 3 + 1,
              'i8'
            );
            const red = this.wasmModule.getValue(
              bitmapBufferPtr + i * 3 + 2,
              'i8'
            );
            array[i * bytesPerPixel] = red;
            array[i * bytesPerPixel + 1] = green;
            array[i * bytesPerPixel + 2] = blue;
            array[i * bytesPerPixel + 3] = 100;
          }
          break;
      }
    }

    const imageData = new ImageData(array, bitmapWidth, bitmapHeight);

    return {
      type: PdfPageObjectType.IMAGE,
      imageData,
    };
  }

  private readFormObject(formObjectPtr: number): PdfFormObject {
    const objectCount =
      this.wasmModuleWrapper.FPDFFormObj_CountObjects(formObjectPtr);
    const objects: (PdfFormObject | PdfImageObject | PdfPathObject)[] = [];
    for (let i = 0; i < objectCount; i++) {
      const pageObjectPtr = this.wasmModuleWrapper.FPDFFormObj_GetObject(
        formObjectPtr,
        i
      );
      const pageObj = this.readPdfPageObject(pageObjectPtr);
      if (pageObj) {
        objects.push(pageObj);
      }
    }

    return {
      type: PdfPageObjectType.FORM,
      objects,
    };
  }

  private readPdfCircleAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfCircleAnnoObject {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.CIRCLE,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfSquareAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfSquareAnnoObject {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.SQUARE,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfAnno(
    page: PdfPageObject,
    pagePtr: number,
    type: PdfUnsupportedAnnoObject['type'],
    annotationPtr: number,
    index: number
  ): PdfUnsupportedAnnoObject {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index
    );

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type,
      rect,
      popup,
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfAnnoLinkedPopup(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number
  ): PdfPopupAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const popupAnnotationPtr = this.wasmModuleWrapper.FPDFAnnot_GetLinkedAnnot(
      annotationPtr,
      'Popup'
    );
    if (!popupAnnotationPtr) {
      return;
    }

    const pageRect = this.readPageAnnoRect(popupAnnotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);

    const contentsLength = this.wasmModuleWrapper.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      0,
      0
    );
    const contentsBytesCount = (contentsLength + 1) * 2; // include NIL
    const contentsPtr = this.malloc(contentsBytesCount);
    this.wasmModuleWrapper.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      contentsPtr,
      contentsBytesCount
    );
    const contents = this.wasmModule.UTF16ToString(contentsPtr);
    this.free(contentsPtr);

    const openLength = this.wasmModuleWrapper.FPDFAnnot_GetStringValue(
      popupAnnotationPtr,
      'Open',
      0,
      0
    );
    const openBytesCount = (openLength + 1) * 2; // include NIL
    const openPtr = this.malloc(openBytesCount);
    this.wasmModuleWrapper.FPDFAnnot_GetStringValue(
      popupAnnotationPtr,
      'Open',
      openPtr,
      openBytesCount
    );
    const open = this.wasmModule.UTF16ToString(openPtr);
    this.free(openPtr);

    this.wasmModuleWrapper.FPDFPage_CloseAnnot(popupAnnotationPtr);

    return {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: page.index,
      id: index,
      type: PdfAnnotationSubtype.POPUP,
      rect,
      contents,
      open: open === 'true',
      appearances: {
        normal: appearence,
      },
    };
  }

  private readPdfAnnoVertices(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number
  ) {
    const vertices: Position[] = [];
    const count = this.wasmModuleWrapper.FPDFAnnot_GetVertices(
      annotationPtr,
      0,
      0
    );
    const pointMemorySize = 8;
    const pointsPtr = this.malloc(count * pointMemorySize);
    this.wasmModuleWrapper.FPDFAnnot_GetVertices(
      annotationPtr,
      pointsPtr,
      count
    );
    for (let i = 0; i < count; i++) {
      const pointX = this.wasmModule.getValue(
        pointsPtr + i * pointMemorySize,
        'float'
      );
      const pointY = this.wasmModule.getValue(
        pointsPtr + i * pointMemorySize + 4,
        'float'
      );

      const { x, y } = this.convertPagePointToDevicePoint(page, {
        x: pointX,
        y: pointY,
      });
      vertices.push({
        x,
        y,
      });
    }
    this.free(pointsPtr);

    return vertices;
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

  private renderPageRectToImageData(
    docPtr: number,
    page: PdfPageObject,
    rect: Rect,
    scaleFactor: number,
    rotation: Rotation,
    options: PdfRenderOptions
  ) {
    const format = BitmapFormat.Bitmap_BGRA;
    const bytesPerPixel = 4;
    const bitmapSize = transformSize(rect.size, rotation, scaleFactor * DPR);
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
    let flags = RenderFlag.REVERSE_BYTE_ORDER;
    if (options?.withAnnotations) {
      flags = flags | RenderFlag.ANNOT;
    }
    const pagePtr = this.wasmModuleWrapper.FPDF_LoadPage(docPtr, page.index);
    this.wasmModuleWrapper.FPDF_RenderPageBitmap(
      bitmapPtr,
      pagePtr,
      rect.origin.x,
      rect.origin.y,
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

    return imageData;
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

  private readPdfAttachment(
    docPtr: number,
    index: number
  ): PdfAttachmentObject {
    const attachmentPtr = this.wasmModuleWrapper.FPDFDoc_GetAttachment(
      docPtr,
      index
    );
    const name = readString(
      this.wasmModule,
      (buffer, bufferLength) => {
        return this.wasmModuleWrapper.FPDFAttachment_GetName(
          attachmentPtr,
          buffer,
          bufferLength
        );
      },
      this.wasmModule.UTF16ToString
    );
    const creationDate = readString(
      this.wasmModule,
      (buffer, bufferLength) => {
        return this.wasmModuleWrapper.FPDFAttachment_GetStringValue(
          attachmentPtr,
          'CreationDate',
          buffer,
          bufferLength
        );
      },
      this.wasmModule.UTF16ToString
    );
    const checksum = readString(
      this.wasmModule,
      (buffer, bufferLength) => {
        return this.wasmModuleWrapper.FPDFAttachment_GetStringValue(
          attachmentPtr,
          'Checksum',
          buffer,
          bufferLength
        );
      },
      this.wasmModule.UTF16ToString
    );

    return {
      index,
      name,
      creationDate,
      checksum,
    };
  }

  private convertDevicePointToPagePoint(
    page: PdfPageObject,
    position: Position
  ) {
    const x = position.x;
    const y = page.size.height - position.y;

    return { x, y };
  }

  private convertPagePointToDevicePoint(
    page: PdfPageObject,
    position: Position
  ) {
    const x = position.x;
    const y = page.size.height - position.y;

    return { x, y };
  }

  private convertPageRectToDeviceRect(
    page: PdfPageObject,
    pagePtr: number,
    pageRect: {
      left: number;
      top: number;
      right: number;
      bottom: number;
    }
  ): Rect {
    const { x, y } = this.convertPagePointToDevicePoint(page, {
      x: pageRect.left,
      y: pageRect.top,
    });
    const rect = {
      origin: {
        x,
        y,
      },
      size: {
        width: Math.abs(pageRect.right - pageRect.left),
        height: Math.abs(pageRect.top - pageRect.bottom),
      },
    };

    return rect;
  }

  private readPageAnnoAppearanceStream(
    annotationPtr: number,
    mode = AppearanceMode.Normal
  ) {
    const utf16Length = this.wasmModuleWrapper.FPDFAnnot_GetAP(
      annotationPtr,
      mode,
      0,
      0
    );
    const bytesCount = (utf16Length + 1) * 2; // include NIL
    const bufferPtr = this.malloc(bytesCount);
    this.wasmModuleWrapper.FPDFAnnot_GetAP(
      annotationPtr,
      mode,
      bufferPtr,
      bytesCount
    );
    const ap = this.wasmModule.UTF16ToString(bufferPtr);
    this.free(bufferPtr);

    return ap;
  }

  private readPageAnnoRect(annotationPtr: number) {
    const pageRectPtr = this.malloc(4 * 4);
    const pageRect = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
    if (this.wasmModuleWrapper.FPDFAnnot_GetRect(annotationPtr, pageRectPtr)) {
      pageRect.left = this.wasmModule.getValue(pageRectPtr, 'float');
      pageRect.top = this.wasmModule.getValue(pageRectPtr + 4, 'float');
      pageRect.right = this.wasmModule.getValue(pageRectPtr + 8, 'float');
      pageRect.bottom = this.wasmModule.getValue(pageRectPtr + 12, 'float');
    }
    this.free(pageRectPtr);

    return pageRect;
  }
}
