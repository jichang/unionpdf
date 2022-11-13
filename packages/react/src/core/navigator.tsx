import { Logger, NoopLogger, PdfDestinationObject } from '@unionpdf/models';

export interface PdfNavigatorGotoPageEvent {
  kind: 'GotoPage';
  data: {
    destination: PdfDestinationObject;
  };
}

export type PdfNavigatorEvent = PdfNavigatorGotoPageEvent;

const LOG_SOURCE = 'PdfNavigator';
const LOG_CATEGORY = 'Navigate';

export type PdfNavigatorListener = {
  source: string;
  handler: (event: PdfNavigatorEvent, source: string) => void;
};

export class PdfNavigator {
  currPageIndex = 0;
  listeners: PdfNavigatorListener[] = [];

  constructor(private logger: Logger = new NoopLogger()) {}

  gotoPage(data: PdfNavigatorGotoPageEvent['data'], source: string) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      `${source} try to navigate to `,
      data
    );

    if (this.currPageIndex === data.destination.pageIndex) {
      return;
    }
    this.currPageIndex = data.destination.pageIndex;

    this.emit(
      {
        kind: 'GotoPage',
        data,
      },
      source
    );
  }

  emit(evt: PdfNavigatorEvent, source: string) {
    for (const listener of this.listeners) {
      try {
        if (listener.source !== source) {
          listener.handler(evt, source);
        }
      } catch (e) {
        this.logger.error(
          LOG_SOURCE,
          LOG_CATEGORY,
          'error happens when calling navigator listener: ',
          e
        );
      }
    }
  }

  addEventListener(source: string, handler: PdfNavigatorListener['handler']) {
    const index = this.listeners.findIndex((_listener) => {
      return _listener.source === source;
    });
    if (index === -1) {
      this.listeners.push({
        source,
        handler,
      });
    }
  }

  removeEventListener(
    source: string,
    handler: PdfNavigatorListener['handler']
  ) {
    const index = this.listeners.findIndex((_listener) => {
      return _listener.source === source && _listener.handler === handler;
    });
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }
}
