import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfApplication } from './application';
import { PdfApplicationContextProvider } from './application.context';
import { testingMemoryPdfApplicationConfigurationProvider } from '../adapters/testing';

describe('PdfApplication', () => {
  test('should render pdf document element', () => {
    const result = render(
      <PdfApplicationContextProvider
        provider={testingMemoryPdfApplicationConfigurationProvider}
      >
        <PdfApplication />
      </PdfApplicationContextProvider>,
    );

    expect(
      document.querySelector('.pdf__application.pdf__application--edit'),
    ).toBeDefined();

    result.unmount();
  });
});
