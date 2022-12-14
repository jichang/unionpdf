import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfApplication } from './application';
import { PdfApplicationMode } from './application.context';

describe('PdfApplication', () => {
  test('should render pdf document element', () => {
    const result = render(<PdfApplication mode={PdfApplicationMode.Edit} />);

    expect(
      document.querySelector('.pdf__application.pdf__application--edit')
    ).toBeDefined();

    result.unmount();
  });
});
