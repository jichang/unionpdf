import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfDocument, PdfEngineContextProvider } from '@unionpdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';
import { PdfPageContentProps, PdfPages } from '../pages';
import { PdfPageCanvas } from './canvas';

function PdfPageContent(props: PdfPageContentProps) {
  return (
    <>
      <PdfPageCanvas {...props} />
    </>
  );
}

describe('PdfPageCanvas', () => {
  test('should render pdf canvas', async () => {
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
            content={PdfPageContent}
          />
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(
      document.querySelectorAll('.pdf__page__layer--canvas').length
    ).toEqual(1);

    result.unmount();
  });
});
