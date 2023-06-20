import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfEditorPanel } from './panel';
import { PdfApplicationContextProvider, PdfApplicationMode } from '../../core';
import { PdfNativeAdapterProvider } from '../../adapters/native';

describe('PdfEditorPanel', () => {
  test('should render pdf editor panel', async () => {
    const result = render(
      <PdfNativeAdapterProvider>
        <PdfApplicationContextProvider initialMode={PdfApplicationMode.Edit}>
          <PdfEditorPanel />
        </PdfApplicationContextProvider>
      </PdfNativeAdapterProvider>
    );

    expect(document.querySelectorAll('.pdf__editor__panel').length).toEqual(1);

    result.unmount();
  });
});
