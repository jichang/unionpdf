import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfDocument, PdfEngineContextProvider } from '@onepdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@onepdf/mocks';
import { PdfPages } from '../pages';
import { PdfPageLayer } from './layer';
import { PdfPageCanvas } from './canvas';

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
          <PdfPages pageGap={8} viewport={{ width: 100, height: 100 }}>
            <PdfPageLayer layer={PdfPageCanvas} />
          </PdfPages>
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
