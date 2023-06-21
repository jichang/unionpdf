import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfAnnotationSubtype,
  PdfPageObject,
  PdfWidgetAnnoObject,
  PDF_FORM_FIELD_TYPE,
  Rotation,
  PdfAnnotationObjectStatus,
} from '@unionpdf/models';
import { PdfPageWidgetAnnotation } from './widget';
import { PdfNativeAdapterProvider } from '../../adapters/native';

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
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: 0,
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
      appearances: {
        normal: '',
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
      <PdfNativeAdapterProvider>
        <PdfPageWidgetAnnotation
          page={page}
          annotation={widget}
          scaleFactor={0}
          rotation={Rotation.Degree0}
        />
      </PdfNativeAdapterProvider>
    );

    const elem = document.querySelector('.pdf__form__field');
    expect(elem).toBeDefined();

    result.unmount();
  });
});
