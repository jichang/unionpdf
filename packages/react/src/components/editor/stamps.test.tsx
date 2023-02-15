import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PdfEditorStamps } from './stamps';
import { PdfApplicationContextProvider, PdfApplicationMode } from '../../core';

describe('PdfEditorStamps', () => {
  test('should render pdf editor stamps', async () => {
    const result = render(
      <PdfApplicationContextProvider mode={PdfApplicationMode.Edit}>
        <PdfEditorStamps />
      </PdfApplicationContextProvider>
    );

    expect(document.querySelectorAll('.pdf__editor__stamps').length).toEqual(1);

    result.unmount();
  });
});
