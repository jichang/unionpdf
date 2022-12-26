import {
  PdfDocumentObject,
  PdfSource,
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
} from '@unionpdf/models';

export function createMockPdfEngine(
  partialEngine?: Partial<PdfEngine>
): PdfEngine {
  const engine: PdfEngine = {
    openDocument: jest.fn((id: string, url: PdfSource, password: string) => {
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
        rotation: Rotation
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
        };
        const annotations: PdfAnnotationObject[] = [];
        annotations.push(link);
        return TaskBase.resolve(annotations);
      }
    ),
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
    readAttachments: (doc: PdfDocumentObject) => {
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

export function createMockPdfDocument(
  pdf?: Partial<PdfDocumentObject>
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
    pageCount: pageCount,
    pages: pages,
    ...pdf,
  };
}
