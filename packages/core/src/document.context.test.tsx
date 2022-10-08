import { createMockPdfDocument } from '@unionpdf/mocks';
import { PdfDocumentObject } from '@unionpdf/models';
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfDocumentContextProvider, usePdfDocument } from './document.context';

describe('PdfDocumentContextProvider ', () => {
  let pdfInContext: PdfDocumentObject | null;
  function Consumer() {
    pdfInContext = usePdfDocument();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const pdf = createMockPdfDocument();
    const result = render(
      <PdfDocumentContextProvider doc={pdf}>
        <Consumer />
      </PdfDocumentContextProvider>
    );

    expect(pdfInContext).toEqual(pdf);

    result.unmount();
  });
});
