import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { PdfEditor } from './editor';
import {
  PdfTaskHelper,
  PdfDocumentObject,
  PdfEngineError,
  PdfErrorReason,
  Task,
} from '@unionpdf/models';
import { PdfDocument } from '../../core/document';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { PdfTestingAdapterProvider } from '../../adapters/testing';

describe('PdfBookmark', () => {
  test('should render pdf bookmark', async () => {
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
            <PdfEditor />
          </PdfDocument>
        </PdfEngineContextProvider>
      </PdfTestingAdapterProvider>,
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    expect(document.querySelector('.pdf__editor')).toBeDefined();

    result.unmount();
  });
});
