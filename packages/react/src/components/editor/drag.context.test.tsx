import React from 'react';
import {
  PdfDragContextVale,
  PdfDragContextProvider,
  usePdfDrag,
} from './drag.context';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('PdfCacheContextProvider ', () => {
  let cacheInContext: PdfDragContextVale | null;
  function Consumer() {
    cacheInContext = usePdfDrag();

    return <div></div>;
  }

  test('should assign context value', () => {
    const result = render(
      <PdfDragContextProvider>
        <Consumer />
      </PdfDragContextProvider>
    );

    expect(cacheInContext?.setAnnotation).toBeDefined();

    result?.unmount();
  });
});
