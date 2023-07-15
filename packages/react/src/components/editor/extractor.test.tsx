import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfEditorExtractor } from './extractor';
import { PdfApplicationContextProvider, PdfApplicationMode } from '../../core';
import { intersectionObserver } from '../../mocks/intersectionObserver';
import {
  PdfTestingAdapterProvider,
  testingMemoryPdfApplicationConfigurationProvider,
} from '../../adapters/testing';

describe('PdfEditorExtractor', () => {
  test('should render pdf editor extractor', async () => {
    intersectionObserver.mock();
    const result = render(
      <PdfTestingAdapterProvider>
        <PdfApplicationContextProvider
          provider={testingMemoryPdfApplicationConfigurationProvider}
        >
          <PdfEditorExtractor />
        </PdfApplicationContextProvider>
      </PdfTestingAdapterProvider>,
    );

    expect(document.querySelectorAll('.pdf__editor__extractor').length).toEqual(
      1,
    );

    result.unmount();
  });
});
