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
  PdfPolygonAnnoObject,
  PdfPolylineAnnoObject,
  PdfLineAnnoObject,
  PdfHighlightAnnoObject,
  PdfStampAnnoObjectContents,
  PdfWidgetAnnoField,
  PdfTransformMatrix,
} from '@unionpdf/models';
import { readArrayBuffer, readString } from './helper';
import { WrappedPdfiumModule } from '@unionpdf/pdfium';

/**
 * Format of bitmap
 */
export enum BitmapFormat {
  Bitmap_Gray = 1,
  Bitmap_BGR = 2,
  Bitmap_BGRx = 3,
  Bitmap_BGRA = 4,
}

/**
 * Pdf rendering flag
 */
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

/**
 * device pixel ratio
 */
export const DPR = self.devicePixelRatio || 1;

const LOG_SOURCE = 'PDFiumEngine';
const LOG_CATEGORY = 'Engine';

/**
 * Context used for searching
 */
export interface SearchContext {
  /**
   * search target
   */
  target: SearchTarget;
  /**
   * current page index
   */
  currPageIndex: number;
  /**
   * index of text in the current pdf page,  -1 means reach the end
   */
  startIndex: number;
}

/**
 * Error code of pdfium library
 */
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

/**
 * Pdf engine that based on pdfium wasm
 */
export class PdfiumEngine implements PdfEngine {
  /**
   * pdf documents that opened
   */
  docs: Record<
    string,
    {
      filePtr: number;
      docPtr: number;
      searchContexts: Map<number, SearchContext>;
    }
  > = {};

