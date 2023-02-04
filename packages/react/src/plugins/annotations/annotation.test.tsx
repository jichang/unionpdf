import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfAnnotationSubtype,
  PdfLinkAnnoObject,
  PdfPageObject,
  PdfZoomMode,
} from '@unionpdf/models';
import { PdfPageAnnotationBase } from './annotation';

describe('PdfPageAnnotationBase', () => {
  test('should render pdf annotation', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };

    const link: PdfLinkAnnoObject = {
      id: 0,
      type: PdfAnnotationSubtype.LINK,
      target: {
        type: 'destination',
        destination: {
          pageIndex: 1,
          zoom: {
            mode: PdfZoomMode.XYZ,
            params: {
              x: 0,
              y: 0,
              zoom: 0,
            },
          },
          view: [],
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
      <PdfPageAnnotationBase
        page={page}
        annotation={link}
        scaleFactor={1}
        rotation={0}
      />
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
