import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  useUIStrings,
  UIStringsContextProvider,
  UIStrings,
} from './uistrings.context';

describe('UIStringsContextProvider ', () => {
  let uiStringsInContext: UIStrings;
  function Consumer() {
    uiStringsInContext = useUIStrings();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const components = { download: 'test' } as unknown as UIStrings;

    const result = render(
      <UIStringsContextProvider strings={components}>
        <Consumer />
      </UIStringsContextProvider>,
    );

    expect(uiStringsInContext.download).toEqual('test');

    result.unmount();
  });
});
