import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfLinkAnnoContextValue,
  PdfLinkAnnoContextProvider,
  usePdfLinkAnnoContext,
} from './link.context';

describe('PdfLinkAnnoContextProvider ', () => {
  let context: PdfLinkAnnoContextValue | null;
  function Consumer() {
    context = usePdfLinkAnnoContext();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const value = {
      onClick: jest.fn(),
    };
    const result = render(
      <PdfLinkAnnoContextProvider onClick={value.onClick}>
        <Consumer />
      </PdfLinkAnnoContextProvider>
    );

    expect(context?.onClick).toEqual(value.onClick);

    result.unmount();
  });
});
