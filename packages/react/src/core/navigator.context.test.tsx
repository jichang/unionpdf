import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfNavigator,
  PdfNavigatorContextProvider,
  usePdfNavigator,
} from './navigator.context';

describe('PdfNavigatorContextProvider ', () => {
  let pdfNavigatorInContext: PdfNavigator;
  function Consumer() {
    pdfNavigatorInContext = usePdfNavigator();

    return <div></div>;
  }

  test('should assign context value', () => {
    const result = render(
      <PdfNavigatorContextProvider>
        <Consumer />
      </PdfNavigatorContextProvider>,
    );

    expect(pdfNavigatorInContext?.currPageIndex).toBe(0);

    result?.unmount();
  });
});
