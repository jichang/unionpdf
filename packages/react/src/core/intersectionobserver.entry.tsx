import React, { useEffect, useRef } from 'react';
import { ComponentProps } from 'react';
import { useIntersectionObserver } from './intersectionobserver.context';

/**
 * Properties of IntersectionObserverEntry
 */
export interface IntersectionObserverEntryProps extends ComponentProps<'div'> {
  /**
   * Id of this entry
   */
  entryId: string;
}

/**
 * Entry component for IntersectionObserver
 * this component will use IntersectionObserver to track visiblities of itself
 * @param props - properties of IntersectionObserverEntryProvider
 * @returns
 *
 * @public
 */
export function IntersectionObserverEntry(
  props: IntersectionObserverEntryProps
) {
  const { entryId, children, ...rest } = props;
  const { observer } = useIntersectionObserver();
  const containerElemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerElemRef.current && observer) {
      const containerElem = containerElemRef.current;
      observer.observe(containerElem);

      return () => {
        observer.unobserve(containerElem);
      };
    }
  }, [observer, containerElemRef.current]);

  return (
    <div ref={containerElemRef} data-entry-id={entryId} {...rest}>
      {children}
    </div>
  );
}
