import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfDocument, PdfEngineContextProvider } from '@unionpdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';
import { PdfPageContentComponentProps, PdfPages } from '../pages';
import { PdfPageAnnotations } from './annotations';
import { TaskBase, PdfDocumentObject } from '@unionpdf/models';

describe('PdfPageAnnotations', () => {
  function PdfPageAnnotation() {
    return <div className="pdf__annotation"></div>;
  }

  function PdfPageContent(props: PdfPageContentComponentProps) {
    return (
      <>
        <PdfPageAnnotations
          {...props}
          annotationComponent={PdfPageAnnotation}
        />
      </>
    );
  }

  test('should render pdf annotations', async () => {
    const pdf = createMockPdfDocument();
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

    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          id="test"
          source={new Uint8Array()}
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfPages
            pageGap={8}
            viewport={{ width: 100, height: 100 }}
            pageContentComponent={PdfPageContent}
          />
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    expect(document.querySelectorAll('.pdf__annotation').length).toEqual(1);

    result.unmount();
  });
});
