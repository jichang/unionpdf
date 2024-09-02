import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfAttachments } from './attachments';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import {
  PdfTaskHelper,
  PdfDocumentObject,
  PdfEngineError,
  Task,
  PdfErrorReason,
} from '@unionpdf/models';
import {
  PdfEngineContextProvider,
  PdfDocument,
  PdfApplicationContextProvider,
} from '../../core';
import {
  PdfTestingAdapterProvider,
  testingMemoryPdfApplicationConfigurationProvider,
} from '../../adapters/testing';

describe('PdfAttachments', () => {
  it('Toolbar should render div with children', () => {
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
          <PdfApplicationContextProvider
            provider={testingMemoryPdfApplicationConfigurationProvider}
          >
            <PdfDocument
              file={createMockPdfFile()}
              password=""
              onOpenSuccess={jest.fn()}
              onOpenFailure={jest.fn()}
            >
              <PdfAttachments />
            </PdfDocument>
          </PdfApplicationContextProvider>
        </PdfEngineContextProvider>
      </PdfTestingAdapterProvider>,
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    const divElem = document.querySelector(
      '.pdf__attachments',
    ) as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
