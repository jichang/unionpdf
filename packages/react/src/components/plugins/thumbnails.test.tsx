import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { PdfThumbnails } from './thumbnails';
import { PdfDocumentObject, PdfEngineError, TaskBase } from '@unionpdf/models';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { PdfDocument } from '../../core/document';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import { PdfNativeAdapterProvider } from '../../adapters/native';

describe('PdfThumbnails', () => {
  test('should render pdf thumbnails', async () => {
    intersectionObserver.mock();

    const pdf = createMockPdfDocument();
    const openDocumentTask = new TaskBase<PdfDocumentObject, PdfEngineError>();
    const closeDocumentTask = TaskBase.resolve<boolean, PdfEngineError>(true);
    const engine = createMockPdfEngine({
      openDocument: jest.fn(() => {
        return openDocumentTask;
      }),
      closeDocument: jest.fn(() => {
        return closeDocumentTask;
      }),
    });

    const result = render(
      <PdfNativeAdapterProvider>
        <PdfEngineContextProvider engine={engine}>
          <PdfDocument
            file={createMockPdfFile()}
            password=""
            onOpenSuccess={jest.fn()}
            onOpenFailure={jest.fn()}
          >
            <PdfThumbnails
              layout={{ direction: 'vertical', itemsCount: 2 }}
              size={{ width: 100, height: 100 }}
            />
          </PdfDocument>
        </PdfEngineContextProvider>
      </PdfNativeAdapterProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    expect(document.querySelector('.pdf__thumbnails')).toBeDefined();
    expect(document.querySelectorAll('.pdf__thumbnail').length).toEqual(
      pdf.pageCount
    );

    result.unmount();

    intersectionObserver.restore();
  });
});