  /**
   * Create an instance of PdfiumEngine
   * @param wasmModule - pdfium wasm module
   * @param logger - logger instance
   */
  constructor(
    private pdfiumModule: WrappedPdfiumModule,
    private logger: Logger = new NoopLogger(),
  ) {}

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.initialize}
   *
   * @public
   */
  initialize() {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'initialize');
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `Initialize`,
      'Begin',
      'General',
    );
    this.pdfiumModule.PDFium_Init();
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `Initialize`, 'End', 'General');
    return TaskBase.resolve(true);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.destroy}
   *
   * @public
   */
  destroy() {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'destroy');
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `Destroy`, 'Begin', 'General');
    this.pdfiumModule.FPDF_DestroyLibrary();
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `Destroy`, 'End', 'General');
    return TaskBase.resolve(true);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.openDocument}
   *
   * @public
   */
  openDocument(file: PdfFile, password: string) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'openDocument', file, password);
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `OpenDocument`,
      'Begin',
      file.id,
    );
    const array = new Uint8Array(file.content);
    const length = array.length;
    const filePtr = this.malloc(length);
    this.pdfiumModule.pdfium.HEAPU8.set(array, filePtr);

    const passwordBytesSize = new TextEncoder().encode(password).length + 1;
    const passwordPtr = this.malloc(passwordBytesSize);
    this.pdfiumModule.pdfium.stringToUTF8(
      password,
      passwordPtr,
      passwordBytesSize,
    );

    const docPtr = this.pdfiumModule.FPDF_LoadMemDocument(
      filePtr,
      length,
      passwordPtr,
    );

    this.free(passwordPtr);

    if (!docPtr) {
      const lastError = this.pdfiumModule.FPDF_GetLastError();
      this.logger.error(
        LOG_SOURCE,
        LOG_CATEGORY,
        `FPDF_LoadMemDocument failed with ${lastError}`,
      );
      this.free(filePtr);
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `OpenDocument`,
        'End',
        file.id,
      );

      return TaskBase.reject<PdfDocumentObject>(
        new PdfEngineError(`FPDF_LoadMemDocument failed`, lastError),
      );
    }

    const pageCount = this.pdfiumModule.FPDF_GetPageCount(docPtr);

    const pages: PdfPageObject[] = [];
    const sizePtr = this.malloc(8);
    for (let index = 0; index < pageCount; index++) {
      const result = this.pdfiumModule.FPDF_GetPageSizeByIndexF(
        docPtr,
        index,
        sizePtr,
      );
      if (result === 0) {
        const lastError = this.pdfiumModule.FPDF_GetLastError();
        this.logger.error(
          LOG_SOURCE,
          LOG_CATEGORY,
          `FPDF_GetPageSizeByIndexF failed with ${lastError}`,
        );
        this.free(sizePtr);
        this.pdfiumModule.FPDF_CloseDocument(docPtr);
        this.free(passwordPtr);
        this.free(filePtr);
        this.logger.perf(
          LOG_SOURCE,
          LOG_CATEGORY,
          `OpenDocument`,
          'End',
          file.id,
        );
        return TaskBase.reject<PdfDocumentObject>(
          new PdfEngineError(`FPDF_GetPageSizeByIndexF failed`, lastError),
        );
      }

      const page = {
        index,
        size: {
          width: this.pdfiumModule.pdfium.getValue(sizePtr, 'float'),
          height: this.pdfiumModule.pdfium.getValue(sizePtr + 4, 'float'),
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

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `OpenDocument`, 'End', file.id);

    return TaskBase.resolve(pdfDoc);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getMetadata}
   *
   * @public
   */
  getMetadata(doc: PdfDocumentObject): Task<PdfMetadataObject, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getMetadata', doc);
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `GetMetadata`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `GetMetadata`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];

    const metadata = {
      title: this.readMetaText(docPtr, 'Title'),
      author: this.readMetaText(docPtr, 'Author'),
      subject: this.readMetaText(docPtr, 'Subject'),
      keywords: this.readMetaText(docPtr, 'Keywords'),
      producer: this.readMetaText(docPtr, 'Producer'),
      creator: this.readMetaText(docPtr, 'Creator'),
      creationDate: this.readMetaText(docPtr, 'CreationDate'),
      modificationDate: this.readMetaText(docPtr, 'ModDate'),
    };

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `GetMetadata`, 'End', doc.id);

    return TaskBase.resolve(metadata);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getSignatures}
   *
   * @public
   */
  getSignatures(
    doc: PdfDocumentObject,
  ): Task<PdfSignatureObject[], PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getSignatures', doc);
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `GetSignatures`,
      'Begin',
      doc.id,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `GetSignatures`,
        'End',
        doc.id,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const signatures: PdfSignatureObject[] = [];

    const count = this.pdfiumModule.FPDF_GetSignatureCount(docPtr);
    for (let i = 0; i < count; i++) {
      const signatureObjPtr = this.pdfiumModule.FPDF_GetSignatureObject(
        docPtr,
        i,
      );

      const contents = readArrayBuffer(
        this.pdfiumModule.pdfium,
        (buffer, bufferSize) => {
          return this.pdfiumModule.FPDFSignatureObj_GetContents(
            signatureObjPtr,
            buffer,
            bufferSize,
          );
        },
      );

      const byteRange = readArrayBuffer(
        this.pdfiumModule.pdfium,
        (buffer, bufferSize) => {
          return (
            this.pdfiumModule.FPDFSignatureObj_GetByteRange(
              signatureObjPtr,
              buffer,
              bufferSize,
            ) * 4
          );
        },
      );

      const subFilter = readArrayBuffer(
        this.pdfiumModule.pdfium,
        (buffer, bufferSize) => {
          return this.pdfiumModule.FPDFSignatureObj_GetSubFilter(
            signatureObjPtr,
            buffer,
            bufferSize,
          );
        },
      );

      const reason = readString(
        this.pdfiumModule.pdfium,
        (buffer, bufferLength) => {
          return this.pdfiumModule.FPDFSignatureObj_GetReason(
            signatureObjPtr,
            buffer,
            bufferLength,
          );
        },
        this.pdfiumModule.pdfium.UTF16ToString,
      );

      const time = readString(
        this.pdfiumModule.pdfium,
        (buffer, bufferLength) => {
          return this.pdfiumModule.FPDFSignatureObj_GetTime(
            signatureObjPtr,
            buffer,
            bufferLength,
          );
        },
        this.pdfiumModule.pdfium.UTF8ToString,
      );

      const docMDP =
        this.pdfiumModule.FPDFSignatureObj_GetDocMDPPermission(signatureObjPtr);

      signatures.push({
        contents,
        byteRange,
        subFilter,
        reason,
        time,
        docMDP,
      });
    }
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `GetSignatures`, 'End', doc.id);

    return TaskBase.resolve(signatures);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getBookmarks}
   *
   * @public
   */
  getBookmarks(
    doc: PdfDocumentObject,
  ): Task<PdfBookmarksObject, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getBookmarks', doc);
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `GetBookmarks`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `getBookmarks`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const bookmarks = this.readPdfBookmarks(docPtr, 0);

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `GetBookmarks`, 'End', doc.id);

    return TaskBase.resolve({
      bookmarks,
    });
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.renderPage}
   *
   * @public
   */
  renderPage(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    options: PdfRenderOptions,
  ): Task<ImageData, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderPage',
      doc,
      page,
      scaleFactor,
      rotation,
      options,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `RenderPage`,
      'Begin',
      `${doc.id}-${page.index}`,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `RenderPage`,
        'End',
        `${doc.id}-${page.index}`,
      );
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
      options,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `RenderPage`,
      'End',
      `${doc.id}-${page.index}`,
    );
    return TaskBase.resolve(imageData);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.renderPageRect}
   *
   * @public
   */
  renderPageRect(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    rect: Rect,
    options: PdfRenderOptions,
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
      options,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `RenderPageRect`,
      'Begin',
      `${doc.id}-${page.index}`,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `RenderPageRect`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const imageData = this.renderPageRectToImageData(
      docPtr,
      page,
      rect,
      scaleFactor,
      rotation,
      options,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `RenderPageRect`,
      'End',
      `${doc.id}-${page.index}`,
    );

    return TaskBase.resolve(imageData);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getPageAnnotations}
   *
   * @public
   */
  getPageAnnotations(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
  ): Task<PdfAnnotationObject[], PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageAnnotations',
      doc,
      page,
      scaleFactor,
      rotation,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `GetPageAnnotations`,
      'Begin',
      `${doc.id}-${page.index}`,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `GetPageAnnotations`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.pdfiumModule.FPDF_LoadPage(docPtr, page.index);
    const textPagePtr = this.pdfiumModule.FPDFText_LoadPage(pagePtr);

    const annotations = this.readPageAnnotations(
      page,
      docPtr,
      pagePtr,
      textPagePtr,
      scaleFactor,
      rotation,
    );

    this.pdfiumModule.FPDFText_ClosePage(textPagePtr);
    this.pdfiumModule.FPDF_ClosePage(pagePtr);
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `GetPageAnnotations`,
      'End',
      `${doc.id}-${page.index}`,
    );

    return TaskBase.resolve(annotations);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.createPageAnnotation}
   *
   * @public
   */
  createPageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'createPageAnnotation',
      doc,
      page,
      annotation,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `CreatePageAnnotation`,
      'Begin',
      `${doc.id}-${page.index}`,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `CreatePageAnnotation`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.pdfiumModule.FPDF_LoadPage(docPtr, page.index);
    const annotationPtr = this.pdfiumModule.FPDFPage_CreateAnnot(
      pagePtr,
      annotation.type,
    );
    if (!annotationPtr) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `CreatePageAnnotation`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(
        new PdfEngineError('can not create annotation with specified type'),
      );
    }

    if (!this.setPageAnnoRect(page, pagePtr, annotationPtr, annotation.rect)) {
      this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
      this.pdfiumModule.FPDF_ClosePage(pagePtr);
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `CreatePageAnnotation`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(
        new PdfEngineError('can not set the rect of the rect'),
      );
    }

    let isSucceed = false;
    switch (annotation.type) {
      case PdfAnnotationSubtype.INK:
        isSucceed = this.addInkStroke(
          page,
          pagePtr,
          annotationPtr,
          annotation.inkList,
        );
        break;
      case PdfAnnotationSubtype.STAMP:
        isSucceed = this.addStampContent(
          docPtr,
          page,
          pagePtr,
          annotationPtr,
          annotation.rect,
          annotation.contents,
        );
        break;
    }

    if (!isSucceed) {
      this.pdfiumModule.FPDFPage_RemoveAnnot(pagePtr, annotationPtr);
      this.pdfiumModule.FPDF_ClosePage(pagePtr);
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `CreatePageAnnotation`,
        'End',
        `${doc.id}-${page.index}`,
      );

      return TaskBase.reject(
        new PdfEngineError('can not add content of the annotation'),
      );
    }

    this.pdfiumModule.FPDFPage_GenerateContent(pagePtr);

    this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
    this.pdfiumModule.FPDF_ClosePage(pagePtr);
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `CreatePageAnnotation`,
      'End',
      `${doc.id}-${page.index}`,
    );

    return TaskBase.resolve(true);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.transformPageAnnotation}
   *
   * @public
   */
  transformPageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
    transformation: PdfAnnotationTransformation,
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'transformPageAnnotation',
      doc,
      page,
      annotation,
      transformation,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `TransformPageAnnotation`,
      'Begin',
      `${doc.id}-${page.index}`,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `TransformPageAnnotation`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];

    const pagePtr = this.pdfiumModule.FPDF_LoadPage(docPtr, page.index);
    const annotationPtr = this.pdfiumModule.FPDFPage_GetAnnot(
      pagePtr,
      annotation.id,
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
    if (!this.setPageAnnoRect(page, pagePtr, annotationPtr, rect)) {
      this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
      this.pdfiumModule.FPDF_ClosePage(pagePtr);
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `TransformPageAnnotation`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(
        new PdfEngineError('can not set the rect of the annotation'),
      );
    }

    switch (annotation.type) {
      case PdfAnnotationSubtype.INK:
        {
          if (!this.pdfiumModule.FPDFAnnot_RemoveInkList(annotationPtr)) {
            this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
            this.pdfiumModule.FPDF_ClosePage(pagePtr);
            this.logger.perf(
              LOG_SOURCE,
              LOG_CATEGORY,
              `TransformPageAnnotation`,
              'End',
              `${doc.id}-${page.index}`,
            );
            return TaskBase.reject(
              new PdfEngineError('can not remove the ink list of annotation'),
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
            this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
            this.pdfiumModule.FPDF_ClosePage(pagePtr);
            this.logger.perf(
              LOG_SOURCE,
              LOG_CATEGORY,
              `TransformPageAnnotation`,
              'End',
              `${doc.id}-${page.index}`,
            );
            return TaskBase.reject(
              new PdfEngineError(
                'can not add stroke to the ink list of annotation',
              ),
            );
          }
        }
        break;
    }

    this.pdfiumModule.FPDFPage_GenerateContent(pagePtr);

    this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);
    this.pdfiumModule.FPDF_ClosePage(pagePtr);

    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `TransformPageAnnotation`,
      'End',
      `${doc.id}-${page.index}`,
    );
    return TaskBase.resolve(true);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.removePageAnnotation}
   *
   * @public
   */
  removePageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'removePageAnnotation',
      doc,
      page,
      annotation,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `RemovePageAnnotation`,
      'Begin',
      `${doc.id}-${page.index}`,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `RemovePageAnnotation`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.pdfiumModule.FPDF_LoadPage(docPtr, page.index);
    const result = this.pdfiumModule.FPDFPage_RemoveAnnot(
      pagePtr,
      annotation.id,
    );
    this.pdfiumModule.FPDFPage_GenerateContent(pagePtr);
    this.pdfiumModule.FPDF_ClosePage(pagePtr);

    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `RemovePageAnnotation`,
      'End',
      `${doc.id}-${page.index}`,
    );
    return TaskBase.resolve(result);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getPageTextRects}
   *
   * @public
   */
  getPageTextRects(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
  ): Task<PdfTextRectObject[], PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageTextRects',
      doc,
      page,
      scaleFactor,
      rotation,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `GetPageTextRects`,
      'Begin',
      `${doc.id}-${page.index}`,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `GetPageTextRects`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const pagePtr = this.pdfiumModule.FPDF_LoadPage(docPtr, page.index);
    const textPagePtr = this.pdfiumModule.FPDFText_LoadPage(pagePtr);

    const textRects = this.readPageTextRects(
      page,
      docPtr,
      pagePtr,
      textPagePtr,
    );

    this.pdfiumModule.FPDFText_ClosePage(textPagePtr);
    this.pdfiumModule.FPDF_ClosePage(pagePtr);

    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `GetPageTextRects`,
      'End',
      `${doc.id}-${page.index}`,
    );
    return TaskBase.resolve(textRects);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.renderThumbnail}
   *
   * @public
   */
  renderThumbnail(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
  ): Task<ImageData, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderThumbnail',
      doc,
      page,
      scaleFactor,
      rotation,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `RenderThumbnail`,
      'Begin',
      `${doc.id}-${page.index}`,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `RenderThumbnail`,
        'End',
        `${doc.id}-${page.index}`,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    scaleFactor = Math.max(scaleFactor, 0.5);
    const result = this.renderPage(doc, page, scaleFactor, rotation, {
      withAnnotations: true,
    });
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `RenderThumbnail`,
      'End',
      `${doc.id}-${page.index}`,
    );

    return result;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.startSearch}
   *
   * @public
   */
  startSearch(
    doc: PdfDocumentObject,
    contextId: number,
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'startSearch', doc, contextId);
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `StartSearch`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `StartSearch`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `StartSearch`, 'End', doc.id);
    return TaskBase.resolve(true);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.searchNext}
   *
   * @public
   */
  searchNext(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget,
  ): Task<SearchResult | undefined, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'searchNext',
      doc,
      contextId,
      target,
    );
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchNext`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchNext`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { keyword, flags } = target;
    const searchContext = this.setupSearchContext(
      doc,
      contextId,
      keyword,
      flags,
    );

    if (searchContext.currPageIndex === doc.pageCount) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchNext`, 'End', doc.id);
      return TaskBase.resolve<SearchResult | undefined>(undefined);
    }

    const { docPtr } = this.docs[doc.id];
    let pageIndex = searchContext.currPageIndex;
    let startIndex = searchContext.startIndex;

    const length = 2 * (keyword.length + 1);
    const keywordPtr = this.malloc(length);
    this.pdfiumModule.pdfium.stringToUTF16(keyword, keywordPtr, length);

    const flag = flags.reduce((flag: MatchFlag, currFlag: MatchFlag) => {
      return flag | currFlag;
    }, MatchFlag.None);

    while (pageIndex < doc.pageCount) {
      const result = this.searchTextInPage(
        docPtr,
        pageIndex,
        startIndex,
        keywordPtr,
        flag,
      );
      if (result) {
        searchContext.currPageIndex = result.pageIndex;
        searchContext.startIndex = result.charIndex + result.charCount;
        this.free(keywordPtr);

        this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchNext`, 'End', doc.id);
        return TaskBase.resolve<SearchResult | undefined>(result);
      }

      pageIndex++;
      startIndex = 0;
      searchContext.currPageIndex = pageIndex;
      searchContext.startIndex = startIndex;
    }
    this.free(keywordPtr);

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchNext`, 'End', doc.id);
    return TaskBase.resolve<SearchResult | undefined>(undefined);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.searchPrev}
   *
   * @public
   */
  searchPrev(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget,
  ): Task<SearchResult | undefined, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'searchPrev',
      doc,
      contextId,
      target,
    );
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchPrev`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchPrev`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { keyword, flags } = target;
    const searchContext = this.setupSearchContext(
      doc,
      contextId,
      keyword,
      flags,
    );

    if (searchContext.currPageIndex === -1) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchPrev`, 'End', doc.id);
      return TaskBase.resolve<SearchResult | undefined>(undefined);
    }

    const { docPtr } = this.docs[doc.id];
    let pageIndex = searchContext.currPageIndex;
    let startIndex = searchContext.startIndex;

    const length = 2 * (keyword.length + 1);
    const keywordPtr = this.malloc(length);
    this.pdfiumModule.pdfium.stringToUTF16(keyword, keywordPtr, length);

    const flag = target.flags.reduce((flag: MatchFlag, currFlag: MatchFlag) => {
      return flag | currFlag;
    }, MatchFlag.None);

    while (pageIndex < doc.pageCount) {
      const result = this.searchTextInPage(
        docPtr,
        pageIndex,
        startIndex,
        keywordPtr,
        flag,
      );
      if (result) {
        searchContext.currPageIndex = pageIndex;
        searchContext.startIndex = result.charIndex + result.charCount;
        this.free(keywordPtr);

        this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchPrev`, 'End', doc.id);
        return TaskBase.resolve<SearchResult | undefined>(result);
      }

      pageIndex--;
      startIndex = 0;
      searchContext.currPageIndex = pageIndex;
      searchContext.startIndex = startIndex;
    }

    this.free(keywordPtr);

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SearchPrev`, 'End', doc.id);
    return TaskBase.resolve<SearchResult | undefined>(undefined);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.stopSearch}
   *
   * @public
   */
  stopSearch(
    doc: PdfDocumentObject,
    contextId: number,
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'stopSearch', doc, contextId);
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `StopSearch`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `StopSearch`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { searchContexts } = this.docs[doc.id];
    if (searchContexts) {
      searchContexts.delete(contextId);
    }

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `StopSearch`, 'End', doc.id);
    return TaskBase.resolve(true);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getAttachments}
   *
   * @public
   */
  getAttachments(
    doc: PdfDocumentObject,
  ): Task<PdfAttachmentObject[], PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getAttachments', doc);
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `GetAttachments`,
      'Begin',
      doc.id,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `GetAttachments`,
        'End',
        doc.id,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const attachments: PdfAttachmentObject[] = [];

    const { docPtr } = this.docs[doc.id];
    const count = this.pdfiumModule.FPDFDoc_GetAttachmentCount(docPtr);
    for (let i = 0; i < count; i++) {
      const attachment = this.readPdfAttachment(docPtr, i);
      attachments.push(attachment);
    }

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `GetAttachments`, 'End', doc.id);
    return TaskBase.resolve(attachments);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.readAttachmentContent}
   *
   * @public
   */
  readAttachmentContent(
    doc: PdfDocumentObject,
    attachment: PdfAttachmentObject,
  ): Task<ArrayBuffer, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'readAttachmentContent',
      doc,
      attachment,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `ReadAttachmentContent`,
      'Begin',
      doc.id,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `ReadAttachmentContent`,
        'End',
        doc.id,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const attachmentPtr = this.pdfiumModule.FPDFDoc_GetAttachment(
      docPtr,
      attachment.index,
    );
    const sizePtr = this.malloc(8);
    if (
      !this.pdfiumModule.FPDFAttachment_GetFile(attachmentPtr, 0, 0, sizePtr)
    ) {
      this.free(sizePtr);
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `ReadAttachmentContent`,
        'End',
        doc.id,
      );
      return TaskBase.reject(
        new PdfEngineError('can not read attachment size'),
      );
    }
    const size = this.pdfiumModule.pdfium.getValue(sizePtr, 'i64');

    const contentPtr = this.malloc(size);
    if (
      !this.pdfiumModule.FPDFAttachment_GetFile(
        attachmentPtr,
        contentPtr,
        size,
        sizePtr,
      )
    ) {
      this.free(sizePtr);
      this.free(contentPtr);
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `ReadAttachmentContent`,
        'End',
        doc.id,
      );

      return TaskBase.reject(
        new PdfEngineError('can not read attachment content'),
      );
    }

    const buffer = new ArrayBuffer(size);
    const view = new DataView(buffer);
    for (let i = 0; i < size; i++) {
      view.setInt8(i, this.pdfiumModule.pdfium.getValue(contentPtr + i, 'i8'));
    }

    this.free(sizePtr);
    this.free(contentPtr);
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `ReadAttachmentContent`,
      'End',
      doc.id,
    );

    return TaskBase.resolve(buffer);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.extractPages}
   *
   * @public
   */
  extractPages(
    doc: PdfDocumentObject,
    pageIndexes: number[],
  ): Task<ArrayBuffer, Error> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'extractPages',
      doc,
      pageIndexes,
    );
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `ExtractPages`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `ExtractPages`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];

    const newDocPtr = this.pdfiumModule.FPDF_CreateNewDocument();
    if (!newDocPtr) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `ExtractPages`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('can not create new document'));
    }

    const pageIndexesPtr = this.malloc(pageIndexes.length * 4);
    for (let i = 0; i < pageIndexes.length; i++) {
      this.pdfiumModule.pdfium.setValue(
        pageIndexesPtr + i * 4,
        pageIndexes[i],
        'i32',
      );
    }

    if (
      !this.pdfiumModule.FPDF_ImportPagesByIndex(
        newDocPtr,
        docPtr,
        pageIndexesPtr,
        pageIndexes.length,
        0,
      )
    ) {
      this.pdfiumModule.FPDF_CloseDocument(newDocPtr);
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `ExtractPages`, 'End', doc.id);
      return TaskBase.reject(
        new PdfEngineError('can not import pages to new document'),
      );
    }

    const buffer = this.saveDocument(newDocPtr);

    this.pdfiumModule.FPDF_CloseDocument(newDocPtr);

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `ExtractPages`, 'End', doc.id);
    return TaskBase.resolve(buffer);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.extractText}
   *
   * @public
   */
  extractText(
    doc: PdfDocumentObject,
    pageIndexes: number[],
  ): Task<string, Error> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'extractText',
      doc,
      pageIndexes,
    );
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `ExtractText`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `ExtractText`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const strings: string[] = [];
    for (let i = 0; i < pageIndexes.length; i++) {
      const pagePtr = this.pdfiumModule.FPDF_LoadPage(docPtr, pageIndexes[i]);
      const textPagePtr = this.pdfiumModule.FPDFText_LoadPage(pagePtr);
      const charCount = this.pdfiumModule.FPDFText_CountChars(textPagePtr);
      const bufferPtr = this.malloc((charCount + 1) * 2);
      this.pdfiumModule.FPDFText_GetText(textPagePtr, 0, charCount, bufferPtr);
      const text = this.pdfiumModule.pdfium.UTF16ToString(bufferPtr);
      this.free(bufferPtr);
      strings.push(text);
    }

    const text = strings.join('\n\n');
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `ExtractText`, 'End', doc.id);
    return TaskBase.resolve(text);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.merge}
   *
   * @public
   */
  merge(files: PdfFile[]): Task<PdfFile, Error> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'merge', files);
    const fileIds = files.map((file) => file.id).join('.');
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `Merge`, 'Begin', fileIds);

    const newDocPtr = this.pdfiumModule.FPDF_CreateNewDocument();
    if (!newDocPtr) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `Merge`, 'End', fileIds);
      return TaskBase.reject(new PdfEngineError('can not create new document'));
    }

    const ptrs: { docPtr: number; filePtr: number }[] = [];
    for (const file of files.reverse()) {
      const array = new Uint8Array(file.content);
      const length = array.length;
      const filePtr = this.malloc(length);
      this.pdfiumModule.pdfium.HEAPU8.set(array, filePtr);

      const docPtr = this.pdfiumModule.FPDF_LoadMemDocument(filePtr, length, 0);
      if (!docPtr) {
        const lastError = this.pdfiumModule.FPDF_GetLastError();
        this.logger.error(
          LOG_SOURCE,
          LOG_CATEGORY,
          `FPDF_LoadMemDocument failed with ${lastError}`,
        );
        this.free(filePtr);

        for (const ptr of ptrs) {
          this.pdfiumModule.FPDF_CloseDocument(ptr.docPtr);
          this.free(ptr.filePtr);
        }

        this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `Merge`, 'End', fileIds);
        return TaskBase.reject<PdfFile>(
          new PdfEngineError(`FPDF_LoadMemDocument failed`, lastError),
        );
      }
      ptrs.push({ filePtr, docPtr });

      if (!this.pdfiumModule.FPDF_ImportPages(newDocPtr, docPtr, 0, 0)) {
        this.pdfiumModule.FPDF_CloseDocument(newDocPtr);

        for (const ptr of ptrs) {
          this.pdfiumModule.FPDF_CloseDocument(ptr.docPtr);
          this.free(ptr.filePtr);
        }

        this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `Merge`, 'End', fileIds);
        return TaskBase.reject(
          new PdfEngineError('can not import pages to new document'),
        );
      }
    }
    const buffer = this.saveDocument(newDocPtr);

    this.pdfiumModule.FPDF_CloseDocument(newDocPtr);

    for (const ptr of ptrs) {
      this.pdfiumModule.FPDF_CloseDocument(ptr.docPtr);
      this.free(ptr.filePtr);
    }

    const file: PdfFile = {
      id: `${Math.random()}`,
      name: `merged.${Math.random()}.pdf`,
      content: buffer,
    };
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `Merge`, 'End', fileIds);
    return TaskBase.resolve(file);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.saveAsCopy}
   *
   * @public
   */
  saveAsCopy(doc: PdfDocumentObject): Task<ArrayBuffer, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'saveAsCopy', doc);
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SaveAsCopy`, 'Begin', doc.id);

    if (!this.docs[doc.id]) {
      this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SaveAsCopy`, 'End', doc.id);
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const { docPtr } = this.docs[doc.id];
    const buffer = this.saveDocument(docPtr);

    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `SaveAsCopy`, 'End', doc.id);
    return TaskBase.resolve(buffer);
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.closeDocument}
   *
   * @public
   */
  closeDocument(doc: PdfDocumentObject): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'closeDocument', doc);
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `CloseDocument`,
      'Begin',
      doc.id,
    );

    if (!this.docs[doc.id]) {
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `CloseDocument`,
        'End',
        doc.id,
      );
      return TaskBase.reject(new PdfEngineError('document does not exist'));
    }

    const docData = this.docs[doc.id];
    if (!docData) {
      this.logger.error(
        LOG_SOURCE,
        LOG_CATEGORY,
        `can not close document ${doc.id}`,
      );
      this.logger.perf(
        LOG_SOURCE,
        LOG_CATEGORY,
        `CloseDocument`,
        'End',
        doc.id,
      );
      return TaskBase.reject<boolean>(
        new PdfEngineError(`can not close document ${doc.id}`),
      );
    }

    const { docPtr, filePtr } = this.docs[doc.id];
    this.pdfiumModule.FPDF_CloseDocument(docPtr);
    this.free(filePtr);
    delete this.docs[doc.id];
    this.logger.perf(LOG_SOURCE, LOG_CATEGORY, `CloseDocument`, 'End', doc.id);
    return TaskBase.resolve(true);
  }

  /**
   * Memory allocation
   * @param size - size of memory space
   * @returns pointer to memory space
   *
   * @public
   */
  malloc(size: number) {
    const ptr = this.pdfiumModule.pdfium.wasmExports.malloc(size);
    for (let i = 0; i < size; i++) {
      this.pdfiumModule.pdfium.HEAP8[ptr + i] = 0;
    }

    return ptr;
  }

  /**
   * Free memory space
   * @param ptr pointer to memory space
   *
   * @public
   */
  free(ptr: number) {
    this.pdfiumModule.pdfium.wasmExports.free(ptr);
  }

  /**
   * Set the rect of specified annotation
   * @param page - page info that the annotation is belonged to
   * @param pagePtr - pointer of page object
   * @param annotationPtr - pointer to annotation object
   * @param inkList - ink lists that added to the annotation
   * @returns whether the ink lists is setted
   *
   * @private
   */
  addInkStroke(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    inkList: PdfInkListObject[],
  ) {
    for (const inkStroke of inkList) {
      const inkPointsCount = inkStroke.points.length;
      const inkPointsPtr = this.malloc(inkPointsCount * 8);
      for (let i = 0; i < inkPointsCount; i++) {
        const point = inkStroke.points[i];
        const { x, y } = this.convertDevicePointToPagePoint(page, point);

        this.pdfiumModule.pdfium.setValue(inkPointsPtr + i * 8, x, 'float');
        this.pdfiumModule.pdfium.setValue(inkPointsPtr + i * 8 + 4, y, 'float');
      }

      if (
        this.pdfiumModule.FPDFAnnot_AddInkStroke(
          annotationPtr,
          inkPointsPtr,
          inkPointsCount,
        ) === -1
      ) {
        this.free(inkPointsPtr);
        return false;
      }

      this.free(inkPointsPtr);
    }

    return true;
  }

  /**
   * Add contents to stamp annotation
   * @param docPtr - pointer to pdf document object
   * @param page - page info
   * @param pagePtr - pointer to page object
   * @param annotationPtr - pointer to stamp annotation
   * @param rect - rect of stamp annotation
   * @param contents - contents of stamp annotation
   * @returns whether contents is added to annotation
   *
   * @private
   */
  addStampContent(
    docPtr: number,
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    rect: Rect,
    contents: PdfStampAnnoObjectContents,
  ) {
    for (const content of contents) {
      switch (content.type) {
        case PdfPageObjectType.IMAGE:
          return this.addImageObject(
            docPtr,
            page,
            pagePtr,
            annotationPtr,
            rect.origin,
            content.imageData,
          );
      }
    }

    return false;
  }

  /**
   * Add image object to annotation
   * @param docPtr - pointer to pdf document object
   * @param page - page info
   * @param pagePtr - pointer to page object
   * @param annotationPtr - pointer to stamp annotation
   * @param position - position of image
   * @param imageData - data of image
   * @returns whether image is added to annotation
   *
   * @private
   */
  addImageObject(
    docPtr: number,
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    position: Position,
    imageData: ImageData,
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

      this.pdfiumModule.pdfium.setValue(
        bitmapBufferPtr + i * bytesPerPixel,
        blue,
        'i8',
      );
      this.pdfiumModule.pdfium.setValue(
        bitmapBufferPtr + i * bytesPerPixel + 1,
        green,
        'i8',
      );
      this.pdfiumModule.pdfium.setValue(
        bitmapBufferPtr + i * bytesPerPixel + 2,
        red,
        'i8',
      );
      this.pdfiumModule.pdfium.setValue(
        bitmapBufferPtr + i * bytesPerPixel + 3,
        alpha,
        'i8',
      );
    }

    const format = BitmapFormat.Bitmap_BGRA;
    const bitmapPtr = this.pdfiumModule.FPDFBitmap_CreateEx(
      imageData.width,
      imageData.height,
      format,
      bitmapBufferPtr,
      0,
    );
    if (!bitmapPtr) {
      this.free(bitmapBufferPtr);
      return false;
    }

    const imageObjectPtr = this.pdfiumModule.FPDFPageObj_NewImageObj(docPtr);
    if (!imageObjectPtr) {
      this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
      this.free(bitmapBufferPtr);
      return false;
    }

    if (
      !this.pdfiumModule.FPDFImageObj_SetBitmap(
        pagePtr,
        0,
        imageObjectPtr,
        bitmapPtr,
      )
    ) {
      this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
      this.pdfiumModule.FPDFPageObj_Destroy(imageObjectPtr);
      this.free(bitmapBufferPtr);
      return false;
    }

    const matrixPtr = this.malloc(6 * 4);
    this.pdfiumModule.pdfium.setValue(matrixPtr, imageData.width, 'float');
    this.pdfiumModule.pdfium.setValue(matrixPtr + 4, 0, 'float');
    this.pdfiumModule.pdfium.setValue(matrixPtr + 8, 0, 'float');
    this.pdfiumModule.pdfium.setValue(
      matrixPtr + 12,
      imageData.height,
      'float',
    );
    this.pdfiumModule.pdfium.setValue(matrixPtr + 16, 0, 'float');
    this.pdfiumModule.pdfium.setValue(matrixPtr + 20, 0, 'float');
    if (!this.pdfiumModule.FPDFPageObj_SetMatrix(imageObjectPtr, matrixPtr)) {
      this.free(matrixPtr);
      this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
      this.pdfiumModule.FPDFPageObj_Destroy(imageObjectPtr);
      this.free(bitmapBufferPtr);
      return false;
    }
    this.free(matrixPtr);

    this.pdfiumModule.FPDFPageObj_Transform(
      imageObjectPtr,
      1,
      0,
      0,
      1,
      position.x,
      position.y,
    );

    if (
      !this.pdfiumModule.FPDFAnnot_AppendObject(annotationPtr, imageObjectPtr)
    ) {
      this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
      this.pdfiumModule.FPDFPageObj_Destroy(imageObjectPtr);
      this.free(bitmapBufferPtr);
      return false;
    }

    this.pdfiumModule.FPDFPage_GenerateContent(pagePtr);
    this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
    this.free(bitmapBufferPtr);

    return true;
  }

  /**
   * Save document to array buffer
   * @param docPtr - pointer to pdf document
   * @returns array buffer contains the pdf content
   *
   * @private
   */
  saveDocument(docPtr: number) {
    const writerPtr = this.pdfiumModule.PDFium_OpenFileWriter();
    this.pdfiumModule.PDFium_SaveAsCopy(docPtr, writerPtr);
    const size = this.pdfiumModule.PDFium_GetFileWriterSize(writerPtr);
    const dataPtr = this.malloc(size);
    this.pdfiumModule.PDFium_GetFileWriterData(writerPtr, dataPtr, size);
    const buffer = new ArrayBuffer(size);
    const view = new DataView(buffer);
    for (let i = 0; i < size; i++) {
      view.setInt8(i, this.pdfiumModule.pdfium.getValue(dataPtr + i, 'i8'));
    }
    this.free(dataPtr);
    this.pdfiumModule.PDFium_CloseFileWriter(writerPtr);

    return buffer;
  }

  /**
   * Read metadata from pdf document
   * @param docPtr - pointer to pdf document
   * @param key - key of metadata field
   * @returns metadata value
   *
   * @private
   */
  readMetaText(docPtr: number, key: string) {
    return readString(
      this.pdfiumModule.pdfium,
      (buffer, bufferLength) => {
        return this.pdfiumModule.FPDF_GetMetaText(
          docPtr,
          key,
          buffer,
          bufferLength,
        );
      },
      this.pdfiumModule.pdfium.UTF16ToString,
    );
  }

  /**
   * Setup search context
   * @param doc - pdf document info
   * @param contextId - id of context
   * @param keyword - keyword for searching
   * @param flags - flags for matching keywords
   * @returns new search context
   *
   * @private
   */
  setupSearchContext(
    doc: PdfDocumentObject,
    contextId: number,
    keyword: string,
    flags: MatchFlag[],
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

  /**
   * Search text in pdf page
   * @param docPtr - pointer to pdf document
   * @param pageIndex - index of pdf page
   * @param startIndex - start index of text
   * @param keywordPtr - pointer to keyword
   * @param flag - matching flags
   * @returns search result
   *
   * @private
   */
  searchTextInPage(
    docPtr: number,
    pageIndex: number,
    startIndex: number,
    keywordPtr: number,
    flag: number,
  ): SearchResult | undefined {
    const pagePtr = this.pdfiumModule.FPDF_LoadPage(docPtr, pageIndex);
    const textPagePtr = this.pdfiumModule.FPDFText_LoadPage(pagePtr);

    let result: SearchResult | undefined;
    const searchHandle = this.pdfiumModule.FPDFText_FindStart(
      textPagePtr,
      keywordPtr,
      flag,
      startIndex,
    );
    const found = this.pdfiumModule.FPDFText_FindNext(searchHandle);
    if (found) {
      const charIndex =
        this.pdfiumModule.FPDFText_GetSchResultIndex(searchHandle);
      const charCount = this.pdfiumModule.FPDFText_GetSchCount(searchHandle);

      result = {
        pageIndex,
        charIndex,
        charCount,
      };
    }

    this.pdfiumModule.FPDFText_FindClose(searchHandle);
    this.pdfiumModule.FPDFText_ClosePage(textPagePtr);
    this.pdfiumModule.FPDF_ClosePage(pagePtr);

    return result;
  }

  /**
   * Read bookmarks in the pdf document
   * @param docPtr - pointer to pdf document
   * @param rootBookmarkPtr - pointer to root bookmark
   * @returns bookmarks in the pdf document
   *
   * @private
   */
  readPdfBookmarks(docPtr: number, rootBookmarkPtr = 0) {
    let bookmarkPtr = this.pdfiumModule.FPDFBookmark_GetFirstChild(
      docPtr,
      rootBookmarkPtr,
    );

    const bookmarks: PdfBookmarkObject[] = [];
    while (bookmarkPtr) {
      const bookmark = this.readPdfBookmark(docPtr, bookmarkPtr);
      bookmarks.push(bookmark);

      const nextBookmarkPtr = this.pdfiumModule.FPDFBookmark_GetNextSibling(
        docPtr,
        bookmarkPtr,
      );

      bookmarkPtr = nextBookmarkPtr;
    }

    return bookmarks;
  }

  /**
   * Read bookmark in the pdf document
   * @param docPtr - pointer to pdf document
   * @param bookmarkPtr - pointer to bookmark object
   * @returns pdf bookmark object
   *
   * @private
   */
  private readPdfBookmark(
    docPtr: number,
    bookmarkPtr: number,
  ): PdfBookmarkObject {
    const title = readString(
      this.pdfiumModule.pdfium,
      (buffer, bufferLength) => {
        return this.pdfiumModule.FPDFBookmark_GetTitle(
          bookmarkPtr,
          buffer,
          bufferLength,
        );
      },
      this.pdfiumModule.pdfium.UTF16ToString,
    );

    const bookmarks = this.readPdfBookmarks(docPtr, bookmarkPtr);

    const target = this.readPdfBookmarkTarget(
      docPtr,
      () => {
        return this.pdfiumModule.FPDFBookmark_GetAction(bookmarkPtr);
      },
      () => {
        return this.pdfiumModule.FPDFBookmark_GetDest(docPtr, bookmarkPtr);
      },
    );

    return {
      title,
      target,
      children: bookmarks,
    };
  }

  /**
   * Read text rects in pdf page
   * @param page - pdf page info
   * @param docPtr - pointer to pdf document
   * @param pagePtr - pointer to pdf page
   * @param textPagePtr - pointer to pdf text page
   * @returns text rects in the pdf page
   *
   * @public
   */
  private readPageTextRects(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number,
  ) {
    const rectsCount = this.pdfiumModule.FPDFText_CountRects(
      textPagePtr,
      0,
      -1,
    );

    const textRects: PdfTextRectObject[] = [];
    for (let i = 0; i < rectsCount; i++) {
      const topPtr = this.malloc(8);
      const leftPtr = this.malloc(8);
      const rightPtr = this.malloc(8);
      const bottomPtr = this.malloc(8);
      const isSucceed = this.pdfiumModule.FPDFText_GetRect(
        textPagePtr,
        i,
        leftPtr,
        topPtr,
        rightPtr,
        bottomPtr,
      );
      if (!isSucceed) {
        this.free(leftPtr);
        this.free(topPtr);
        this.free(rightPtr);
        this.free(bottomPtr);
        continue;
      }

      const left = this.pdfiumModule.pdfium.getValue(leftPtr, 'double');
      const top = this.pdfiumModule.pdfium.getValue(topPtr, 'double');
      const right = this.pdfiumModule.pdfium.getValue(rightPtr, 'double');
      const bottom = this.pdfiumModule.pdfium.getValue(bottomPtr, 'double');

      this.free(leftPtr);
      this.free(topPtr);
      this.free(rightPtr);
      this.free(bottomPtr);

      const deviceXPtr = this.malloc(4);
      const deviceYPtr = this.malloc(4);
      this.pdfiumModule.FPDF_PageToDevice(
        pagePtr,
        0,
        0,
        page.size.width,
        page.size.height,
        0,
        left,
        top,
        deviceXPtr,
        deviceYPtr,
      );
      const x = this.pdfiumModule.pdfium.getValue(deviceXPtr, 'i32');
      const y = this.pdfiumModule.pdfium.getValue(deviceYPtr, 'i32');
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

      const utf16Length = this.pdfiumModule.FPDFText_GetBoundedText(
        textPagePtr,
        left,
        top,
        right,
        bottom,
        0,
        0,
      );
      const bytesCount = (utf16Length + 1) * 2; // include NIL
      const textBuffer = this.malloc(bytesCount);
      this.pdfiumModule.FPDFText_GetBoundedText(
        textPagePtr,
        left,
        top,
        right,
        bottom,
        textBuffer,
        utf16Length,
      );
      const content = this.pdfiumModule.pdfium.UTF16ToString(textBuffer);
      this.free(textBuffer);

      const charIndex = this.pdfiumModule.FPDFText_GetCharIndexAtPos(
        textPagePtr,
        left,
        top,
        2,
        2,
      );
      let fontFamily = '';
      let fontSize = rect.size.height;
      if (charIndex >= 0) {
        fontSize = this.pdfiumModule.FPDFText_GetFontSize(
          textPagePtr,
          charIndex,
        );

        const fontNameLength = this.pdfiumModule.FPDFText_GetFontInfo(
          textPagePtr,
          charIndex,
          0,
          0,
          0,
        );

        const bytesCount = fontNameLength + 1; // include NIL
        const textBufferPtr = this.malloc(bytesCount);
        const flagsPtr = this.malloc(4);
        this.pdfiumModule.FPDFText_GetFontInfo(
          textPagePtr,
          charIndex,
          textBufferPtr,
          bytesCount,
          flagsPtr,
        );
        fontFamily = this.pdfiumModule.pdfium.UTF8ToString(textBufferPtr);
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

  /**
   * Read page annotations
   * @param page - page info
   * @param docPtr - pointer to pdf document
   * @param pagePtr - pointer to pdf page
   * @param textPagePtr - pointe to pdf text page
   * @param scaleFactor - scale factor
   * @param rotation - rotation angle
   * @returns annotations on the pdf page
   *
   * @private
   */
  private readPageAnnotations(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number,
    scaleFactor: number,
    rotation: Rotation,
  ) {
    const formFillInfoPtr = this.pdfiumModule.PDFium_OpenFormFillInfo();
    const formHandle = this.pdfiumModule.PDFium_InitFormFillEnvironment(
      docPtr,
      formFillInfoPtr,
    );

    const annotationCount = this.pdfiumModule.FPDFPage_GetAnnotCount(pagePtr);

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
        rotation,
      );
      if (annotation) {
        annotations.push(annotation);
      }
    }

    this.pdfiumModule.PDFium_ExitFormFillEnvironment(formHandle);
    this.pdfiumModule.PDFium_CloseFormFillInfo(formFillInfoPtr);

    return annotations;
  }

  /**
   * Read pdf annotation from pdf document
   * @param page  - pdf page infor
   * @param docPtr - pointer to pdf document object
   * @param pagePtr - pointer to pdf page object
   * @param  textPagePtr - pointer to pdf text page object
   * @param formHandle - form handle
   * @param index - index of annotation in the pdf page
   * @param scaleFactor  - factor of scalling
   * @param rotation  - rotation angle
   * @returns pdf annotation
   *
   * @private
   */
  private readPageAnnotation(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number,
    formHandle: number,
    index: number,
    scaleFactor: number,
    rotation: Rotation,
  ) {
    const annotationPtr = this.pdfiumModule.FPDFPage_GetAnnot(pagePtr, index);
    const subType = this.pdfiumModule.FPDFAnnot_GetSubtype(
      annotationPtr,
    ) as PdfAnnotationObject['type'];
    let annotation: PdfAnnotationObject | undefined;
    switch (subType) {
      case PdfAnnotationSubtype.TEXT:
        {
          annotation = this.readPdfTextAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.FREETEXT:
        {
          annotation = this.readPdfFreeTextAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
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
            index,
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
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.FILEATTACHMENT:
        {
          annotation = this.readPdfFileAttachmentAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
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
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.POLYLINE:
        {
          annotation = this.readPdfPolylineAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.LINE:
        {
          annotation = this.readPdfLineAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.HIGHLIGHT:
        annotation = this.readPdfHighlightAnno(
          page,
          pagePtr,
          annotationPtr,
          index,
        );
        break;
      case PdfAnnotationSubtype.STAMP:
        {
          annotation = this.readPdfStampAnno(
            docPtr,
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.SQUARE:
        {
          annotation = this.readPdfSquareAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.CIRCLE:
        {
          annotation = this.readPdfCircleAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.UNDERLINE:
        {
          annotation = this.readPdfUnderlineAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.SQUIGGLY:
        {
          annotation = this.readPdfSquigglyAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.STRIKEOUT:
        {
          annotation = this.readPdfStrikeOutAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
          );
        }
        break;
      case PdfAnnotationSubtype.CARET:
        {
          annotation = this.readPdfCaretAnno(
            page,
            pagePtr,
            annotationPtr,
            index,
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
            index,
          );
        }
        break;
    }
    this.pdfiumModule.FPDFPage_CloseAnnot(annotationPtr);

    return annotation;
  }

  /**
   * Read pdf text annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf text annotation
   *
   * @private
   */
  private readPdfTextAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfTextAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const annoRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);

    const utf16Length = this.pdfiumModule.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      0,
      0,
    );
    const bytesCount = (utf16Length + 1) * 2; // include NIL
    const contentBufferPtr = this.malloc(bytesCount);
    this.pdfiumModule.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      contentBufferPtr,
      bytesCount,
    );
    const contents = this.pdfiumModule.pdfium.UTF16ToString(contentBufferPtr);
    this.free(contentBufferPtr);

    const redPtr = this.malloc(4);
    const greenPtr = this.malloc(4);
    const bluePtr = this.malloc(4);
    const alphaPtr = this.malloc(4);

    this.pdfiumModule.FPDFAnnot_GetColor(
      annotationPtr,
      0,
      redPtr,
      greenPtr,
      bluePtr,
      alphaPtr,
    );
    const red = this.pdfiumModule.pdfium.getValue(redPtr, 'i32');
    const green = this.pdfiumModule.pdfium.getValue(redPtr, 'i32');
    const blue = this.pdfiumModule.pdfium.getValue(redPtr, 'i32');
    const alpha = this.pdfiumModule.pdfium.getValue(redPtr, 'i32');

    this.free(redPtr);
    this.free(greenPtr);
    this.free(bluePtr);
    this.free(alphaPtr);

    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf freetext annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf freetext annotation
   *
   * @private
   */
  private readPdfFreeTextAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfFreeTextAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const annoRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);

    const utf16Length = this.pdfiumModule.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      0,
      0,
    );
    const bytesCount = (utf16Length + 1) * 2; // include NIL
    const contentBufferPtr = this.malloc(bytesCount);
    this.pdfiumModule.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      contentBufferPtr,
      bytesCount,
    );
    const contents = this.pdfiumModule.pdfium.UTF16ToString(contentBufferPtr);
    this.free(contentBufferPtr);

    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf link annotation from pdf document
   * @param page  - pdf page infor
   * @param docPtr - pointer to pdf document object
   * @param pagePtr - pointer to pdf page object
   * @param  textPagePtr - pointer to pdf text page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf link annotation
   *
   * @private
   */
  private readPdfLinkAnno(
    page: PdfPageObject,
    docPtr: number,
    pagePtr: number,
    textPagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfLinkAnnoObject | undefined {
    const linkPtr = this.pdfiumModule.FPDFAnnot_GetLink(annotationPtr);
    if (!linkPtr) {
      return;
    }

    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const annoRect = this.readPageAnnoRect(annotationPtr);
    const { left, top, right, bottom } = annoRect;
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, annoRect);

    const utf16Length = this.pdfiumModule.FPDFText_GetBoundedText(
      textPagePtr,
      left,
      top,
      right,
      bottom,
      0,
      0,
    );
    const bytesCount = (utf16Length + 1) * 2; // include NIL
    const textBufferPtr = this.malloc(bytesCount);
    this.pdfiumModule.FPDFText_GetBoundedText(
      textPagePtr,
      left,
      top,
      right,
      bottom,
      textBufferPtr,
      utf16Length,
    );
    const text = this.pdfiumModule.pdfium.UTF16ToString(textBufferPtr);
    this.free(textBufferPtr);

    const target = this.readPdfLinkAnnoTarget(
      docPtr,
      () => {
        return this.pdfiumModule.FPDFLink_GetAction(linkPtr);
      },
      () => {
        return this.pdfiumModule.FPDFLink_GetDest(docPtr, linkPtr);
      },
    );
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf widget annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param formHandle - form handle
   * @param index  - index of annotation in the pdf page
   * @returns pdf widget annotation
   *
   * @private
   */
  private readPdfWidgetAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    formHandle: number,
    index: number,
  ): PdfWidgetAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf file attachment annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf file attachment annotation
   *
   * @private
   */
  private readPdfFileAttachmentAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfFileAttachmentAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf ink annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf ink annotation
   *
   * @private
   */
  private readPdfInkAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfInkAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
    );

    const inkList: PdfInkListObject[] = [];

    const count = this.pdfiumModule.FPDFAnnot_GetInkListCount(annotationPtr);
    for (let i = 0; i < count; i++) {
      const points: Position[] = [];
      const pointsCount = this.pdfiumModule.FPDFAnnot_GetInkListPath(
        annotationPtr,
        i,
        0,
        0,
      );
      if (pointsCount > 0) {
        const pointMemorySize = 8;
        const pointsPtr = this.malloc(pointsCount * pointMemorySize);
        this.pdfiumModule.FPDFAnnot_GetInkListPath(
          annotationPtr,
          i,
          pointsPtr,
          pointsCount,
        );

        for (let j = 0; j < pointsCount; j++) {
          const pointX = this.pdfiumModule.pdfium.getValue(
            pointsPtr + j * 8,
            'float',
          );
          const pointY = this.pdfiumModule.pdfium.getValue(
            pointsPtr + j * 8 + 4,
            'float',
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

  /**
   * Read pdf polygon annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf polygon annotation
   *
   * @private
   */
  private readPdfPolygonAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfPolygonAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf polyline annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf polyline annotation
   *
   * @private
   */
  private readPdfPolylineAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfPolylineAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf line annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf line annotation
   *
   * @private
   */
  private readPdfLineAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfLineAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
    );
    const startPointPtr = this.malloc(8);
    const endPointPtr = this.malloc(8);

    this.pdfiumModule.FPDFAnnot_GetLine(
      annotationPtr,
      startPointPtr,
      endPointPtr,
    );

    const startPointX = this.pdfiumModule.pdfium.getValue(
      startPointPtr,
      'float',
    );
    const startPointY = this.pdfiumModule.pdfium.getValue(
      startPointPtr + 4,
      'float',
    );
    const startPoint = this.convertPagePointToDevicePoint(page, {
      x: startPointX,
      y: startPointY,
    });

    const endPointX = this.pdfiumModule.pdfium.getValue(endPointPtr, 'float');
    const endPointY = this.pdfiumModule.pdfium.getValue(
      endPointPtr + 4,
      'float',
    );
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

  /**
   * Read pdf highlight annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf highlight annotation
   *
   * @private
   */
  private readPdfHighlightAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfHighlightAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf underline annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf underline annotation
   *
   * @private
   */
  private readPdfUnderlineAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfUnderlineAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read strikeout annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf strikeout annotation
   *
   * @private
   */
  private readPdfStrikeOutAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfStrikeOutAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf squiggly annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf squiggly annotation
   *
   * @private
   */
  private readPdfSquigglyAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfSquigglyAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf caret annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf caret annotation
   *
   * @private
   */
  private readPdfCaretAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfCaretAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read pdf stamp annotation
   * @param docPtr - pointer to pdf document object
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf stamp annotation
   *
   * @private
   */
  private readPdfStampAnno(
    docPtr: number,
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfStampAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
    );
    const contents: PdfStampAnnoObject['contents'] = [];

    const objectCount =
      this.pdfiumModule.FPDFAnnot_GetObjectCount(annotationPtr);
    for (let i = 0; i < objectCount; i++) {
      const annotationObjectPtr = this.pdfiumModule.FPDFAnnot_GetObject(
        annotationPtr,
        i,
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

  /**
   * Read pdf object in pdf page
   * @param pageObjectPtr  - pointer to pdf object in page
   * @returns pdf object in page
   *
   * @private
   */
  private readPdfPageObject(pageObjectPtr: number) {
    const type = this.pdfiumModule.FPDFPageObj_GetType(
      pageObjectPtr,
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

  /**
   * Read pdf path object
   * @param pathObjectPtr  - pointer to pdf path object in page
   * @returns pdf path object
   *
   * @private
   */
  private readPathObject(pathObjectPtr: number): PdfPathObject {
    const segmentCount =
      this.pdfiumModule.FPDFPath_CountSegments(pathObjectPtr);

    const leftPtr = this.malloc(4);
    const bottomPtr = this.malloc(4);
    const rightPtr = this.malloc(4);
    const topPtr = this.malloc(4);
    this.pdfiumModule.FPDFPageObj_GetBounds(
      pathObjectPtr,
      leftPtr,
      bottomPtr,
      rightPtr,
      topPtr,
    );
    const left = this.pdfiumModule.pdfium.getValue(leftPtr, 'float');
    const bottom = this.pdfiumModule.pdfium.getValue(bottomPtr, 'float');
    const right = this.pdfiumModule.pdfium.getValue(rightPtr, 'float');
    const top = this.pdfiumModule.pdfium.getValue(topPtr, 'float');
    const bounds = { left, bottom, right, top };
    this.free(leftPtr);
    this.free(bottomPtr);
    this.free(rightPtr);
    this.free(topPtr);
    const segments: PdfSegmentObject[] = [];
    for (let i = 0; i < segmentCount; i++) {
      const segment = this.readPdfSegment(pathObjectPtr, i);
      segments.push(segment);
    }

    const matrix = this.readPdfPageObjectTransformMatrix(pathObjectPtr);

    return {
      type: PdfPageObjectType.PATH,
      bounds,
      segments,
      matrix,
    };
  }

  /**
   * Read segment of pdf path object
   * @param annotationObjectPtr - pointer to pdf path object
   * @param segmentIndex - index of segment
   * @returns pdf segment in pdf path
   *
   * @private
   */
  private readPdfSegment(
    annotationObjectPtr: number,
    segmentIndex: number,
  ): PdfSegmentObject {
    const segmentPtr = this.pdfiumModule.FPDFPath_GetPathSegment(
      annotationObjectPtr,
      segmentIndex,
    );
    const segmentType = this.pdfiumModule.FPDFPathSegment_GetType(segmentPtr);
    const isClosed = this.pdfiumModule.FPDFPathSegment_GetClose(segmentPtr);
    const pointXPtr = this.malloc(4);
    const pointYPtr = this.malloc(4);
    this.pdfiumModule.FPDFPathSegment_GetPoint(
      segmentPtr,
      pointXPtr,
      pointYPtr,
    );
    const pointX = this.pdfiumModule.pdfium.getValue(pointXPtr, 'float');
    const pointY = this.pdfiumModule.pdfium.getValue(pointYPtr, 'float');
    this.free(pointXPtr);
    this.free(pointYPtr);

    return {
      type: segmentType,
      point: { x: pointX, y: pointY },
      isClosed,
    };
  }

  /**
   * Read pdf image object from pdf document
   * @param pageObjectPtr  - pointer to pdf image object in page
   * @returns pdf image object
   *
   * @private
   */
  private readImageObject(imageObjectPtr: number): PdfImageObject {
    const bitmapPtr = this.pdfiumModule.FPDFImageObj_GetBitmap(imageObjectPtr);
    const bitmapBufferPtr = this.pdfiumModule.FPDFBitmap_GetBuffer(bitmapPtr);
    const bitmapWidth = this.pdfiumModule.FPDFBitmap_GetWidth(bitmapPtr);
    const bitmapHeight = this.pdfiumModule.FPDFBitmap_GetHeight(bitmapPtr);
    const format = this.pdfiumModule.FPDFBitmap_GetFormat(
      bitmapPtr,
    ) as BitmapFormat;

    const pixelCount = bitmapWidth * bitmapHeight;
    const bytesPerPixel = 4;
    const array = new Uint8ClampedArray(pixelCount * bytesPerPixel);
    for (let i = 0; i < pixelCount; i++) {
      switch (format) {
        case BitmapFormat.Bitmap_BGR:
          {
            const blue = this.pdfiumModule.pdfium.getValue(
              bitmapBufferPtr + i * 3,
              'i8',
            );
            const green = this.pdfiumModule.pdfium.getValue(
              bitmapBufferPtr + i * 3 + 1,
              'i8',
            );
            const red = this.pdfiumModule.pdfium.getValue(
              bitmapBufferPtr + i * 3 + 2,
              'i8',
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
    const matrix = this.readPdfPageObjectTransformMatrix(imageObjectPtr);

    return {
      type: PdfPageObjectType.IMAGE,
      imageData,
      matrix,
    };
  }

  /**
   * Read form object from pdf document
   * @param formObjectPtr  - pointer to pdf form object in page
   * @returns pdf form object
   *
   * @private
   */
  private readFormObject(formObjectPtr: number): PdfFormObject {
    const objectCount =
      this.pdfiumModule.FPDFFormObj_CountObjects(formObjectPtr);
    const objects: (PdfFormObject | PdfImageObject | PdfPathObject)[] = [];
    for (let i = 0; i < objectCount; i++) {
      const pageObjectPtr = this.pdfiumModule.FPDFFormObj_GetObject(
        formObjectPtr,
        i,
      );
      const pageObj = this.readPdfPageObject(pageObjectPtr);
      if (pageObj) {
        objects.push(pageObj);
      }
    }
    const matrix = this.readPdfPageObjectTransformMatrix(formObjectPtr);

    return {
      type: PdfPageObjectType.FORM,
      objects,
      matrix,
    };
  }

  /**
   * Read pdf object in pdf page
   * @param pageObjectPtr  - pointer to pdf object in page
   * @returns pdf object in page
   *
   * @private
   */
  private readPdfPageObjectTransformMatrix(
    pageObjectPtr: number,
  ): PdfTransformMatrix {
    const matrixPtr = this.malloc(4 * 6);
    if (this.pdfiumModule.FPDFPageObj_GetMatrix(pageObjectPtr, matrixPtr)) {
      const a = this.pdfiumModule.pdfium.getValue(matrixPtr, 'float');
      const b = this.pdfiumModule.pdfium.getValue(matrixPtr + 4, 'float');
      const c = this.pdfiumModule.pdfium.getValue(matrixPtr + 8, 'float');
      const d = this.pdfiumModule.pdfium.getValue(matrixPtr + 12, 'float');
      const e = this.pdfiumModule.pdfium.getValue(matrixPtr + 16, 'float');
      const f = this.pdfiumModule.pdfium.getValue(matrixPtr + 20, 'float');
      this.free(matrixPtr);

      return { a, b, c, d, e, f };
    }

    this.free(matrixPtr);

    return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
  }

  /**
   * Read circle annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf circle annotation
   *
   * @private
   */
  private readPdfCircleAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfCircleAnnoObject {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read square annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf square annotation
   *
   * @private
   */
  private readPdfSquareAnno(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfSquareAnnoObject {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read basic info of unsupported pdf annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param type - type of annotation
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf annotation
   *
   * @private
   */
  private readPdfAnno(
    page: PdfPageObject,
    pagePtr: number,
    type: PdfUnsupportedAnnoObject['type'],
    annotationPtr: number,
    index: number,
  ): PdfUnsupportedAnnoObject {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const pageRect = this.readPageAnnoRect(annotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);
    const popup = this.readPdfAnnoLinkedPopup(
      page,
      pagePtr,
      annotationPtr,
      index,
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

  /**
   * Read linked popup of pdf annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @param index  - index of annotation in the pdf page
   * @returns pdf popup linked to annotation
   *
   * @private
   */
  private readPdfAnnoLinkedPopup(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    index: number,
  ): PdfPopupAnnoObject | undefined {
    const appearence = this.readPageAnnoAppearanceStream(annotationPtr);
    const popupAnnotationPtr = this.pdfiumModule.FPDFAnnot_GetLinkedAnnot(
      annotationPtr,
      'Popup',
    );
    if (!popupAnnotationPtr) {
      return;
    }

    const pageRect = this.readPageAnnoRect(popupAnnotationPtr);
    const rect = this.convertPageRectToDeviceRect(page, pagePtr, pageRect);

    const contentsLength = this.pdfiumModule.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      0,
      0,
    );
    const contentsBytesCount = (contentsLength + 1) * 2; // include NIL
    const contentsPtr = this.malloc(contentsBytesCount);
    this.pdfiumModule.FPDFAnnot_GetStringValue(
      annotationPtr,
      'Contents',
      contentsPtr,
      contentsBytesCount,
    );
    const contents = this.pdfiumModule.pdfium.UTF16ToString(contentsPtr);
    this.free(contentsPtr);

    const openLength = this.pdfiumModule.FPDFAnnot_GetStringValue(
      popupAnnotationPtr,
      'Open',
      0,
      0,
    );
    const openBytesCount = (openLength + 1) * 2; // include NIL
    const openPtr = this.malloc(openBytesCount);
    this.pdfiumModule.FPDFAnnot_GetStringValue(
      popupAnnotationPtr,
      'Open',
      openPtr,
      openBytesCount,
    );
    const open = this.pdfiumModule.pdfium.UTF16ToString(openPtr);
    this.free(openPtr);

    this.pdfiumModule.FPDFPage_CloseAnnot(popupAnnotationPtr);

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

  /**
   * Read vertices of pdf annotation
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param annotationPtr - pointer to pdf annotation
   * @returns vertices of pdf annotation
   *
   * @private
   */
  private readPdfAnnoVertices(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
  ): Position[] {
    const vertices: Position[] = [];
    const count = this.pdfiumModule.FPDFAnnot_GetVertices(annotationPtr, 0, 0);
    const pointMemorySize = 8;
    const pointsPtr = this.malloc(count * pointMemorySize);
    this.pdfiumModule.FPDFAnnot_GetVertices(annotationPtr, pointsPtr, count);
    for (let i = 0; i < count; i++) {
      const pointX = this.pdfiumModule.pdfium.getValue(
        pointsPtr + i * pointMemorySize,
        'float',
      );
      const pointY = this.pdfiumModule.pdfium.getValue(
        pointsPtr + i * pointMemorySize + 4,
        'float',
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

  /**
   * Read the target of pdf bookmark
   * @param docPtr - pointer to pdf document object
   * @param getActionPtr - callback function to retrive the pointer of action
   * @param getDestinationPtr - callback function to retrive the pointer of destination
   * @returns target of pdf bookmark
   *
   * @private
   */
  private readPdfBookmarkTarget(
    docPtr: number,
    getActionPtr: () => number,
    getDestinationPtr: () => number,
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

  /**
   * Read field of pdf widget annotation
   * @param formHandle - form handle
   * @param annotationPtr - pointer to pdf annotation
   * @returns field of pdf widget annotation
   *
   * @private
   */
  private readPdfWidgetAnnoField(
    formHandle: number,
    annotationPtr: number,
  ): PdfWidgetAnnoField {
    const flag = this.pdfiumModule.FPDFAnnot_GetFormFieldFlags(
      formHandle,
      annotationPtr,
    ) as PDF_FORM_FIELD_FLAG;

    const type = this.pdfiumModule.FPDFAnnot_GetFormFieldType(
      formHandle,
      annotationPtr,
    ) as PDF_FORM_FIELD_TYPE;

    const name = readString(
      this.pdfiumModule.pdfium,
      (buffer: number, bufferLength) => {
        return this.pdfiumModule.FPDFAnnot_GetFormFieldName(
          formHandle,
          annotationPtr,
          buffer,
          bufferLength,
        );
      },
      this.pdfiumModule.pdfium.UTF16ToString,
    );

    const alternateName = readString(
      this.pdfiumModule.pdfium,
      (buffer: number, bufferLength) => {
        return this.pdfiumModule.FPDFAnnot_GetFormFieldAlternateName(
          formHandle,
          annotationPtr,
          buffer,
          bufferLength,
        );
      },
      this.pdfiumModule.pdfium.UTF16ToString,
    );

    const value = readString(
      this.pdfiumModule.pdfium,
      (buffer: number, bufferLength) => {
        return this.pdfiumModule.FPDFAnnot_GetFormFieldValue(
          formHandle,
          annotationPtr,
          buffer,
          bufferLength,
        );
      },
      this.pdfiumModule.pdfium.UTF16ToString,
    );

    const options: PdfWidgetAnnoOption[] = [];
    if (
      type === PDF_FORM_FIELD_TYPE.COMBOBOX ||
      type === PDF_FORM_FIELD_TYPE.LISTBOX
    ) {
      const count = this.pdfiumModule.FPDFAnnot_GetOptionCount(
        formHandle,
        annotationPtr,
      );
      for (let i = 0; i < count; i++) {
        const label = readString(
          this.pdfiumModule.pdfium,
          (buffer: number, bufferLength) => {
            return this.pdfiumModule.FPDFAnnot_GetOptionLabel(
              formHandle,
              annotationPtr,
              i,
              buffer,
              bufferLength,
            );
          },
          this.pdfiumModule.pdfium.UTF16ToString,
        );
        const isSelected = this.pdfiumModule.FPDFAnnot_IsOptionSelected(
          formHandle,
          annotationPtr,
          i,
        );
        options.push({
          label,
          isSelected,
        });
      }
    }

    let isChecked = false;
    if (type === PDF_FORM_FIELD_TYPE.CHECKBOX) {
      isChecked = this.pdfiumModule.FPDFAnnot_IsChecked(
        formHandle,
        annotationPtr,
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

  /**
   * render rectangle of pdf page to image
   * @param docPtr - pointer to pdf document object
   * @param page  - pdf page infor
   * @param rect - rectangle info
   * @param scaleFactor  - factor of scalling
   * @param rotation  - rotation angle
   * @param options - render options
   * @returns image data
   *
   * @private
   */
  private renderPageRectToImageData(
    docPtr: number,
    page: PdfPageObject,
    rect: Rect,
    scaleFactor: number,
    rotation: Rotation,
    options: PdfRenderOptions,
  ) {
    const format = BitmapFormat.Bitmap_BGRA;
    const bytesPerPixel = 4;
    const bitmapSize = transformSize(rect.size, rotation, scaleFactor * DPR);
    const bitmapHeapLength =
      bitmapSize.width * bitmapSize.height * bytesPerPixel;
    const bitmapHeapPtr = this.malloc(bitmapHeapLength);
    const bitmapPtr = this.pdfiumModule.FPDFBitmap_CreateEx(
      bitmapSize.width,
      bitmapSize.height,
      format,
      bitmapHeapPtr,
      bitmapSize.width * bytesPerPixel,
    );
    this.pdfiumModule.FPDFBitmap_FillRect(
      bitmapPtr,
      0,
      0,
      bitmapSize.width,
      bitmapSize.height,
      0xffffffff,
    );
    let flags = RenderFlag.REVERSE_BYTE_ORDER;
    if (options?.withAnnotations) {
      flags = flags | RenderFlag.ANNOT;
    }
    const pagePtr = this.pdfiumModule.FPDF_LoadPage(docPtr, page.index);
    this.pdfiumModule.FPDF_RenderPageBitmap(
      bitmapPtr,
      pagePtr,
      rect.origin.x,
      rect.origin.y,
      bitmapSize.width,
      bitmapSize.height,
      rotation,
      flags,
    );
    this.pdfiumModule.FPDFBitmap_Destroy(bitmapPtr);
    this.pdfiumModule.FPDF_ClosePage(pagePtr);

    const array = new Uint8ClampedArray(bitmapHeapLength);
    const dataView = new DataView(array.buffer);
    for (let i = 0; i < bitmapHeapLength; i++) {
      dataView.setInt8(
        i,
        this.pdfiumModule.pdfium.getValue(bitmapHeapPtr + i, 'i8'),
      );
    }
    this.free(bitmapHeapPtr);

    const imageData = new ImageData(array, bitmapSize.width, bitmapSize.height);

    return imageData;
  }

  /**
   * Read the target of pdf link annotation
   * @param docPtr - pointer to pdf document object
   * @param getActionPtr - callback function to retrive the pointer of action
   * @param getDestinationPtr - callback function to retrive the pointer of destination
   * @returns target of link
   *
   * @private
   */
  private readPdfLinkAnnoTarget(
    docPtr: number,
    getActionPtr: () => number,
    getDestinationPtr: () => number,
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

  /**
   * Read pdf action from pdf document
   * @param docPtr - pointer to pdf document object
   * @param actionPtr - pointer to pdf action object
   * @returns pdf action object
   *
   * @private
   */
  private readPdfAction(docPtr: number, actionPtr: number): PdfActionObject {
    const actionType = this.pdfiumModule.FPDFAction_GetType(
      actionPtr,
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
          const destinationPtr = this.pdfiumModule.FPDFAction_GetDest(
            docPtr,
            actionPtr,
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
            this.pdfiumModule.pdfium,
            (buffer, bufferLength) => {
              return this.pdfiumModule.FPDFAction_GetURIPath(
                docPtr,
                actionPtr,
                buffer,
                bufferLength,
              );
            },
            this.pdfiumModule.pdfium.UTF8ToString,
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
            this.pdfiumModule.pdfium,
            (buffer, bufferLength) => {
              return this.pdfiumModule.FPDFAction_GetFilePath(
                actionPtr,
                buffer,
                bufferLength,
              );
            },
            this.pdfiumModule.pdfium.UTF8ToString,
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

  /**
   * Read pdf destination object
   * @param docPtr - pointer to pdf document object
   * @param destinationPtr - pointer to pdf destination
   * @returns pdf destination object
   *
   * @private
   */
  private readPdfDestination(
    docPtr: number,
    destinationPtr: number,
  ): PdfDestinationObject {
    const pageIndex = this.pdfiumModule.FPDFDest_GetDestPageIndex(
      docPtr,
      destinationPtr,
    );
    // Every params is a float value
    const maxParmamsCount = 4;
    const paramsCountPtr = this.malloc(maxParmamsCount);
    const paramsPtr = this.malloc(maxParmamsCount * 4);
    const zoomMode = this.pdfiumModule.FPDFDest_GetView(
      destinationPtr,
      paramsCountPtr,
      paramsPtr,
    ) as PdfZoomMode;
    const paramsCount = this.pdfiumModule.pdfium.getValue(
      paramsCountPtr,
      'i32',
    );
    const view: number[] = [];
    for (let i = 0; i < paramsCount; i++) {
      const paramPtr = paramsPtr + i * 4;
      view.push(this.pdfiumModule.pdfium.getValue(paramPtr, 'float'));
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

      const isSucceed = this.pdfiumModule.FPDFDest_GetLocationInPage(
        destinationPtr,
        hasXPtr,
        hasYPtr,
        hasZPtr,
        xPtr,
        yPtr,
        zPtr,
      );
      if (isSucceed) {
        const hasX = this.pdfiumModule.pdfium.getValue(hasXPtr, 'i8');
        const hasY = this.pdfiumModule.pdfium.getValue(hasYPtr, 'i8');
        const hasZ = this.pdfiumModule.pdfium.getValue(hasZPtr, 'i8');

        const x = hasX ? this.pdfiumModule.pdfium.getValue(xPtr, 'float') : 0;
        const y = hasY ? this.pdfiumModule.pdfium.getValue(yPtr, 'float') : 0;
        const zoom = hasZ
          ? this.pdfiumModule.pdfium.getValue(zPtr, 'float')
          : 0;

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

  /**
   * Read attachmet from pdf document
   * @param docPtr - pointer to pdf document object
   * @param index - index of attachment
   * @returns attachment content
   *
   * @private
   */
  private readPdfAttachment(
    docPtr: number,
    index: number,
  ): PdfAttachmentObject {
    const attachmentPtr = this.pdfiumModule.FPDFDoc_GetAttachment(
      docPtr,
      index,
    );
    const name = readString(
      this.pdfiumModule.pdfium,
      (buffer, bufferLength) => {
        return this.pdfiumModule.FPDFAttachment_GetName(
          attachmentPtr,
          buffer,
          bufferLength,
        );
      },
      this.pdfiumModule.pdfium.UTF16ToString,
    );
    const creationDate = readString(
      this.pdfiumModule.pdfium,
      (buffer, bufferLength) => {
        return this.pdfiumModule.FPDFAttachment_GetStringValue(
          attachmentPtr,
          'CreationDate',
          buffer,
          bufferLength,
        );
      },
      this.pdfiumModule.pdfium.UTF16ToString,
    );
    const checksum = readString(
      this.pdfiumModule.pdfium,
      (buffer, bufferLength) => {
        return this.pdfiumModule.FPDFAttachment_GetStringValue(
          attachmentPtr,
          'Checksum',
          buffer,
          bufferLength,
        );
      },
      this.pdfiumModule.pdfium.UTF16ToString,
    );

    return {
      index,
      name,
      creationDate,
      checksum,
    };
  }

  /**
   * Convert coordinate of point from device coordinate to page coordinate
   * @param page  - pdf page infor
   * @param position - position of point
   * @returns converted position
   *
   * @private
   */
  private convertDevicePointToPagePoint(
    page: PdfPageObject,
    position: Position,
  ): Position {
    const x = position.x;
    const y = page.size.height - position.y;

    return { x, y };
  }

  /**
   * Convert coordinate of point from page coordinate to device coordinate
   * @param page  - pdf page infor
   * @param position - position of point
   * @returns converted position
   *
   * @private
   */
  private convertPagePointToDevicePoint(
    page: PdfPageObject,
    position: Position,
  ): Position {
    const x = position.x;
    const y = page.size.height - position.y;

    return { x, y };
  }

  /**
   * Convert coordinate of rectangle from page coordinate to device coordinate
   * @param page  - pdf page infor
   * @param pagePtr - pointer to pdf page object
   * @param pageRect - rectangle that needs to be converted
   * @returns converted rectangle
   *
   * @private
   */
  private convertPageRectToDeviceRect(
    page: PdfPageObject,
    pagePtr: number,
    pageRect: {
      left: number;
      top: number;
      right: number;
      bottom: number;
    },
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

  /**
   * Read the appearance stream of annotation
   * @param annotationPtr - pointer to pdf annotation
   * @param mode - appearance mode
   * @returns appearance stream
   *
   * @private
   */
  private readPageAnnoAppearanceStream(
    annotationPtr: number,
    mode = AppearanceMode.Normal,
  ) {
    const utf16Length = this.pdfiumModule.FPDFAnnot_GetAP(
      annotationPtr,
      mode,
      0,
      0,
    );
    const bytesCount = (utf16Length + 1) * 2; // include NIL
    const bufferPtr = this.malloc(bytesCount);
    this.pdfiumModule.FPDFAnnot_GetAP(
      annotationPtr,
      mode,
      bufferPtr,
      bytesCount,
    );
    const ap = this.pdfiumModule.pdfium.UTF16ToString(bufferPtr);
    this.free(bufferPtr);

    return ap;
  }

  /**
   * Set the rect of specified annotation
   * @param page - page info that the annotation is belonged to
   * @param pagePtr - pointer of page object
   * @param annotationPtr - pointer to annotation object
   * @param rect - target rectangle
   * @returns whether the rect is setted
   *
   * @private
   */
  setPageAnnoRect(
    page: PdfPageObject,
    pagePtr: number,
    annotationPtr: number,
    rect: Rect,
  ) {
    const pageXPtr = this.malloc(8);
    const pageYPtr = this.malloc(8);
    if (
      !this.pdfiumModule.FPDF_DeviceToPage(
        pagePtr,
        0,
        0,
        page.size.width,
        page.size.height,
        0,
        rect.origin.x,
        rect.origin.y,
        pageXPtr,
        pageYPtr,
      )
    ) {
      this.free(pageXPtr);
      this.free(pageYPtr);
      return false;
    }
    const pageX = this.pdfiumModule.pdfium.getValue(pageXPtr, 'double');
    const pageY = this.pdfiumModule.pdfium.getValue(pageYPtr, 'double');
    this.free(pageXPtr);
    this.free(pageYPtr);

    const pageRectPtr = this.malloc(4 * 4);
    this.pdfiumModule.pdfium.setValue(pageRectPtr, pageX, 'float');
    this.pdfiumModule.pdfium.setValue(pageRectPtr + 4, pageY, 'float');
    this.pdfiumModule.pdfium.setValue(
      pageRectPtr + 8,
      pageX + rect.size.width,
      'float',
    );
    this.pdfiumModule.pdfium.setValue(
      pageRectPtr + 12,
      pageY - rect.size.height,
      'float',
    );

    if (!this.pdfiumModule.FPDFAnnot_SetRect(annotationPtr, pageRectPtr)) {
      this.free(pageRectPtr);
      return false;
    }
    this.free(pageRectPtr);

    return true;
  }

  /**
   * Read the rectangle of annotation
   * @param annotationPtr - pointer to pdf annotation
   * @returns rectangle of annotation
   *
   * @private
   */
  private readPageAnnoRect(annotationPtr: number) {
    const pageRectPtr = this.malloc(4 * 4);
    const pageRect = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
    if (this.pdfiumModule.FPDFAnnot_GetRect(annotationPtr, pageRectPtr)) {
      pageRect.left = this.pdfiumModule.pdfium.getValue(pageRectPtr, 'float');
      pageRect.top = this.pdfiumModule.pdfium.getValue(
        pageRectPtr + 4,
        'float',
      );
      pageRect.right = this.pdfiumModule.pdfium.getValue(
        pageRectPtr + 8,
        'float',
      );
      pageRect.bottom = this.pdfiumModule.pdfium.getValue(
        pageRectPtr + 12,
        'float',
      );
    }
    this.free(pageRectPtr);

    return pageRect;
  }
}
