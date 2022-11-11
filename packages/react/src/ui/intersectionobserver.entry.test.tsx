import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import { IntersectionObserverEntry } from './intersectionobserver.entry';

describe('IntersectionObserverEntry', () => {
  it('should render div with children', () => {
    intersectionObserver.mock();
    const result = render(<IntersectionObserverEntry entryId="0" />);

    const divElem = document.querySelector('div') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();

    intersectionObserver.restore();
  });
});
