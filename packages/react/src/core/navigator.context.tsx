import { PdfDestinationObject } from '@unionpdf/models';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePdfDocument } from './document.context';
import { useLogger } from './logger.context';

/**
 * Event for goto specific pdf page
 */
export interface PdfNavigatorGotoPageEvent {
  /**
   * event kind
   */
  kind: 'GotoPage';
  /**
   * event data
   */
  data: {
    /**
     * destination of navigation
     */
    destination: PdfDestinationObject;
  };
}

/**
 * Navigation event
 */
export type PdfNavigatorEvent = PdfNavigatorGotoPageEvent;

/**
 * Listerer of navigation event, source needs to be unique
 */
export type PdfNavigatorListener = {
  /**
   * event source of the listner
   */
  source: string;
  /**
   * handler of navigation event
   * @param event - navigation event
   * @param source - event source
   * @returns
   */
  handler: (event: PdfNavigatorEvent, source: string) => void;
};

/**
 * Pdf navigator, can used to navigation inside of pdf document
 */
export interface PdfNavigator {
  /**
   * current page index
   */
  currPageIndex: number;
  /**
   * Goto specific page by sending navigation event
   * @param evt - navigation event
   * @param source - event source
   */
  gotoPage(evt: PdfNavigatorGotoPageEvent['data'], source: string): void;
  /**
   * add event listener
   * @param source - event source
   * @param handler - event handler
   */
  addEventListener(
    source: string,
    handler: PdfNavigatorListener['handler'],
  ): void;
  /**
   * remove event listener
   * @param source - event source
   * @param handler - event handler
   */
  removeEventListener(
    source: string,
    handler: PdfNavigatorListener['handler'],
  ): void;
}

const LOG_SOURCE = 'PdfNavigator';
const LOG_CATEGORY = 'Navigate';

/**
 * context for maintaing pdf navigator
 */
export const PdfNavigatorContext = React.createContext<PdfNavigator>({
  currPageIndex: 0,
  gotoPage: (evt: PdfNavigatorGotoPageEvent['data'], source: string) => {},
  addEventListener: () => {},
  removeEventListener: () => {},
});

/**
 * Properties of PdfNavigatorContextProvider
 */
export interface PdfNavigatorContextProviderProps {
  children: ReactNode;
}

/**
 * Provider component to provide pdf navigator
 * @param props - properties of PdfNavigatorContextProvider
 * @returns
 */
export function PdfNavigatorContextProvider(
  props: PdfNavigatorContextProviderProps,
) {
  const { children } = props;

  const [currPageIndex, setCurrPageIndex] = useState(0);

  const { doc } = usePdfDocument();
  useEffect(() => {
    setCurrPageIndex(0);
  }, [doc, setCurrPageIndex]);

  const logger = useLogger();

  const [listeners, setListeners] = useState<PdfNavigatorListener[]>([]);

  const emit = useCallback(
    (evt: PdfNavigatorEvent, source: string) => {
      logger.debug(
        LOG_SOURCE,
        LOG_CATEGORY,
        `emit navigator event from ${source}`,
      );
      for (const listener of listeners) {
        try {
          if (listener.source !== source) {
            listener.handler(evt, source);
          }
        } catch (e) {
          logger.error(
            LOG_SOURCE,
            LOG_CATEGORY,
            'error happens when calling navigator listener: ',
            e,
          );
        }
      }
    },
    [listeners, logger],
  );

  const gotoPage = useCallback(
    (data: PdfNavigatorGotoPageEvent['data'], source: string) => {
      logger.debug(
        LOG_SOURCE,
        LOG_CATEGORY,
        `${source} try to navigate from ${currPageIndex} to ${data.destination.pageIndex}`,
      );

      if (currPageIndex === data.destination.pageIndex) {
        return;
      }

      emit(
        {
          kind: 'GotoPage',
          data,
        },
        source,
      );

      setCurrPageIndex(data.destination.pageIndex);
    },
    [currPageIndex, setCurrPageIndex, emit],
  );

  const addEventListener = useCallback(
    (source: string, handler: PdfNavigatorListener['handler']) => {
      logger.debug(
        LOG_SOURCE,
        LOG_CATEGORY,
        `add navigator listener from ${source}`,
      );
      setListeners((listeners) => {
        const index = listeners.findIndex((_listener) => {
          return _listener.source === source && _listener.handler !== handler;
        });
        if (index === -1) {
          return [...listeners, { source, handler }];
        } else {
          return listeners;
        }
      });
    },
    [setListeners],
  );

  const removeEventListener = useCallback(
    (source: string, handler: PdfNavigatorListener['handler']) => {
      logger.debug(
        LOG_SOURCE,
        LOG_CATEGORY,
        `remove navigator listener from ${source}`,
      );
      setListeners((listeners) => {
        const index = listeners.findIndex((_listener) => {
          return _listener.source === source && _listener.handler === handler;
        });
        if (index !== -1) {
          return listeners.filter((_listener) => {
            return _listener.source !== source || _listener.handler !== handler;
          });
        } else {
          return listeners;
        }
      });
    },
    [setListeners],
  );

  return (
    <PdfNavigatorContext.Provider
      value={{ currPageIndex, gotoPage, addEventListener, removeEventListener }}
    >
      {children}
    </PdfNavigatorContext.Provider>
  );
}

/**
 * Retrieve pdf navigator in context
 * @returns pdf navigator
 *
 * @public
 */
export function usePdfNavigator() {
  return useContext(PdfNavigatorContext);
}
