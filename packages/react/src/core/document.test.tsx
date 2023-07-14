import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfDocument } from './document';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { PdfDocumentObject, PdfEngineError, TaskBase } from '@unionpdf/models';
import { PdfDocumentContextValue, usePdfDocument } from './document.context';
import { PdfEngineContextProvider } from './engine.context';

describe('PdfDocument', () => {
  let pdfDocInContext: PdfDocumentContextValue | null = null;
  function Consumer() {
    pdfDocInContext = usePdfDocument();

    return <div></div>;
  }

  test('should render pdf document element', () => {
    const doc = createMockPdfDocument();
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

    const onOpenSuccess = jest.fn();
    const onOpenFailure = jest.fn();

    const file = createMockPdfFile();
    const password = '';
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          file={file}
          password={password}
          onOpenSuccess={onOpenSuccess}
          onOpenFailure={onOpenFailure}
        >
          <Consumer />
        </PdfDocument>
      </PdfEngineContextProvider>,
    );

    expect(document.querySelector('.pdf__document')).toBeDefined();
    expect(engine.openDocument).toBeCalledTimes(1);
    expect(engine.openDocument).toBeCalledWith(file, password);
    expect(pdfDocInContext).toBe(null);

    act(() => {
      openDocumentTask.resolve(doc);
    });

    expect(onOpenSuccess).toBeCalledTimes(1);
    expect(onOpenSuccess).toBeCalledWith(doc);
    expect(pdfDocInContext).toMatchObject({ doc });

    result.unmount();

    expect(engine.closeDocument).toBeCalledTimes(1);
    expect(engine.closeDocument).toBeCalledWith(doc);
  });
});
