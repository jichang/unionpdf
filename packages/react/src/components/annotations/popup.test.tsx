import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfAnnotationObjectStatus,
  PdfAnnotationSubtype,
  PdfPageObject,
  PdfPopupAnnoObject,
} from '@unionpdf/models';
import { PdfPagePopupAnnotation } from './popup';

describe('PdfPagePopup', () => {
  test('should render pdf popup', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };
    const popup: PdfPopupAnnoObject = {
      status: PdfAnnotationObjectStatus.Committed,
      pageIndex: 0,
      id: 0,
      type: PdfAnnotationSubtype.POPUP,
      contents: 'Popup',
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
      open: false,
    };
    const result = render(
      <PdfPagePopupAnnotation
        page={page}
        parent={popup}
        annotation={popup}
        scaleFactor={1}
        rotation={0}
      />,
    );

    const textElem = document.querySelector('.pdf__page__annotation--popup');
    expect(textElem).toBeDefined();
    const spanElem = document.querySelector(
      '.pdf__page__annotation--popup span',
    );
    expect(spanElem?.textContent).toBe(popup.contents);

    result.unmount();
  });
});
