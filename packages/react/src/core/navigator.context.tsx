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

export interface PdfNavigatorGotoPageEvent {
  kind: 'GotoPage';
  data: {
    destination: PdfDestinationObject;
  };
}

export type PdfNavigatorEvent = PdfNavigatorGotoPageEvent;

export type PdfNavigatorListener = {
  source: string;
  handler: (event: PdfNavigatorEvent, source: string) => void;
};

export interface PdfNavigator {
  currPageIndex: number;
  gotoPage(evt: PdfNavigatorGotoPageEvent['data'], source: string): void;
  addEventListener(source: string, evt: PdfNavigatorListener['handler']): void;
  removeEventListener(
    source: string,
    evt: PdfNavigatorListener['handler']
  ): void;
}

const LOG_SOURCE = 'PdfNavigator';
const LOG_CATEGORY = 'Navigate';

export const PdfNavigatorContext = React.createContext<PdfNavigator>({
  currPageIndex: 0,
  gotoPage: (evt: PdfNavigatorGotoPageEvent['data'], source: string) => {},
  addEventListener: () => {},
  removeEventListener: () => {},
});

export interface PdfNavigatorContextProviderProps {
  children: ReactNode;
}

export function PdfNavigatorContextProvider(
  props: PdfNavigatorContextProviderProps
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
        `emit navigator event from ${source}`
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
            e
          );
        }
      }
    },
    [listeners, logger]
  );

  const gotoPage = useCallback(
    (data: PdfNavigatorGotoPageEvent['data'], source: string) => {
      logger.debug(
        LOG_SOURCE,
        LOG_CATEGORY,
        `${source} try to navigate from ${currPageIndex} to ${data.destination.pageIndex}`
      );

      if (currPageIndex === data.destination.pageIndex) {
        return;
      }

      emit(
        {
          kind: 'GotoPage',
          data,
        },
        source
      );

      setCurrPageIndex(data.destination.pageIndex);
    },
    [currPageIndex, setCurrPageIndex, emit]
  );

  const addEventListener = useCallback(
    (source: string, handler: PdfNavigatorListener['handler']) => {
      logger.debug(
        LOG_SOURCE,
        LOG_CATEGORY,
        `add navigator listener from ${source}`
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
    [setListeners]
  );

  const removeEventListener = useCallback(
    (source: string, handler: PdfNavigatorListener['handler']) => {
      logger.debug(
        LOG_SOURCE,
        LOG_CATEGORY,
        `remove navigator listener from ${source}`
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
    [setListeners]
  );

  return (
    <PdfNavigatorContext.Provider
      value={{ currPageIndex, gotoPage, addEventListener, removeEventListener }}
    >
      {children}
    </PdfNavigatorContext.Provider>
  );
}

export function usePdfNavigator() {
  return useContext(PdfNavigatorContext);
}
