import { createMockPdfDocument } from '@unionpdf/engines';
import { PdfDocumentObject } from '@unionpdf/models';
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfDocumentContextProvider, usePdfDocument } from './document.context';

describe('PdfDocumentContextProvider ', () => {
  let pdfDocInContext: PdfDocumentObject | null;
  function Consumer() {
    pdfDocInContext = usePdfDocument();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const pdf = createMockPdfDocument();
    const result = render(
      <PdfDocumentContextProvider doc={pdf}>
        <Consumer />
      </PdfDocumentContextProvider>
    );

    expect(pdfDocInContext).toEqual(pdf);

    result.unmount();
  });
});
