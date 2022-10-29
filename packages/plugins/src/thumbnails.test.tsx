import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import { PdfDocument, PdfEngineContextProvider } from '@unionpdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';
import { PdfThumbnails } from './thumbnails';
import { PdfDocumentObject, TaskBase } from '@unionpdf/models';

describe('PdfThumbnails', () => {
  test('should render pdf thumbnails', async () => {
    const pdf = createMockPdfDocument();
    const openDocumentTask = new TaskBase<PdfDocumentObject, Error>();
    const closeDocumentTask = TaskBase.resolve<boolean, Error>(true);
    const engine = createMockPdfEngine({
      openDocument: jest.fn(() => {
        return openDocumentTask;
      }),
      closeDocument: jest.fn(() => {
        return closeDocumentTask;
      }),
    });

    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          id="test"
          source={new Uint8Array()}
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfThumbnails
            layout={{ direction: 'vertical', itemsCount: 2 }}
            size={{ width: 100, height: 100 }}
          />
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    expect(document.querySelector('.pdf__thumbnails')).toBeDefined();
    expect(document.querySelectorAll('.pdf__thumbnail').length).toEqual(
      pdf.pageCount
    );

    result.unmount();
  });
});
