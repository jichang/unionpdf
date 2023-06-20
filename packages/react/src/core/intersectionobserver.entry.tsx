import React, { useEffect, useRef } from 'react';
import { ComponentProps } from 'react';
import { useIntersectionObserver } from './intersectionobserver.context';

export interface IntersectionObserverEntryProps extends ComponentProps<'div'> {
  entryId: string;
}

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
