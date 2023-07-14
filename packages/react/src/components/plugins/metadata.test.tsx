import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { TaskBase, PdfDocumentObject, PdfEngineError } from '@unionpdf/models';
import { PdfDocument } from '../../core/document';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { PdfMetadata } from './metadata';
import {
  PdfTestingAdapterProvider,
  testingMemoryPdfApplicationConfigurationProvider,
} from '../../adapters/testing';
import { PdfApplicationContextProvider } from '../../core';

describe('PdfMetadata', () => {
  test('should render pdf metadata', async () => {
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
              <PdfMetadata />
            </PdfDocument>
          </PdfApplicationContextProvider>
        </PdfEngineContextProvider>
      </PdfTestingAdapterProvider>,
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    expect(document.querySelector('.pdf__metadata')).toBeDefined();
    expect(document.querySelectorAll('.pdf__metadata tr').length).toEqual(7);

    result.unmount();
  });
});
