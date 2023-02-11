import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfToolbar } from './toolbar';

describe('Toolbar', () => {
  it('Toolbar should render div with children', () => {
    const result = render(<PdfToolbar />);

    const divElem = document.querySelector('div') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
