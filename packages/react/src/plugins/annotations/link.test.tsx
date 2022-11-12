import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { PdfPageLinkAnnotation } from './link';
import {
  PdfActionType,
  PdfAnnotationSubtype,
  PdfLinkAnnoObject,
  PdfPageObject,
} from '@unionpdf/models';

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
      type: PdfAnnotationSubtype.LINK,
      target: {
        type: 'action',
        action: {
          type: PdfActionType.URI,
          uri: 'https://localhost',
        },
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

    const aElem = document.querySelector(
      '.pdf__annotation--link a'
    ) as HTMLAnchorElement;
    expect(aElem?.getAttribute('title')).toEqual(link.text);

    await act(async () => {
      fireEvent.click(aElem);
    });

    expect(onClick).toBeCalledWith(link);

    result.unmount();
  });
});
