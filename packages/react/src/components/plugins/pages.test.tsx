import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { PdfPages } from './pages';
import {
  PdfTaskHelper,
  PdfDocumentObject,
  PdfEngineError,
  PdfErrorReason,
  Task,
} from '@unionpdf/models';
import { PdfDocument } from '../../core/document';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { PdfPageLayerComponentProps } from '../pageLayers';
import { intersectionObserver } from '../../mocks/intersectionObserver';

function PdfPageNumber(props: PdfPageLayerComponentProps) {
  const { page } = props;

  return <div className="pdf__page__layer--number">{page.index + 1}</div>;
}

describe('PdfPages', () => {
  test('should render pdf pages with layer', async () => {
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
          <PdfPages
            pageGap={8}
            scaleFactor={1}
            rotation={0}
            pageLayers={[PdfPageNumber]}
          />
        </PdfDocument>
      </PdfEngineContextProvider>,
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    expect(document.querySelector('.pdf__pages')).toBeDefined();
    expect(document.querySelectorAll('.pdf__page').length).toEqual(
      pdf.pageCount,
    );
    expect(
      document.querySelectorAll('.pdf__page__layer--number').length,
    ).toEqual(pdf.pageCount);

    result.unmount();

    intersectionObserver.restore();
  });
});
