export type PdfNavigatorEvent = {
  kind: "Change";
  data: {
    pageIndex: number;
  };
};

export type PdfNavigatorListener = {
  source: string;
  handler: (event: PdfNavigatorEvent, source: string) => void;
};

export class PdfNavigator {
  currPageIndex = 0;
  listeners: PdfNavigatorListener[] = [];

  gotoPage(pageIndex: number, source: string) {
    if (this.currPageIndex === pageIndex) {
      return;
    }
    this.currPageIndex = pageIndex;

    this.emit(
      {
        kind: "Change",
        data: {
          pageIndex,
        },
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
        console.log(e);
      }
    }
  }

  addEventListener(source: string, handler: PdfNavigatorListener["handler"]) {
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
    handler: PdfNavigatorListener["handler"]
  ) {
    const index = this.listeners.findIndex((_listener) => {
      return _listener.source === source && _listener.handler === handler;
    });
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }
}
