import React from 'react';
import { LoggerContextProvider, useLogger } from './logger.context';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Logger, NoopLogger } from '@unionpdf/models';

describe('LoggerContextProvider ', () => {
  let loggerInContext: Logger | null;
  function Consumer() {
    loggerInContext = useLogger();

    return <div></div>;
  }

  test('should assign context value', () => {
    const logger = new NoopLogger();
    const result = render(
      <LoggerContextProvider logger={logger}>
        <Consumer />
      </LoggerContextProvider>,
    );

    expect(loggerInContext).toBe(logger);

    result?.unmount();
  });
});
