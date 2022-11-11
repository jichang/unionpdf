import React, { ReactNode, useContext } from 'react';
import { Logger, NoopLogger } from '@unionpdf/models';

export const LoggerContext = React.createContext<Logger>(new NoopLogger());

export interface LoggerContextProviderProps {
  logger: Logger;
  children: ReactNode;
}

export function LoggerContextProvider(props: LoggerContextProviderProps) {
  const { children, logger } = props;

  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  );
}

export function useLogger() {
  return useContext(LoggerContext);
}
