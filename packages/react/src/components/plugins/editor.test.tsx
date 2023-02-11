import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/engines';
import { PdfEditor } from './editor';
import { TaskBase, PdfDocumentObject, PdfEngineError } from '@unionpdf/models';
import { PdfDocument } from '../../core/document';
import { PdfEngineContextProvider } from '../../core/engine.context';

describe('PdfBookmark', () => {
  test('should render pdf bookmark', async () => {
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
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          id="test"
          source={new Uint8Array()}
          password=""
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfEditor />
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    expect(document.querySelector('.pdf__editor')).toBeDefined();

    result.unmount();
  });
});
