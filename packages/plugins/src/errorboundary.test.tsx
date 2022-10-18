import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './errorboundary';

describe('ErrorBoundary', () => {
  it('should render children that has no error', () => {
    function Normal() {
      return <div className="normal"></div>;
    }

    const result = render(
      <ErrorBoundary>
        <Normal />
      </ErrorBoundary>
    );

    const divElem = document.querySelector('.normal') as HTMLDivElement;
    expect(divElem).toBeDefined();

    result.unmount();
  });
});
