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

describe('PdfPageWidget', () => {
  test('should render pdf widget', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };
    const widget: PdfWidgetAnnoObject = {
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
    const result = render(<PdfPageWidgetAnnotation annotation={widget} />);

    const elem = document.querySelector('.pdf__form__field');
    expect(elem).toBeDefined();

    result.unmount();
  });
});
