import React from 'react';
import {
  IntersectionObserverContextProvider,
  IntersectionObserverContextValue,
  useIntersectionObserver,
} from './intersectionobserver.context';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { intersectionObserver } from '@shopify/jest-dom-mocks';
import { IntersectionObserverEntry } from './intersectionobserver.entry';

describe('IntersectionObserverContextProvider ', () => {
  let intersectionObserverInContext: IntersectionObserverContextValue | null;
  function Consumer() {
    intersectionObserverInContext = useIntersectionObserver();

    return <div></div>;
  }

  test('should assign context value', () => {
    intersectionObserver.mock();

    const result = render(
      <IntersectionObserverContextProvider>
        <Consumer />
        <IntersectionObserverEntry entryId="100" />
      </IntersectionObserverContextProvider>,
    );

    expect(intersectionObserverInContext).toBeDefined();
    expect(intersectionObserverInContext?.observer).toBeDefined();
    expect(intersectionObserverInContext?.visibleEntryIds.size).toEqual(0);

    act(() => {
      intersectionObserver.simulate({ isIntersecting: true });
    });

    expect(intersectionObserverInContext?.visibleEntryIds.size).toEqual(1);
    expect(intersectionObserverInContext?.visibleEntryIds.has(100)).toBe(true);

    result?.unmount();

    intersectionObserver.restore();
  });
});
