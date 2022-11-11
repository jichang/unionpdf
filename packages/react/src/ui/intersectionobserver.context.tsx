import React, {
  ComponentProps,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface IntersectionObserverContextValue {
  observer: IntersectionObserver | null;
  visibleEntryIds: Set<number>;
}

export const IntersectionObserverContext =
  React.createContext<IntersectionObserverContextValue>({
    observer: null,
    visibleEntryIds: new Set(),
  });

export interface IntersectionObserverContextProviderProps
  extends IntersectionObserverInit,
    ComponentProps<'div'> {
  asRoot?: boolean;
  children: ReactNode;
}

export function IntersectionObserverContextProvider(
  props: IntersectionObserverContextProviderProps
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
    new Set()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visiblities: Record<string, boolean> = {};
        entries.forEach((entry, index) => {
          const target = entry.target as HTMLElement;
          const entryId = target.dataset.entryId || index;
          visiblities[entryId] = entry.isIntersecting;
        });

        setVisibleEntryIds((visibleEntryIds) => {
          const updatedVisibleEntryIds: Set<number> = new Set();

          for (const entryId of visibleEntryIds) {
            if (visiblities[entryId] !== false) {
              updatedVisibleEntryIds.add(entryId);
            }
          }

          for (const entryId in visiblities) {
            if (visiblities[entryId] === true) {
              updatedVisibleEntryIds.add(Number(entryId));
            }
          }

          return updatedVisibleEntryIds;
        });
      },
      {
        root: asRoot ? containerElemRef.current : root,
        rootMargin,
        threshold,
      }
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

export function useIntersectionObserver() {
  return useContext(IntersectionObserverContext);
}
