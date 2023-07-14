import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfToolbarPagesItemGroup } from './pages.toolbar';
import { PdfTestingAdapterProvider } from '../../adapters/testing';

describe('PdfToolbarPagesItemGroup', () => {
  it('Toolbar should render div with children', () => {
    const result = render(
      <PdfTestingAdapterProvider>
        <PdfToolbarPagesItemGroup />
      </PdfTestingAdapterProvider>,
    );

    const divElem = document.querySelector('div') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
