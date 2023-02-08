import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/engines';
import { PdfPages } from '../pages';
import { TaskBase, PdfDocumentObject, PdfEngineError } from '@unionpdf/models';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { PdfDocument } from '../../core/document';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import { PdfApplicationContextProvider, PdfApplicationMode } from '../../core';
import { PdfEditorCanvas } from './canvas';
import { PdfEditorContextProvider } from './editor.context';

describe('PdfEditorAnnotations', () => {
  test('should render pdf editor annotations', async () => {
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
      <PdfApplicationContextProvider mode={PdfApplicationMode.Edit}>
        <PdfEngineContextProvider engine={engine}>
          <PdfDocument
            id="test"
            source={new Uint8Array()}
            password=""
            onOpenSuccess={jest.fn()}
            onOpenFailure={jest.fn()}
          >
            <PdfEditorContextProvider>
              <PdfPages pageGap={8} pageLayers={[PdfEditorCanvas]} />
            </PdfEditorContextProvider>
          </PdfDocument>
        </PdfEngineContextProvider>
      </PdfApplicationContextProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    act(() => {
      intersectionObserver.simulate([{ isIntersecting: true }]);
    });

    expect(document.querySelectorAll('.pdf__editor__canvas').length).toEqual(
      10
    );

    result.unmount();
    intersectionObserver.restore();
  });
});