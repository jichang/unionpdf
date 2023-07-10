import React, { ReactNode, useContext } from 'react';
import { Logger, NoopLogger } from '@unionpdf/models';

export const LoggerContext = React.createContext<Logger>(new NoopLogger());

/**
 * Properties of LoggerContextProvider
 */
export interface LoggerContextProviderProps {
  /**
   * Logger instance
   */
  logger: Logger;
  /**
   * Children nodes
   */
  children: ReactNode;
}

/**
 * Provider of LoggerContext
 * @param props - properties
 * @returns
 *
 * @public
 */
export function LoggerContextProvider(props: LoggerContextProviderProps) {
  const { children, logger } = props;

  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  );
}

/**
 * Hooks to retrieve logger instance
 * @returns Logger instance
 */
export function useLogger() {
  return useContext(LoggerContext);
}
