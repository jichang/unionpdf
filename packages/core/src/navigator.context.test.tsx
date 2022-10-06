import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMockPdfDocument, createMockPdfEngine } from '@onepdf/mocks';
import {
  PdfNavigatorContextProvider,
  usePdfNavigator,
} from './navigator.context';
import { PdfNavigator } from './navigator';

describe('PdfNavigatorContextProvider ', () => {
  let pdfNavigatorInContext: PdfNavigator | null;
  function Consumer() {
    pdfNavigatorInContext = usePdfNavigator();

    return <div></div>;
  }

  test('should assign context value', () => {
    const pdfNavigator = new PdfNavigator();
    const result = render(
      <PdfNavigatorContextProvider navigator={pdfNavigator}>
        <Consumer />
      </PdfNavigatorContextProvider>
    );

    expect(pdfNavigatorInContext).toBe(pdfNavigator);

    result?.unmount();
  });
});
