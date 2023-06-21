import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfAnnotationSubtype,
  PdfPageObject,
  PdfFreeTextAnnoObject,
  Rotation,
  PdfAnnotationObjectStatus,
} from '@unionpdf/models';
import { PdfPageFreeTextAnnotation } from './freetext';

describe('PdfPageFreeText', () => {
  test('should render pdf free text', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };
    const text: PdfFreeTextAnnoObject = {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: 0,
      id: 0,
      type: PdfAnnotationSubtype.FREETEXT,
      contents: 'Link',
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
      appearances: {
        normal: '',
      },
    };
    const result = render(
      <PdfPageFreeTextAnnotation
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
