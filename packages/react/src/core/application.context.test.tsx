import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfApplicationContextValue,
  PdfApplicationContextProvider,
  usePdfApplication,
} from './application.context';
import { PdfApplicationMode } from './application.configuration';
import { testingMemoryPdfApplicationConfigurationProvider } from '../adapters/testing';

describe('PdfApplicationContextProvider ', () => {
  let appInContext: PdfApplicationContextValue | null;
  function Consumer() {
    appInContext = usePdfApplication();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const app = {
      mode: PdfApplicationMode.Edit,
    };
    const result = render(
      <PdfApplicationContextProvider
        provider={testingMemoryPdfApplicationConfigurationProvider}
      >
        <Consumer />
      </PdfApplicationContextProvider>
    );

    expect(appInContext?.mode).toEqual(app.mode);

    result.unmount();
  });
});
