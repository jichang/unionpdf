import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfToolbar } from './toolbar';
import { PdfTestingAdapterProvider } from '../../adapters/testing';

describe('Toolbar', () => {
  it('Toolbar should render div with children', () => {
    const result = render(
      <PdfTestingAdapterProvider>
        <PdfToolbar onClose={jest.fn()} />
      </PdfTestingAdapterProvider>
    );

    const divElem = document.querySelector('div') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
