import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfSearch } from './search';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import {
  PdfTaskHelper,
  PdfDocumentObject,
  PdfEngineError,
  PdfErrorReason,
  Task,
} from '@unionpdf/models';
import { PdfEngineContextProvider, PdfDocument } from '../../core';
import { PdfTestingAdapterProvider } from '../../adapters/testing';

describe('PdfSearch', () => {
  it('should render div with children', () => {
    const pdf = createMockPdfDocument();
    const openDocumentTask = new Task<PdfDocumentObject, PdfErrorReason>();
    const closeDocumentTask = PdfTaskHelper.resolve<boolean>(true);
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
          <PdfDocument
            file={createMockPdfFile()}
            password=""
            onOpenSuccess={jest.fn()}
            onOpenFailure={jest.fn()}
          >
            <PdfSearch />
          </PdfDocument>
        </PdfEngineContextProvider>
      </PdfTestingAdapterProvider>,
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    const divElem = document.querySelector('.pdf__search') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
