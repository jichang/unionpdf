import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfAnnotationObjectStatus,
  PdfAnnotationSubtype,
  PdfPageObject,
  PdfTextAnnoObject,
  Rotation,
} from '@unionpdf/models';
import { PdfPageTextAnnotation } from './text';

describe('PdfPageTextAnnotation', () => {
  test('should render pdf text', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };
    const text: PdfTextAnnoObject = {
      status: PdfAnnotationObjectStatus.Commited,
      pageIndex: 0,
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
    const result = render(
      <PdfPageTextAnnotation
        page={page}
        annotation={text}
        scaleFactor={0}
        rotation={Rotation.Degree0}
      />
    );

    const spanElem = document.querySelector('span');
    expect(spanElem?.textContent).toBe(text.contents);

    result.unmount();
  });
});
