import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { PdfBookmarks } from './bookmarks';
import { TaskBase, PdfDocumentObject, PdfEngineError } from '@unionpdf/models';
import { PdfDocument } from '../../core/document';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { PdfNativeAdapterProvider } from '../../adapters/native';

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
      <PdfNativeAdapterProvider>
        <PdfEngineContextProvider engine={engine}>
          <PdfDocument
            file={createMockPdfFile()}
            password=""
            onOpenSuccess={jest.fn()}
            onOpenFailure={jest.fn()}
          >
            <PdfBookmarks />
          </PdfDocument>
        </PdfEngineContextProvider>
      </PdfNativeAdapterProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    expect(document.querySelector('.pdf__bookmarks')).toBeDefined();
    expect(document.querySelectorAll('.pdf__bookmarks__entry').length).toEqual(
      2
    );

    result.unmount();
  });
});
