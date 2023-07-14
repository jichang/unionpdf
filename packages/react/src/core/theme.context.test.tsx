import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Theme, ThemeContextProvider, useTheme } from './theme.context';

describe('ThemeContextProvider ', () => {
  let themeInContext: Theme | null;
  function Consumer() {
    themeInContext = useTheme();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const theme = {};
    const result = render(
      <ThemeContextProvider theme={theme}>
        <Consumer />
      </ThemeContextProvider>,
    );

    expect(themeInContext).toEqual(theme);

    result.unmount();
  });
});
