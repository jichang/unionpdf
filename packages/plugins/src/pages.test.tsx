import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import { PdfEngineContextProvider } from '@unionpdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';
import { PdfDocument } from '@unionpdf/core';
import { PdfPages, PdfPageContentComponentProps } from './pages';

export interface PdfPageNumberProps {
  index: number;
  color: string;
}

function PdfPageNumber(props: PdfPageNumberProps) {
  const { index, color } = props;

  return (
    <div className="pdf__page__layer--number" style={{ color }}>
      {index + 1}
    </div>
  );
}

function PdfPageContent(props: PdfPageContentComponentProps) {
  const { page } = props;

  return (
    <>
      <PdfPageNumber index={page.index} color="blue" />
    </>
  );
}

describe('PdfPages', () => {
  test('should render pdf pages with layer', async () => {
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source={new Uint8Array()}
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfPages
            viewport={{ width: 100, height: 200 }}
            pageGap={8}
            scaleFactor={1}
            rotation={0}
            pageContentComponent={PdfPageContent}
          />
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
