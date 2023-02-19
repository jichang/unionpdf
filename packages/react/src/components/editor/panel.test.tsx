import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfEditorPanel } from './panel';
import { PdfApplicationContextProvider, PdfApplicationMode } from '../../core';

describe('PdfEditorPanel', () => {
  test('should render pdf editor panel', async () => {
    const result = render(
      <PdfApplicationContextProvider initialMode={PdfApplicationMode.Edit}>
        <PdfEditorPanel />
      </PdfApplicationContextProvider>
    );

    expect(document.querySelectorAll('.pdf__editor__panel').length).toEqual(1);

    result.unmount();
  });
});
