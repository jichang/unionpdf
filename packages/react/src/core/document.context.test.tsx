import { createMockPdfDocument } from '@unionpdf/engines';
import { PdfDocumentObject } from '@unionpdf/models';
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfDocumentContextProvider,
  PdfDocumentContextValue,
  usePdfDocument,
} from './document.context';

describe('PdfDocumentContextProvider ', () => {
  let pdfDocInContext: PdfDocumentContextValue | null;
  function Consumer() {
    pdfDocInContext = usePdfDocument();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const doc = createMockPdfDocument();
    const version = Date.now();
    const result = render(
      <PdfDocumentContextProvider
        version={version}
        setVersion={jest.fn()}
        doc={doc}
      >
        <Consumer />
      </PdfDocumentContextProvider>
    );

    expect(pdfDocInContext).toMatchObject({ doc, version });

    result.unmount();
  });
});
