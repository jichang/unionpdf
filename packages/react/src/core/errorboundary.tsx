import React from 'react';
import { UIStringsContext } from '../adapters';
import { Logger } from '@unionpdf/models';

/**
 * Properties of common error boundary component
 */
export interface ErrorBoundaryProps {
  /**
   * Log source
   */
  source: string;
  /**
   * Logger instance
   */
  logger: Logger;
  /**
   * children nodes
   */
  children: React.ReactNode;
}

/**
 * State of common error boundary component
 */
export interface ErrorBoundaryState {
  /**
   * catched error
   */
  error?: Error | undefined;
}

/**
 * Error boundary component
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.props.logger.error(
      this.props.source,
      'UncaughtError',
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.error) {
      return (
        <UIStringsContext.Consumer>
          {(strings) => {
            return <h1>{strings?.unknownError}</h1>;
          }}
        </UIStringsContext.Consumer>
      );
    }

    return this.props.children;
  }
}
