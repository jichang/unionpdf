import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  useUIComponents,
  UIComponentsContextProvider,
  UIComponents,
} from './uicomponents.context';

describe('UIComponentsContextProvider ', () => {
  let uiComponentsInContext: UIComponents;
  function Consumer() {
    uiComponentsInContext = useUIComponents();

    return <div></div>;
  }

  test('should assign context value', async () => {
    const components = { Link: 'test' } as unknown as UIComponents;

    const result = render(
      <UIComponentsContextProvider components={components}>
        <Consumer />
      </UIComponentsContextProvider>,
    );

    expect(uiComponentsInContext.Link).toEqual('test');

    result.unmount();
  });
});
