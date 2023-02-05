import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/engines';
import { PdfPageContentComponentProps, PdfPages } from '../pages';
import { PdfPageAnnotationsLayer } from './annotations';
import { TaskBase, PdfDocumentObject, PdfEngineError } from '@unionpdf/models';
import { PdfDocument } from '../../core/document';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import { PdfPageAnnotationComponentContextProvider } from '../annotations';

describe('PdfPageAnnotationsLayer', () => {
  function PdfPageAnnotation() {
    return <div className="pdf__annotation"></div>;
  }

  test('should render pdf annotations', async () => {
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
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          id="test"
          source={new Uint8Array()}
          password=""
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfPageAnnotationComponentContextProvider
            component={PdfPageAnnotation}
          >
            <PdfPages pageGap={8} pageLayers={[PdfPageAnnotationsLayer]} />
          </PdfPageAnnotationComponentContextProvider>
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    act(() => {
      intersectionObserver.simulate([{ isIntersecting: true }]);
    });

    expect(document.querySelectorAll('.pdf__annotation').length).toEqual(
      pdf.pageCount
    );

    result.unmount();
    intersectionObserver.restore();
  });
});
