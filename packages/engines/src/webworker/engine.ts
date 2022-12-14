import {
  PdfAttachmentObject,
  PdfEngineError,
  PdfEngineFeature,
  PdfEngineOperation,
  PdfMetadataObject,
  PdfSignatureObject,
  PdfTextRectObject,
  SearchResult,
  SearchTarget,
  Task,
} from '@unionpdf/models';
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
  prepareTask: WorkerTask<boolean, PdfEngineError>;
  tasks: Map<string, WorkerTask<any, PdfEngineError>> = new Map();

  constructor(url: URL, private logger: Logger = new NoopLogger()) {
    this.worker = new Worker(url);
    this.worker.addEventListener('message', this.handle);

    this.prepareTask = new WorkerTask<boolean, PdfEngineError>(
      this.worker,
      '0'
    );
    this.tasks.set('0', this.prepareTask);
  }
  isSupport?:
    | ((
        feature: PdfEngineFeature
      ) => Task<PdfEngineOperation[], PdfEngineError>)
    | undefined;

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

  openDocument(id: string, data: PdfSource, password: string) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'openDocument',
      id,
      data,
      password
    );
    const requestId = this.generateRequestId();
    const task = new WorkerTask<PdfDocumentObject>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'openDocument',
        args: [id, data, password],
      },
    };
    this.proxy(task, request);

    return task;
  }

  getMetadata(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getMetadata', doc);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<PdfMetadataObject>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'getMetadata',
        args: [doc],
      },
    };
    this.proxy(task, request);

    return task;
  }

  getBookmarks(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getBookmarks', doc);
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

  getSignatures(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getSignatures', doc);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<PdfSignatureObject[]>(this.worker, requestId);

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
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderPage',
      doc,
      page,
      scaleFactor,
      rotation
    );
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
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderPageRect',
      doc,
      page,
      scaleFactor,
      rotation,
      rect
    );
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
      doc,
      page,
      scaleFactor,
      rotation
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

  getPageTextRects(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageTextRects',
      doc,
      page,
      scaleFactor,
      rotation
    );
    const requestId = this.generateRequestId();
    const task = new WorkerTask<PdfTextRectObject[]>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'getPageTextRects',
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
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderThumbnail',
      doc,
      page,
      scaleFactor,
      rotation
    );
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

  startSearch(
    doc: PdfDocumentObject,
    contextId: number
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'startSearch', doc, contextId);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'startSearch',
        args: [doc, contextId],
      },
    };
    this.proxy(task, request);

    return task;
  }

  searchNext(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget
  ): Task<SearchResult | undefined, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'searchNext',
      doc,
      contextId,
      target
    );
    const requestId = this.generateRequestId();
    const task = new WorkerTask<SearchResult | undefined>(
      this.worker,
      requestId
    );

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'searchNext',
        args: [doc, contextId, target],
      },
    };
    this.proxy(task, request);

    return task;
  }

  searchPrev(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget
  ): Task<SearchResult | undefined, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'searchPrev',
      doc,
      contextId,
      target
    );
    const requestId = this.generateRequestId();
    const task = new WorkerTask<SearchResult | undefined>(
      this.worker,
      requestId
    );

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'searchPrev',
        args: [doc, contextId, target],
      },
    };
    this.proxy(task, request);

    return task;
  }

  stopSearch(
    doc: PdfDocumentObject,
    contextId: number
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'stopSearch', doc, contextId);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'stopSearch',
        args: [doc, contextId],
      },
    };
    this.proxy(task, request);

    return task;
  }

  saveAsCopy(pdf: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'saveAsCopy', pdf);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<ArrayBuffer>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'saveAsCopy',
        args: [pdf],
      },
    };
    this.proxy(task, request);

    return task;
  }

  getAttachments(pdf: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getAttachments', pdf);
    const requestId = this.generateRequestId();
    const task = new WorkerTask<PdfAttachmentObject[]>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'getAttachments',
        args: [pdf],
      },
    };
    this.proxy(task, request);

    return task;
  }

  readAttachmentContent(
    pdf: PdfDocumentObject,
    attachment: PdfAttachmentObject
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'readAttachmentContent',
      pdf,
      attachment
    );
    const requestId = this.generateRequestId();
    const task = new WorkerTask<ArrayBuffer>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'readAttachmentContent',
        args: [pdf, attachment],
      },
    };
    this.proxy(task, request);

    return task;
  }

  closeDocument(pdf: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'closeDocument', pdf);
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
      task,
      request,
      transferables
    );
    this.prepareTask.wait(
      () => {
        this.worker.postMessage(request, transferables);
        this.tasks.set(request.id, task);
      },
      () => {
        task.reject(new PdfEngineError('worker initialization failed'));
      }
    );
  }
}
