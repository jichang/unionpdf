import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfDocument } from './document';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/engines';
import { PdfDocumentObject, TaskBase } from '@unionpdf/models';
import { usePdfDocument } from './document.context';
import { PdfEngineContextProvider } from './engine.context';

describe('PdfDocument', () => {
  let pdfDocInContext: PdfDocumentObject | null = null;
  function Consumer() {
    pdfDocInContext = usePdfDocument();

    return <div></div>;
  }

  test('should render pdf document element', () => {
    const doc = createMockPdfDocument();
    const openDocumentTask = new TaskBase<PdfDocumentObject, Error>();
    const closeDocumentTask = TaskBase.resolve<boolean, Error>(true);
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

    const id = 'test';
    const source = new Uint8Array();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          id="test"
          source={source}
          onOpenSuccess={onOpenSuccess}
          onOpenFailure={onOpenFailure}
        >
          <Consumer />
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    expect(document.querySelector('.pdf__document')).toBeDefined();
    expect(engine.openDocument).toBeCalledTimes(1);
    expect(engine.openDocument).toBeCalledWith(id, source);
    expect(pdfDocInContext).toBe(null);

    act(() => {
      openDocumentTask.resolve(doc);
    });

    expect(onOpenSuccess).toBeCalledTimes(1);
    expect(onOpenSuccess).toBeCalledWith(doc);
    expect(pdfDocInContext).toBe(doc);

    result.unmount();

    expect(engine.closeDocument).toBeCalledTimes(1);
    expect(engine.closeDocument).toBeCalledWith(doc);
  });
});
