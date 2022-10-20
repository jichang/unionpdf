import React from 'react';
import { PdfEngineContextProvider, usePdfEngine } from './engine.context';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';

describe('PdfEngineContextProvider ', () => {
  function Consumer({
    buffer,
    signal,
  }: {
    buffer: Uint8Array;
    signal: AbortSignal;
  }) {
    const engine = usePdfEngine();

    if (engine) {
      engine.open(buffer, signal);
    }

    return <div></div>;
  }

  test('should assign context value', () => {
    const buffer = new Uint8Array();
    const abortController = new AbortController();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <Consumer buffer={buffer} signal={abortController.signal} />
      </PdfEngineContextProvider>
    );

    act(() => {
      engine.openDefer.resolve(createMockPdfDocument());
    });

    expect(engine.open).toBeCalledTimes(1);
    expect(engine.open).toBeCalledWith(buffer, abortController.signal);

    result?.unmount();
  });
});
