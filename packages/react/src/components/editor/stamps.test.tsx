import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfEditorStamps } from './stamps';
import { PdfApplicationContextProvider, PdfApplicationMode } from '../../core';
import { PdfNativeAdapterProvider } from '../../adapters/native';

describe('PdfEditorStamps', () => {
  test('should render pdf editor stamps', async () => {
    const result = render(
      <PdfNativeAdapterProvider>
        <PdfApplicationContextProvider initialMode={PdfApplicationMode.Edit}>
          <PdfEditorStamps />
        </PdfApplicationContextProvider>
      </PdfNativeAdapterProvider>
    );

    expect(document.querySelectorAll('.pdf__editor__stamps').length).toEqual(1);

    result.unmount();
  });
});
