import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import { PdfEngineContextProvider } from '@unionpdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';
import { PdfDocument } from '@unionpdf/core';
import { PdfPages, PdfPageProps } from './pages';
import { PdfPageLayer } from './pageLayers/layer';

describe('PdfPages', () => {
  test('should render pdf pages with layer', async () => {
    function PdfPageNumber(props: PdfPageProps) {
      return (
        <div className="pdf__page__layer--number">{props.page.index + 1}</div>
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
            viewport={{ width: 100, height: 200 }}
            pageGap={8}
            scaleFactor={1}
            rotation={0}
          >
            <PdfPageLayer layer={PdfPageNumber} />
          </PdfPages>
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelector('.pdf__pages')).toBeDefined();
    expect(document.querySelectorAll('.pdf__page').length).toEqual(
      pdf.pageCount
    );
    expect(
      document.querySelectorAll('.pdf__page__layer--number').length
    ).toEqual(pdf.pageCount);

    result.unmount();
  });
});
