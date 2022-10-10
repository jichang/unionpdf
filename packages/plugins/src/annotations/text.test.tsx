import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfPageObject, PdfTextAnnoObject } from '@unionpdf/models';
import { PdfPageTextAnnotation } from './text';

describe('PdfPageLink', () => {
  test('should render pdf link', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };
    const text: PdfTextAnnoObject = {
      id: 0,
      type: 'text',
      text: 'Link',
      color: 'red',
      rect: {
        origin: {
          x: 0,
          y: 0,
        },
        size: {
          height: 100,
          width: 100,
        },
      },
    };
    const result = render(
      <PdfPageTextAnnotation
        page={page}
        annotation={text}
        scaleFactor={1}
        rotation={0}
      />
    );

    const textElem = document.querySelector('.pdf__annotation--text');
    expect(textElem).toBeDefined();
    const spanElem = document.querySelector('.pdf__annotation--text span');
    expect(spanElem?.textContent).toBe(text.text);

    result.unmount();
  });
});
