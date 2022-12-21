import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfAnnotationSubtype,
  PdfPageObject,
  PdfWidgetAnnoObject,
  PDF_FORM_FIELD_TYPE,
} from '@unionpdf/models';
import { PdfPageWidgetAnnotation } from './widget';

describe('PdfPageLink', () => {
  test('should render pdf link', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };
    const text: PdfWidgetAnnoObject = {
      id: 0,
      type: PdfAnnotationSubtype.WIDGET,
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
      field: {
        flag: 0,
        type: PDF_FORM_FIELD_TYPE.CHECKBOX,
        name: '',
        alternateName: '',
        isChecked: false,
        value: 'test',
        options: [],
      },
    };
    const result = render(
      <PdfPageWidgetAnnotation
        page={page}
        annotation={text}
        scaleFactor={1}
        rotation={0}
      />
    );

    const textElem = document.querySelector('.pdf__annotation--widget');
    expect(textElem).toBeDefined();

    result.unmount();
  });
});
