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
import {
  PdfTestingAdapterProvider,
  testingMemoryPdfApplicationConfigurationProvider,
} from '../../adapters/testing';
import { PdfApplicationContextProvider } from '../../core';

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
      <PdfTestingAdapterProvider>
        <PdfEngineContextProvider engine={engine}>
          <PdfApplicationContextProvider
            provider={testingMemoryPdfApplicationConfigurationProvider}
          >
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
          </PdfApplicationContextProvider>
        </PdfEngineContextProvider>
      </PdfTestingAdapterProvider>
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
