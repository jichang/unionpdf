import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfAnnotationSubtype,
  PdfPageObject,
  PdfTextAnnoObject,
} from '@unionpdf/models';
import { PdfPageTextAnnotation } from './text';

describe('PdfPageLink', () => {
  test('should render pdf text', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };
    const text: PdfTextAnnoObject = {
      id: 0,
      type: PdfAnnotationSubtype.TEXT,
      contents: 'Link',
      color: {
        red: 0,
        blue: 0,
        green: 0,
        alpha: 0,
      },
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
    const result = render(<PdfPageTextAnnotation annotation={text} />);

    const spanElem = document.querySelector('span');
    expect(spanElem?.textContent).toBe(text.contents);

    result.unmount();
  });
});
