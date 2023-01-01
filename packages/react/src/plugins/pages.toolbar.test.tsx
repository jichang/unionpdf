import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfToolbarViewPagesItemGroup } from './pages.toolbar';

describe('PdfToolbarViewPagesItemGroup', () => {
  it('Toolbar should render div with children', () => {
    const result = render(
      <PdfToolbarViewPagesItemGroup
        scaleFactor={1}
        changeRotation={jest.fn()}
        rotation={0}
        changeScaleFactor={jest.fn()}
        toggleIsSearchPanelOpened={jest.fn()}
      />
    );

    const divElem = document.querySelector('div') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });
});
