import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/engines';
import { TaskBase, PdfDocumentObject, PdfEngineError } from '@unionpdf/models';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { PdfDocument } from '../../core/document';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import { PdfApplicationContextProvider, PdfApplicationMode } from '../../core';
import { PdfPages } from '../plugins/pages';
import { PdfPageEditorLayer } from '../pageLayers';
import { PdfEditorAnnotation } from './annotation';
import { PdfPageAnnotationComponentContextProvider } from '../annotations';

describe('PdfEditorAnnotation', () => {
  test('should render pdf editor annotation', async () => {
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
            <PdfPageAnnotationComponentContextProvider
              component={PdfEditorAnnotation}
            >
              <PdfPages pageGap={8} pageLayers={[PdfPageEditorLayer]} />
            </PdfPageAnnotationComponentContextProvider>
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

    expect(
      document.querySelectorAll('.pdf__annotation--editor').length
    ).toEqual(10);

    result.unmount();
    intersectionObserver.restore();
  });
});
