import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfApplicationContextValue,
  PdfApplicationContextProvider,
  PdfApplicationMode,
  usePdfApplication,
} from './application.context';

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
      <PdfApplicationContextProvider mode={app.mode}>
        <Consumer />
      </PdfApplicationContextProvider>
    );

    expect(appInContext?.mode).toEqual(app.mode);

    result.unmount();
  });
});
