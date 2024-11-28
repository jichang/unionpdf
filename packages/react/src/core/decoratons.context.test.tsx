import { createMockPdfDocument } from '@unionpdf/engines';
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfDecorationsContextProvider,
  PdfDecorationsContextValue,
  usePdfDocumentDecorations,
} from './decorations.context';
import { PdfFile } from '@unionpdf/models';

describe('PdfDecorationsContextProvider ', () => {
  let pdfDocInContext: PdfDecorationsContextValue | null;
  function Consumer() {
    pdfDocInContext = usePdfDocumentDecorations();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const file = {} as PdfFile;
    const doc = createMockPdfDocument();
    const version = Date.now();
    const result = render(
      <PdfDecorationsContextProvider>
        <Consumer />
      </PdfDecorationsContextProvider>,
    );

    expect(pdfDocInContext).toMatchObject({ decorations: [] });

    result.unmount();
  });
});
