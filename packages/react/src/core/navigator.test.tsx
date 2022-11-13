import { PdfZoomMode } from '@unionpdf/models';
import { PdfNavigator } from './navigator';

describe('PdfNavigator', () => {
  test('should keep record and call listener when trigger event', () => {
    const pdfNavigator = new PdfNavigator();
    const listenerA = jest.fn();
    const listenerB = jest.fn();

    pdfNavigator.addEventListener('a', listenerA);
    pdfNavigator.addEventListener('b', listenerB);

    expect(pdfNavigator.listeners.length).toEqual(2);

    pdfNavigator.gotoPage(
      {
        destination: {
          pageIndex: 1,
          zoom: {
            mode: PdfZoomMode.Unknown,
          },
          view: [],
        },
      },
      'test'
    );

    expect(listenerA).toBeCalledTimes(1);
    expect(listenerA).toBeCalledWith(
      {
        kind: 'GotoPage',
        data: {
          destination: {
            pageIndex: 1,
            zoom: {
              mode: PdfZoomMode.Unknown,
            },
            view: [],
          },
        },
      },
      'test'
    );

    expect(listenerB).toBeCalledTimes(1);
    expect(listenerB).toBeCalledWith(
      {
        kind: 'GotoPage',
        data: {
          destination: {
            pageIndex: 1,
            zoom: {
              mode: PdfZoomMode.Unknown,
            },
            view: [],
          },
        },
      },
      'test'
    );

    pdfNavigator.removeEventListener('a', listenerA);
    pdfNavigator.removeEventListener('b', listenerB);

    expect(pdfNavigator.listeners.length).toEqual(0);
  });
});
