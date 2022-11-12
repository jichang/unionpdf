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
} from '@unionpdf/models';

export function createMockPdfEngine(engine?: Partial<PdfEngine>): PdfEngine {
  return {
    openDocument: jest.fn((id: string, url: PdfSource) => {
      return new TaskBase();
    }),
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
    closeDocument: (pdf: PdfDocumentObject) => {
      return TaskBase.resolve(true);
    },
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