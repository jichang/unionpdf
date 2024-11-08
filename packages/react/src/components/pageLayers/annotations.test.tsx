import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { PdfPages } from '../plugins/pages';
import { PdfPageAnnotationsLayer } from './annotations';
import {
  PdfTaskHelper,
  PdfDocumentObject,
  PdfEngineError,
  PdfErrorReason,
  Task,
} from '@unionpdf/models';
import { PdfDocument } from '../../core/document';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { intersectionObserver } from '../../mocks/intersectionObserver';
import { PdfPageAnnotationComponentContextProvider } from '../common';

describe('PdfPageAnnotationsLayer', () => {
  function PdfPageAnnotation() {
    return <div className="pdf__page__annotation--custom"></div>;
  }

  test('should render pdf annotations', async () => {
    intersectionObserver.mock();
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
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          file={createMockPdfFile()}
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
      </PdfEngineContextProvider>,
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    act(() => {
      intersectionObserver.simulate([{ isIntersecting: true }]);
    });

    expect(
      document.querySelectorAll('.pdf__page__annotation--custom').length,
    ).toEqual(pdf.pageCount);

    result.unmount();
    intersectionObserver.restore();
  });
});
