import {
  PdfDocumentObject,
  PdfSource,
  PdfEngine,
  PdfPageObject,
  PdfLinkAnnoObject,
  Rotation,
  swap,
  PdfZoomMode,
} from '@unionpdf/models';
import { Defer } from './defer';

export interface MockPdfEngine extends PdfEngine {
  openDefer: Defer<PdfDocumentObject>;
}

export function createMockPdfEngine(
  engine?: Partial<PdfEngine>
): MockPdfEngine {
  const openDefer = new Defer<PdfDocumentObject>();

  return {
    openDocument: jest.fn(async (url: PdfSource) => {
      return openDefer.promise;
    }),
    openDefer,
    getBookmarks: (doc: PdfDocumentObject) => {
      return {
        bookmarks: [
          {
            title: 'Page 1',
            target: {
              type: 'destination',
              destination: {
                pageIndex: 1,
                zoom: {
                  mode: PdfZoomMode.FitPage,
                  params: [],
                },
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
                  params: [],
                },
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
                      params: [],
                    },
                  },
                },
              },
            ],
          },
        ],
      };
    },
    renderPage: jest.fn(
      async (
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

        return new ImageData(array, imageSize.width, imageSize.height);
      }
    ),
    renderThumbnail: jest.fn(
      async (doc: PdfDocumentObject, page: PdfPageObject) => {
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

        return new ImageData(array, thumbnailWidth, thumbnailHeight);
      }
    ),
    getPageAnnotations: jest.fn(
      async (doc: PdfDocumentObject, page: PdfPageObject) => {
        const link: PdfLinkAnnoObject = {
          id: page.index + 1,
          type: 'link',
          target: {
            type: 'url',
            url: 'https://localhost',
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
        return [link];
      }
    ),
    closeDocument: async (pdf: PdfDocumentObject) => {},
    ...engine,
  };
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
