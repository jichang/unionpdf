import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { PdfPageLinkAnnotation } from './link';
import {
  PdfActionType,
  PdfAnnotationObjectStatus,
  PdfAnnotationSubtype,
  PdfLinkAnnoObject,
  PdfPageObject,
  PdfZoomMode,
  Rotation,
} from '@unionpdf/models';
import { PdfLinkAnnoContextProvider } from './link.context';

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
      status: PdfAnnotationObjectStatus.Commited,
      pageIndex: 0,
      id: 0,
      type: PdfAnnotationSubtype.LINK,
      target: {
        type: 'action',
        action: {
          type: PdfActionType.Goto,
          destination: {
            pageIndex: 0,
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
      <PdfLinkAnnoContextProvider onClick={onClick}>
        <PdfPageLinkAnnotation
          page={page}
          annotation={link}
          scaleFactor={0}
          rotation={Rotation.Degree0}
        />
      </PdfLinkAnnoContextProvider>
    );

    const aElem = document.querySelector('a') as HTMLAnchorElement;
    expect(aElem?.getAttribute('title')).toEqual(link.text);

    await act(async () => {
      fireEvent.click(aElem);
    });

    expect(onClick).toBeCalledTimes(1);

    result.unmount();
  });
});
