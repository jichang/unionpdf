import {
  Logger,
  NoopLogger,
  PdfAnnotationObject,
  PdfBookmarksObject,
  PdfDocumentObject,
  PdfEngine,
  PdfPageObject,
  PdfSource,
  Rect,
  Rotation,
  TaskAbortError,
  TaskBase,
} from '@unionpdf/models';
import { ExecuteRequest, Request, Response } from './runner';

const LOG_SOURCE = 'WebWorkerEngine';
const LOG_CATEGORY = 'Engine';

export class WorkerTask<R, E = Error> extends TaskBase<R, E> {
  constructor(public worker: Worker, private messageId: string) {
    super();
  }

  abort(e?: TaskAbortError | Error) {
    super.abort(e);

    this.worker.postMessage({
      type: 'AbortRequest',
      data: {
        messageId: this.messageId,
      },
    });
  }
}

export class WebWorkerEngine implements PdfEngine {
  worker: Worker;
  prepareTask: WorkerTask<boolean, Error>;
  tasks: Map<string, WorkerTask<any, Error>> = new Map();

  constructor(url: URL, private logger: Logger = new NoopLogger()) {
    this.worker = new Worker(url);
    this.worker.addEventListener('message', this.handle);

    this.prepareTask = new WorkerTask<boolean, Error>(this.worker, '0');
    this.tasks.set('0', this.prepareTask);
  }

  handle = (evt: MessageEvent<any>) => {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'webworker engine start handling message: ',
      evt.data
    );
    try {
      const response = evt.data as Response;
      const task = this.tasks.get(response.id);
      if (!task) {
        return;
      }

      switch (response.type) {
        case 'ReadyResponse':
          this.prepareTask.resolve(true);
          break;
        case 'ExecuteResponse':
          {
            switch (response.data.type) {
              case 'resolve':
                task.resolve(response.data.result);
                break;
              case 'reject':
                task.reject(response.data.error);
                break;
            }
            this.tasks.delete(response.id);
          }
          break;
      }
    } catch (e) {
      this.logger.error(
        LOG_SOURCE,
        LOG_CATEGORY,
        'webworker met error when handling message: ',
        e
      );
    }
  };

  generateRequestId() {
    return `${Date.now()}.${Math.random()}`;
  }

  initialize() {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'initialize');
    const requestId = this.generateRequestId();
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'initialize',
        args: [],
      },
    };
    this.proxy(task, request);

    return task;
  }

  destroy() {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'destroy');
    const requestId = this.generateRequestId();
    const task = new WorkerTask<boolean>(this.worker, requestId);

    task.wait(
      () => {
        this.worker.removeEventListener('message', this.handle);
      },
      () => {
        this.worker.removeEventListener('message', this.handle);
      }
    );

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'destroy',
        args: [],
      },
    };
    this.proxy(task, request);

    return task;
  }

  openDocument(id: string, data: PdfSource) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'openDocument', arguments);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<PdfDocumentObject>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'openDocument',
        args: [id, data],
      },
    };
    this.proxy(task, request);

    return task;
  }

  getBookmarks(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getBookmarks', arguments);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<PdfBookmarksObject>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'getBookmarks',
        args: [doc],
      },
    };
    this.proxy(task, request);

    return task;
  }

  renderPage(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderPage', arguments);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<ImageData>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'renderPage',
        args: [doc, page, scaleFactor, rotation],
      },
    };
    this.proxy(task, request);

    return task;
  }

  renderPageRect(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    rect: Rect
  ) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderPageRect', arguments);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<ImageData>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'renderPageRect',
        args: [doc, page, scaleFactor, rotation, rect],
      },
    };
    this.proxy(task, request);

    return task;
  }

  getPageAnnotations(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageAnnotations',
      arguments
    );
    const requestId = this.generateRequestId();
    const task = new WorkerTask<PdfAnnotationObject[]>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'getPageAnnotations',
        args: [doc, page, scaleFactor, rotation],
      },
    };
    this.proxy(task, request);

    return task;
  }

  renderThumbnail(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'renderThumbnail', arguments);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<ImageData>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'renderThumbnail',
        args: [doc, page, scaleFactor, rotation],
      },
    };
    this.proxy(task, request);

    return task;
  }

  closeDocument(pdf: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'closeDocument', arguments);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'closeDocument',
        args: [pdf],
      },
    };
    this.proxy(task, request);

    return task;
  }

  proxy<R>(task: WorkerTask<R>, request: Request, transferables: any[] = []) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'send request to worker',
      arguments
    );
    this.prepareTask.wait(
      () => {
        this.worker.postMessage(request, transferables);
        this.tasks.set(request.id, task);
      },
      () => {
        task.reject(new Error('worker initialization failed'));
      }
    );
  }
}
