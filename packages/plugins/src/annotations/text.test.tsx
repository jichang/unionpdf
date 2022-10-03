import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfPageLinkAnnotation } from './link';
import { PdfLinkAnnoObject, PdfPageObject } from '@onepdf/models';

describe('PdfPageLink', () => {
  test('should render pdf link', async () => {
    const page: PdfPageObject = {
      index: 0,
      size: {
        width: 100,
        height: 100,
      },
    };
    const link: PdfLinkAnnoObject = {
      type: 'link',
      url: 'https://localhost',
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
      <PdfPageLinkAnnotation
        page={page}
        anno={link}
        scaleFactor={1}
        rotation={0}
      />
    );

    const linkElem = document.querySelector('.pdf__annotation--text');
    expect(linkElem).toBeDefined();

    result.unmount();
  });
});
