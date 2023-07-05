import {
  PdfDocumentObject,
  PdfEngine,
  PdfPageObject,
  PdfAnnotationSubtype,
  PdfLinkAnnoObject,
  Rotation,
  swap,
  PdfZoomMode,
  PdfActionType,
  TaskBase,
  PdfAnnotationObject,
  PdfBookmarkObject,
  PdfTextRectObject,
  SearchTarget,
  SearchResult,
  PdfAttachmentObject,
  PdfSignatureObject,
  Rect,
  PdfRenderOptions,
  PdfFile,
  PdfAnnotationObjectStatus,
} from '@unionpdf/models';

/**
 * Create mock of pdf engine
 * @param partialEngine - partial configuration of engine
 * @returns - mock of pdf engine
 *
 * @public
 */
export function createMockPdfEngine(
  partialEngine?: Partial<PdfEngine>
): PdfEngine {
  const engine: PdfEngine = {
    openDocument: jest.fn((file: PdfFile, password: string) => {
      return new TaskBase();
    }),
    getMetadata: () => {
      return TaskBase.resolve({
        title: 'title',
        author: 'author',
        subject: 'subject',
        keywords: 'keywords',
        producer: 'producer',
        creator: 'creator',
        creationDate: 'creationDate',
        modificationDate: 'modificationDate',
      });
    },
    getSignatures: (doc: PdfDocumentObject) => {
      const signatures: PdfSignatureObject[] = [];
      return TaskBase.resolve(signatures);
    },
    getBookmarks: (doc: PdfDocumentObject) => {
      const bookmarks: PdfBookmarkObject[] = [];
      bookmarks.push(
        {
          title: 'Page 1',
          target: {
            type: 'destination',
            destination: {
              pageIndex: 1,
              zoom: {
                mode: PdfZoomMode.FitPage,
              },
              view: [],
            },
          },
        },
        {
          title: 'Page 2',
          target: {
            type: 'destination',
            destination: {
              pageIndex: 2,
              zoom: {
                mode: PdfZoomMode.FitPage,
              },
              view: [],
            },
          },
          children: [
            {
              title: 'Page 3',
              target: {
                type: 'destination',
                destination: {
                  pageIndex: 3,
                  zoom: {
                    mode: PdfZoomMode.FitPage,
                  },
                  view: [],
                },
              },
            },
          ],
        }
      );
      return TaskBase.resolve({
        bookmarks,
      });
    },
    renderPage: jest.fn(
      (
        doc: PdfDocumentObject,
        page: PdfPageObject,
        scaleFactor: number,
        rotation: Rotation,
        options: PdfRenderOptions
      ) => {
        const pageSize = rotation % 2 === 0 ? page.size : swap(page.size);
        const imageSize = {
          width: Math.ceil(pageSize.width * scaleFactor),
          height: Math.ceil(pageSize.height * scaleFactor),
        };
        const pixelCount = imageSize.width * imageSize.height;
        const array = new Uint8ClampedArray(pixelCount * 4);
        const rgbValue = page.index % 255;
        const alphaValue = 255;
        for (let i = 0; i < pixelCount; i++) {
          for (let j = 0; j < 3; j++) {
            const index = i * 4 + j;
            array[index] = rgbValue;
          }
          array[i * 4 + 3] = alphaValue;
        }

        return TaskBase.resolve(
          new ImageData(array, imageSize.width, imageSize.height)
        );
      }
    ),
    renderPageRect: jest.fn(
      (
        doc: PdfDocumentObject,
        page: PdfPageObject,
        scaleFactor: number,
        rotation: Rotation,
        rect: Rect,
        options: PdfRenderOptions
      ) => {
        const pageSize = rotation % 2 === 0 ? page.size : swap(page.size);
        const imageSize = {
          width: Math.ceil(pageSize.width * scaleFactor),
          height: Math.ceil(pageSize.height * scaleFactor),
        };
        const pixelCount = imageSize.width * imageSize.height;
        const array = new Uint8ClampedArray(pixelCount * 4);
        const rgbValue = page.index % 255;
        const alphaValue = 255;
        for (let i = 0; i < pixelCount; i++) {
          for (let j = 0; j < 3; j++) {
            const index = i * 4 + j;
            array[index] = rgbValue;
          }
          array[i * 4 + 3] = alphaValue;
        }

        return TaskBase.resolve(
          new ImageData(array, imageSize.width, imageSize.height)
        );
      }
    ),
    renderThumbnail: jest.fn((doc: PdfDocumentObject, page: PdfPageObject) => {
      const thumbnailWidth = page.size.width / 4;
      const thumbnailHeight = page.size.height / 4;
      const pixelCount = thumbnailWidth * thumbnailHeight;
      const array = new Uint8ClampedArray(pixelCount * 4);
      const rgbValue = page.index % 255;
      const alphaValue = 255;
      for (let i = 0; i < pixelCount; i++) {
        for (let j = 0; j < 3; j++) {
          const index = i * 4 + j;
          array[index] = rgbValue;
        }
        array[i * 4 + 3] = alphaValue;
      }

      return TaskBase.resolve(
        new ImageData(array, thumbnailWidth, thumbnailHeight)
      );
    }),
    getPageAnnotations: jest.fn(
      (
        doc: PdfDocumentObject,
        page: PdfPageObject,
        scaleFactor: number,
        rotation: Rotation
      ) => {
        const link: PdfLinkAnnoObject = {
          status: PdfAnnotationObjectStatus.Committed,
          pageIndex: page.index,
          id: page.index + 1,
          type: PdfAnnotationSubtype.LINK,
          target: {
            type: 'action',
            action: {
              type: PdfActionType.URI,
              uri: 'https://localhost',
            },
          },
          text: 'localhost',
          rect: {
            origin: {
              x: 0,
              y: 0,
            },
            size: {
              width: 100,
              height: 100,
            },
          },
          appearances: {
            normal: '',
          },
        };
        const annotations: PdfAnnotationObject[] = [];
        annotations.push(link);
        return TaskBase.resolve(annotations);
      }
    ),
    createPageAnnotation: jest.fn(() => {
      return TaskBase.resolve(true);
    }),
    transformPageAnnotation: () => {
      return TaskBase.resolve(true);
    },
    removePageAnnotation: jest.fn(() => {
      return TaskBase.resolve(true);
    }),
    getPageTextRects: jest.fn(
      (
        doc: PdfDocumentObject,
        page: PdfPageObject,
        scaleFactor: number,
        rotation: Rotation
      ) => {
        const textRects: PdfTextRectObject[] = [
          {
            content: 'pdf text',
            font: {
              family: 'sans-serif',
              size: 12,
            },
            rect: {
              origin: {
                x: 0,
                y: 0,
              },
              size: {
                width: 100,
                height: 100,
              },
            },
          },
        ];
        return TaskBase.resolve(textRects);
      }
    ),
    closeDocument: (pdf: PdfDocumentObject) => {
      return TaskBase.resolve(true);
    },
    saveAsCopy: (pdf: PdfDocumentObject) => {
      return TaskBase.resolve(new ArrayBuffer(0));
    },
    extractPages: (pdf: PdfDocumentObject, pageIndexes: number[]) => {
      return TaskBase.resolve(new ArrayBuffer(0));
    },
    extractText: (pdf: PdfDocumentObject, pageIndexes: number[]) => {
      return TaskBase.resolve('');
    },
    merge: (files: PdfFile[]) => {
      return TaskBase.resolve({
        id: 'id',
        name: 'name',
        content: new ArrayBuffer(0),
      });
    },
    startSearch: (doc: PdfDocumentObject, contextId: number) => {
      return TaskBase.resolve(true);
    },
    searchNext: (
      doc: PdfDocumentObject,
      contextId: number,
      target: SearchTarget
    ) => {
      return TaskBase.resolve<SearchResult | undefined>({
        pageIndex: 0,
        charIndex: 0,
        charCount: 1,
      });
    },
    searchPrev: (
      doc: PdfDocumentObject,
      contextId: number,
      target: SearchTarget
    ) => {
      return TaskBase.resolve<SearchResult | undefined>({
        pageIndex: 0,
        charIndex: 0,
        charCount: 1,
      });
    },
    stopSearch: (doc: PdfDocumentObject, contextId: number) => {
      return TaskBase.resolve(true);
    },
    getAttachments: (doc: PdfDocumentObject) => {
      return TaskBase.resolve([] as PdfAttachmentObject[]);
    },
    readAttachmentContent: (
      doc: PdfDocumentObject,
      attachment: PdfAttachmentObject
    ) => {
      return TaskBase.resolve(new ArrayBuffer(0));
    },
    ...partialEngine,
  };

  return engine;
}
/**
 * Create mock of pdf document
 * @param doc - partial configuration of document
 * @returns mock of pdf document
 *
 * @public
 */
export function createMockPdfDocument(
  doc?: Partial<PdfDocumentObject>
): PdfDocumentObject {
  const pageCount = 10;
  const pageWidth = 100;
  const pageHeight = 200;
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push({
      index: i,
      size: {
        width: pageWidth,
        height: pageHeight,
      },
    });
  }

  return {
    id: 'id',
    name: 'name',
    pageCount: pageCount,
    pages: pages,
    ...doc,
  };
}

/**
 * Create mock of pdf file
 * @param file - partial configuration of file
 * @returns mock of pdf file
 *
 * @public
 */
export function createMockPdfFile(file?: Partial<PdfFile>): PdfFile {
  return {
    id: 'id',
    name: 'name',
    content: new ArrayBuffer(0),
  };
}
