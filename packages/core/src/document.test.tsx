import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfDocument } from './document';

describe('PdfDocument', () => {
  test('should render pdf document element', () => {
    const onOpenSuccess = jest.fn();
    const onOpenFailure = jest.fn();

    const result = render(
      <PdfDocument
        source={new Uint8Array()}
        onOpenSuccess={onOpenSuccess}
        onOpenFailure={onOpenFailure}
      />
    );

    expect(document.querySelector('.pdf__document')).toBeDefined();

    result.unmount();
  });
});
