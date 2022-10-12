import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { PdfPageLinkAnnotation } from './link';
import { PdfLinkAnnoObject, PdfPageObject } from '@unionpdf/models';

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
    const onClick = jest.fn();
    const result = render(
      <PdfPageLinkAnnotation
        page={page}
        annotation={link}
        scaleFactor={1}
        rotation={0}
        onClick={onClick}
      />
    );

    const linkElem = document.querySelector(
      '.pdf__annotation--link'
    ) as HTMLDivElement;
    expect(linkElem).toBeDefined();
    expect(linkElem?.getAttribute('role')).toEqual('link');

    const spanElem = document.querySelector('.pdf__annotation--link span');
    expect(spanElem?.textContent).toEqual(link.text);

    await act(async () => {
      fireEvent.click(linkElem);
    });

    expect(onClick).toBeCalledWith(link);

    result.unmount();
  });
});
