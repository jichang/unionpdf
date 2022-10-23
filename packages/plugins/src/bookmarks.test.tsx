import '@testing-library/jest-dom';
import React from 'react';
import { act, render } from '@testing-library/react';
import { PdfDocument, PdfEngineContextProvider } from '@unionpdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';
import { PdfBookmarks } from './bookmarks';

describe('PdfBookmark', () => {
  test('should render pdf bookmark', async () => {
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source={new Uint8Array()}
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfBookmarks />
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelector('.pdf__bookmarks')).toBeDefined();
    expect(document.querySelectorAll('.pdf__bookmarks__entry').length).toEqual(
      2
    );

    result.unmount();
  });
});
