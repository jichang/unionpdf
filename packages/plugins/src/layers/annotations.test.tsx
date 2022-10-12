import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfDocument, PdfEngineContextProvider } from '@unionpdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';
import { PdfPageContentComponentProps, PdfPages } from '../pages';
import { PdfPageAnnotations } from './annotations';

describe('PdfPageAnnotations', () => {
  test('should render pdf annotations', async () => {
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
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source="https://localhost"
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

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelectorAll('.pdf__annotation').length).toEqual(
      pdf.pageCount
    );

    result.unmount();
  });
});
