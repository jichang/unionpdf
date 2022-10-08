import React from 'react';
import { PdfEngineContextProvider, usePdfEngine } from './engine.context';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';

describe('PdfEngineContextProvider ', () => {
  function Consumer({ signal }: { signal: AbortSignal }) {
    const engine = usePdfEngine();

    if (engine) {
      engine.open('http://localhost', signal);
    }

    return <div></div>;
  }

  test('should assign context value', () => {
    const abortController = new AbortController();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <Consumer signal={abortController.signal} />
      </PdfEngineContextProvider>
    );

    act(() => {
      engine.openDefer.resolve(createMockPdfDocument());
    });

    expect(engine.open).toBeCalledTimes(1);
    expect(engine.open).toBeCalledWith(
      'http://localhost',
      abortController.signal
    );

    result?.unmount();
  });
});
