import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfLinkAnnoObject } from '@unionpdf/models';
import { PdfPageAnnotationBase } from './annotation';

describe('PdfPageLink', () => {
  test('should render pdf link', async () => {
    const link: PdfLinkAnnoObject = {
      id: 0,
      type: 'link',
      target: {
        type: 'url',
        url: 'https://localhost',
      },
      text: 'Link',
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
