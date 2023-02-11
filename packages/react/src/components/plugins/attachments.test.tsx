import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfAttachments } from './attachments';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/engines';
import { TaskBase, PdfDocumentObject, PdfEngineError } from '@unionpdf/models';
import { PdfEngineContextProvider, PdfDocument } from '../../core';

describe('PdfAttachments', () => {
  it('Toolbar should render div with children', () => {
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
          <PdfAttachments />
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    const divElem = document.querySelector(
      '.pdf__attachments'
    ) as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
