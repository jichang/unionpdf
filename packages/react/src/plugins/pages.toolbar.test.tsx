import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfPagesToolbar } from './pages.toolbar';

describe('PdfPagesToolbar', () => {
  it('Toolbar should render div with children', () => {
    const result = render(
      <PdfPagesToolbar
        scaleFactor={1}
        changeRotation={jest.fn()}
        rotation={0}
        changeScaleFactor={jest.fn()}
      />
    );

    const divElem = document.querySelector('div') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
