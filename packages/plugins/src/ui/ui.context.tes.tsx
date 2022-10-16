import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  useUIComponents,
  UIComponentsContextProvider,
  UIComponents,
  DEFAULT_UI_COMPONENTS,
  UIStringsContextProvider,
  UIStrings,
  useUIStrings,
  DEFAULT_UI_STRINGS,
} from './ui.context';

describe('UIComponentsContextProvider ', () => {
  let uiComponentsInContext: UIComponents;
  function Consumer() {
    uiComponentsInContext = useUIComponents();

    return <div></div>;
  }

  test('should use default UI', async () => {
    const result = render(<Consumer />);

    expect(uiComponentsInContext).toEqual(DEFAULT_UI_COMPONENTS);

    result.unmount();
  });

  test('should assign context value', async () => {
    const components = {
      ToolbarComponent: jest.fn(() => {
        return <div></div>;
      }),
    };

    const result = render(
      <UIComponentsContextProvider components={components}>
        <Consumer />
      </UIComponentsContextProvider>
    );

    expect(uiComponentsInContext.ToolbarComponent).toEqual(
      components.ToolbarComponent
    );

    result.unmount();
  });
});

describe('UIStringsContextProvider ', () => {
  let uiStringsInContext: UIStrings;
  function Consumer() {
    uiStringsInContext = useUIStrings();

    return <div></div>;
  }

  test('should use default UI', async () => {
    const result = render(<Consumer />);

    expect(uiStringsInContext).toEqual(DEFAULT_UI_STRINGS);

    result.unmount();
  });

  test('should assign context value', async () => {
    const strings = {};

    const result = render(
      <UIStringsContextProvider strings={strings}>
        <Consumer />
      </UIStringsContextProvider>
    );

    expect(uiStringsInContext).toEqual(strings);

    result.unmount();
  });
});
