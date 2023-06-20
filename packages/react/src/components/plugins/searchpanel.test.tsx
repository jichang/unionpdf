import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfSearchPanel } from './searchpanel';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { TaskBase, PdfDocumentObject, PdfEngineError } from '@unionpdf/models';
import { PdfEngineContextProvider, PdfDocument } from '../../core';
import { PdfNativeAdapterProvider } from '../../adapters/native';

describe('PdfSearchPanel', () => {
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
      <PdfNativeAdapterProvider>
        <PdfEngineContextProvider engine={engine}>
          <PdfDocument
            file={createMockPdfFile()}
            password=""
            onOpenSuccess={jest.fn()}
            onOpenFailure={jest.fn()}
          >
            <PdfSearchPanel />
          </PdfDocument>
        </PdfEngineContextProvider>
      </PdfNativeAdapterProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    const divElem = document.querySelector(
      '.pdf__search__panel'
    ) as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
