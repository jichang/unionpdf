import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfAnnotationSubtype,
  PdfLinkAnnoObject,
  PdfZoomMode,
} from '@unionpdf/models';
import { PdfPageAnnotationBase } from './annotation';

describe('PdfPageLink', () => {
  test('should render pdf link', async () => {
    const link: PdfLinkAnnoObject = {
      id: 0,
      type: PdfAnnotationSubtype.LINK,
      target: {
        type: 'destination',
        destination: {
          pageIndex: 1,
          zoom: {
            mode: PdfZoomMode.XYZ,
            params: [],
          },
        },
      },
      text: 'rect link',
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
      <PdfPageAnnotationBase annotation={link} scaleFactor={1} rotation={0} />
    );

    const linkElem = document.querySelector(
      '.pdf__annotation'
    ) as HTMLDivElement;
    expect(linkElem?.getAttribute('style')).toEqual(
      'top: 0px; left: 0px; width: 100px; height: 100px;'
    );

    result.unmount();
  });
});
