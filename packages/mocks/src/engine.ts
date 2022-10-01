import {
  PdfDocumentObject,
  PdfSource,
  PdfEngine,
  PdfPageObject,
  PdfLinkAnnoObject,
} from "@onepdf/models";
import { Defer } from "./defer";

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
            text: "Page 1",
            pageIndex: 1,
          },
          {
            text: "Page 2",
            pageIndex: 2,
            children: [
              {
                text: "Page 3",
                pageIndex: 3,
              },
            ],
          },
        ],
      };
    },
    renderPage: jest.fn(async (page: PdfPageObject) => {
      const pixelCount = page.size.width * page.size.height;
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

      return new ImageData(array, page.size.width, page.size.height);
    }),
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
        type: "link",
        url: "https://localhost",
        text: "localhost",
        rect: {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        },
      };
      return [link];
    }),
    close: async (pdf: PdfDocumentObject) => {},
    ...engine,
  };
}

export function createMockPdfDocument(pdf?: Partial<PdfDocumentObject>) {
  const pageCount = 10;
  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push({
      index: i,
      size: {
        width: 100,
        height: 100,
      },
    });
  }

  return {
    pageCount: pageCount,
    size: {
      width: 100,
      height: 100,
    },
    pages: pages,
    ...pdf,
  };
}
