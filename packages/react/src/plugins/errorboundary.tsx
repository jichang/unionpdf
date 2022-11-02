import React from 'react';
import { UIStringsContext } from '../ui/ui.context';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  error?: Error | undefined;
}

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
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <UIStringsContext.Consumer>
          {(strings) => {
            return <h1>{strings.unknownError}</h1>;
          }}
        </UIStringsContext.Consumer>
      );
    }

    return this.props.children;
  }
}
