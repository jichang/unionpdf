import React from 'react';
import { PdfEngineContextProvider, usePdfEngine } from './engine.context';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { createMockPdfEngine } from '@unionpdf/mocks';
import { PdfEngine } from '@unionpdf/models';

describe('PdfEngineContextProvider ', () => {
  let engineInContext: PdfEngine | null;
  function Consumer() {
    engineInContext = usePdfEngine();

    return <div></div>;
  }

  test('should assign context value', () => {
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <Consumer />
      </PdfEngineContextProvider>
    );

    expect(engineInContext).toBe(engine);

    result?.unmount();
  });
});
