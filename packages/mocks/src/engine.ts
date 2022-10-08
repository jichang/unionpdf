import {
  PdfDocumentObject,
  PdfSource,
  PdfEngine,
  PdfPageObject,
  PdfLinkAnnoObject,
  Rotation,
  swap,
} from '@unionpdf/models';
import { Defer } from './defer';

export function createMockPdfEngine(engine?: Partial<PdfEngine>) {
  const openDefer = new Defer<PdfDocumentObject>();

  return {
    open: jest.fn(async (url: PdfSource) => {
      return openDefer.promise;
    }),
    openDefer,
    getOutlines: () => {
      return {
        entries: [
          {
            text: 'Page 1',
            pageIndex: 1,
          },
          {
            text: 'Page 2',
            pageIndex: 2,
            children: [
              {
                text: 'Page 3',
                pageIndex: 3,
              },
            ],
          },
        ],
      };
    },
    renderPage: jest.fn(
      async (page: PdfPageObject, scaleFactor: number, rotation: Rotation) => {
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
    renderThumbnail: jest.fn(async (page: PdfPageObject) => {
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
    }),
    getPageAnnotations: jest.fn(async (page: PdfPageObject) => {
      const link: PdfLinkAnnoObject = {
        type: 'link',
        target: {
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
    }),
    close: async (pdf: PdfDocumentObject) => {},
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
    pageCount: pageCount,
    size: {
      width: pageWidth,
      height: pageHeight,
    },
    pages: pages,
    ...pdf,
  };
}
