import React from 'react';
import {
  PdfCacheContextVale,
  PdfCacheContextProvider,
  usePdfCache,
} from './cache.context';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('PdfCacheContextProvider ', () => {
  let cacheInContext: PdfCacheContextVale | null;
  function Consumer() {
    cacheInContext = usePdfCache();

    return <div></div>;
  }

  test('should assign context value', () => {
    const result = render(
      <PdfCacheContextProvider>
        <Consumer />
      </PdfCacheContextProvider>
    );

    expect(cacheInContext?.setAnnotation).toBeDefined();

    result?.unmount();
  });
});
