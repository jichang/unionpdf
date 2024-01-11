import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfEditorStamps } from './stamps';
import { PdfApplicationContextProvider } from '../../core';
import {
  PdfTestingAdapterProvider,
  testingMemoryPdfApplicationConfigurationProvider,
} from '../../adapters/testing';

describe('PdfEditorStamps', () => {
  test('should render pdf editor stamps', async () => {
    const result = render(
      <PdfTestingAdapterProvider>
        <PdfApplicationContextProvider
          provider={testingMemoryPdfApplicationConfigurationProvider}
        >
          <PdfEditorStamps />
        </PdfApplicationContextProvider>
      </PdfTestingAdapterProvider>,
    );

    expect(document.querySelectorAll('.pdf__editor__stamps').length).toEqual(1);

    result.unmount();
  });
});
