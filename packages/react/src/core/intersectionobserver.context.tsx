import React, {
  ComponentProps,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * Value of IntersectionObserverContext
 */
export interface IntersectionObserverContextValue {
  observer: IntersectionObserver | null;
  visibleEntryIds: Set<number>;
}

export const IntersectionObserverContext =
  React.createContext<IntersectionObserverContextValue>({
    observer: null,
    visibleEntryIds: new Set(),
  });

/**
 * Properties of IntersectionObserverContextProvider
 */
export interface IntersectionObserverContextProviderProps
  extends IntersectionObserverInit,
    ComponentProps<'div'> {
  asRoot?: boolean;
  children: ReactNode;
}

/**
 * Provider component for IntersectionObserverContext
 * this component will use IntersectionObserver to track visiblities
 * of entries in this component
 * @param props - properties of IntersectionObserverContextProvider
 * @returns
 *
 * @public
 */
export function IntersectionObserverContextProvider(
  props: IntersectionObserverContextProviderProps,
) {
  const {
    asRoot = false,
    root,
    rootMargin,
    threshold,
    children,
    ...rest
  } = props;

  const containerElemRef = useRef<HTMLDivElement | null>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [visibleEntryIds, setVisibleEntryIds] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleEntryIds((visibleEntryIds) => {
          const updatedVisibleEntryIds: Set<number> = new Set(visibleEntryIds);

          entries.forEach((entry, index) => {
            const target = entry.target as HTMLDivElement;
            const entryId = Number(target.dataset.entryId) || index;
            if (entry.isIntersecting === false) {
              updatedVisibleEntryIds.delete(entryId);
            } else {
              updatedVisibleEntryIds.add(entryId);
            }
          });

          return updatedVisibleEntryIds;
        });
      },
      {
        root: asRoot ? containerElemRef.current : root,
        rootMargin,
        threshold,
      },
    );
    setObserver(observer);

    return () => {
      observer.disconnect();
    };
  }, [
    containerElemRef.current,
    asRoot,
    root,
    rootMargin,
    threshold,
    setVisibleEntryIds,
  ]);

  return (
    <IntersectionObserverContext.Provider value={{ observer, visibleEntryIds }}>
      <div ref={containerElemRef} {...rest}>
        {children}
      </div>
    </IntersectionObserverContext.Provider>
  );
}

/**
 * Retrieve observer and visible entry ids
 * @returns IntersectionObserver and visible entry ids
 *
 * @public
 */
export function useIntersectionObserver() {
  return useContext(IntersectionObserverContext);
}
