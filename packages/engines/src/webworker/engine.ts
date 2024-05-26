import {
  FormFieldValue,
  PdfAnnotationTransformation,
  PdfAttachmentObject,
  PdfEngineError,
  PdfEngineFeature,
  PdfEngineOperation,
  PdfFile,
  PdfMetadataObject,
  PdfSignatureObject,
  PdfTextRectObject,
  PdfWidgetAnnoObject,
  SearchResult,
  SearchTarget,
  Task,
} from '@unionpdf/models';
import { PdfRenderOptions } from '@unionpdf/models';
import {
  Logger,
  NoopLogger,
  PdfAnnotationObject,
  PdfBookmarksObject,
  PdfDocumentObject,
  PdfEngine,
  PdfPageObject,
  Rect,
  Rotation,
  TaskAbortError,
  TaskBase,
} from '@unionpdf/models';
import { ExecuteRequest, Response } from './runner';

const LOG_SOURCE = 'WebWorkerEngine';
const LOG_CATEGORY = 'Engine';

/**
 * Task that executed by webworker
 */
export class WorkerTask<R, E = Error> extends TaskBase<R, E> {
  /**
   * Create a task that bind to web worker with specified message id
   * @param worker - web worker instance
   * @param messageId - id of message
   *
   * @public
   */
  constructor(
    public worker: Worker,
    private messageId: string,
  ) {
    super();
  }

  /**
   * {@inheritDoc @unionpdf/models!TaskBase.abort}
   *
   * @override
   */
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

/**
 * PDF engine that runs within webworker
 */
export class WebWorkerEngine implements PdfEngine {
  static readyTaskId = '0';
  /**
   * Task that represent the state of preparation
   */
  readyTask: WorkerTask<boolean, PdfEngineError>;
  /**
   * All the tasks that is executing
   */
  tasks: Map<string, WorkerTask<any, PdfEngineError>> = new Map();

  /**
   * Create an instance of WebWorkerEngine, it will create a worker with
   * specified url.
   * @param worker - webworker instance, this worker needs to contains the running instance of {@link EngineRunner}
   * @param logger - logger instance
   *
   * @public
   */
  constructor(
    private worker: Worker,
    private logger: Logger = new NoopLogger(),
  ) {
    this.worker.addEventListener('message', this.handle);

    this.readyTask = new WorkerTask<boolean, PdfEngineError>(
      this.worker,
      WebWorkerEngine.readyTaskId,
    );
    this.tasks.set(WebWorkerEngine.readyTaskId, this.readyTask);
  }
  isSupport?:
    | ((
        feature: PdfEngineFeature,
      ) => Task<PdfEngineOperation[], PdfEngineError>)
    | undefined;

  /**
   * Handle event from web worker. There are 2 kinds of event
   * 1. ReadyResponse: web worker is ready
   * 2. ExecuteResponse: result of execution
   * @param evt - message event from web worker
   * @returns
   *
   * @private
   */
  handle = (evt: MessageEvent<any>) => {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'webworker engine start handling message: ',
      evt.data,
    );
    try {
      const response = evt.data as Response;
      const task = this.tasks.get(response.id);
      if (!task) {
        return;
      }

      switch (response.type) {
        case 'ReadyResponse':
          this.readyTask.resolve(true);
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
        e,
      );
    }
  };

  /**
   * Generate a unique message id
   * @returns message id
   *
   * @private
   */
  generateRequestId(id: string) {
    return `${id}.${Date.now()}.${Math.random()}`;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.initialize}
   *
   * @public
   */
  initialize() {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'initialize');
    const requestId = this.generateRequestId('General');
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.destroy}
   *
   * @public
   */
  destroy() {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'destroy');
    const requestId = this.generateRequestId('General');
    const task = new WorkerTask<boolean>(this.worker, requestId);

    task.wait(
      () => {
        this.worker.removeEventListener('message', this.handle);
      },
      () => {
        this.worker.removeEventListener('message', this.handle);
      },
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.openDocument}
   *
   * @public
   */
  openDocument(file: PdfFile, password: string) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'openDocument', file, password);
    const requestId = this.generateRequestId(file.id);
    const task = new WorkerTask<PdfDocumentObject>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'openDocument',
        args: [file, password],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getMetadata}
   *
   * @public
   */
  getMetadata(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getMetadata', doc);
    const requestId = this.generateRequestId(doc.id);
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getBookmarks}
   *
   * @public
   */
  getBookmarks(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getBookmarks', doc);
    const requestId = this.generateRequestId(doc.id);
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getSignatures}
   *
   * @public
   */
  getSignatures(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getSignatures', doc);
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<PdfSignatureObject[]>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'getSignatures',
        args: [doc],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.renderPage}
   *
   * @public
   */
  renderPage(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    options: PdfRenderOptions,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderPage',
      doc,
      page,
      scaleFactor,
      rotation,
      options,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<ImageData>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'renderPage',
        args: [doc, page, scaleFactor, rotation, options],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.renderPageRect}
   *
   * @public
   */
  renderPageRect(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    rect: Rect,
    options: PdfRenderOptions,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderPageRect',
      doc,
      page,
      scaleFactor,
      rotation,
      rect,
      options,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<ImageData>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'renderPageRect',
        args: [doc, page, scaleFactor, rotation, rect, options],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getPageAnnotations}
   *
   * @public
   */
  getPageAnnotations(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageAnnotations',
      doc,
      page,
      scaleFactor,
      rotation,
    );
    const requestId = this.generateRequestId(doc.id);
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.createPageAnnotation}
   *
   * @public
   */
  createPageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'createPageAnnotations',
      doc,
      page,
      annotation,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'createPageAnnotation',
        args: [doc, page, annotation],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.transformPageAnnotation}
   *
   * @public
   */
  transformPageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
    transformation: PdfAnnotationTransformation,
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'transformPageAnnotation',
      doc,
      page,
      annotation,
      transformation,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'transformPageAnnotation',
        args: [doc, page, annotation, transformation],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.removePageAnnotation}
   *
   * @public
   */
  removePageAnnotation(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'removePageAnnotations',
      doc,
      page,
      annotation,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'removePageAnnotation',
        args: [doc, page, annotation],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getPageTextRects}
   *
   * @public
   */
  getPageTextRects(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'getPageTextRects',
      doc,
      page,
      scaleFactor,
      rotation,
    );
    const requestId = this.generateRequestId(doc.id);
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.renderThumbnail}
   *
   * @public
   */
  renderThumbnail(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'renderThumbnail',
      doc,
      page,
      scaleFactor,
      rotation,
    );
    const requestId = this.generateRequestId(doc.id);
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.startSearch}
   *
   * @public
   */
  startSearch(
    doc: PdfDocumentObject,
    contextId: number,
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'startSearch', doc, contextId);
    const requestId = this.generateRequestId(doc.id);
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.searchNext}
   *
   * @public
   */
  searchNext(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget,
  ): Task<SearchResult | undefined, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'searchNext',
      doc,
      contextId,
      target,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<SearchResult | undefined>(
      this.worker,
      requestId,
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.searchPrev}
   *
   * @public
   */
  searchPrev(
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget,
  ): Task<SearchResult | undefined, PdfEngineError> {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'searchPrev',
      doc,
      contextId,
      target,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<SearchResult | undefined>(
      this.worker,
      requestId,
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.stopSearch}
   *
   * @public
   */
  stopSearch(
    doc: PdfDocumentObject,
    contextId: number,
  ): Task<boolean, PdfEngineError> {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'stopSearch', doc, contextId);
    const requestId = this.generateRequestId(doc.id);
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

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.saveAsCopy}
   *
   * @public
   */
  saveAsCopy(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'saveAsCopy', doc);
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<ArrayBuffer>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'saveAsCopy',
        args: [doc],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.getAttachments}
   *
   * @public
   */
  getAttachments(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'getAttachments', doc);
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<PdfAttachmentObject[]>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'getAttachments',
        args: [doc],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.readAttachmentContent}
   *
   * @public
   */
  readAttachmentContent(
    doc: PdfDocumentObject,
    attachment: PdfAttachmentObject,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'readAttachmentContent',
      doc,
      attachment,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<ArrayBuffer>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'readAttachmentContent',
        args: [doc, attachment],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.setFormFieldValue}
   *
   * @public
   */
  setFormFieldValue(
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfWidgetAnnoObject,
    value: FormFieldValue,
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'setFormFieldValue',
      doc,
      annotation,
      value,
    );
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'setFormFieldValue',
        args: [doc, page, annotation, value],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.extractPages}
   *
   * @public
   */
  extractPages(doc: PdfDocumentObject, pageIndexes: number[]) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'extractPages', doc);
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<ArrayBuffer>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'extractPages',
        args: [doc, pageIndexes],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.extractText}
   *
   * @public
   */
  extractText(doc: PdfDocumentObject, pageIndexes: number[]) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'extractText', doc);
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<string>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'extractText',
        args: [doc, pageIndexes],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.merge}
   *
   * @public
   */
  merge(files: PdfFile[]) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'merge', files);
    const fileIds = files.map((file) => file.id).join('.');
    const requestId = this.generateRequestId(fileIds);
    const task = new WorkerTask<PdfFile>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'merge',
        args: [files],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * {@inheritDoc @unionpdf/models!PdfEngine.closeDocument}
   *
   * @public
   */
  closeDocument(doc: PdfDocumentObject) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'closeDocument', doc);
    const requestId = this.generateRequestId(doc.id);
    const task = new WorkerTask<boolean>(this.worker, requestId);

    const request: ExecuteRequest = {
      id: requestId,
      type: 'ExecuteRequest',
      data: {
        name: 'closeDocument',
        args: [doc],
      },
    };
    this.proxy(task, request);

    return task;
  }

  /**
   * Send the request to webworker inside and register the task
   * @param task - task that waiting for the response
   * @param request - request that needs send to web worker
   * @param transferables - transferables that need to transfer to webworker
   * @returns
   *
   * @internal
   */
  proxy<R>(
    task: WorkerTask<R>,
    request: ExecuteRequest,
    transferables: any[] = [],
  ) {
    this.logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'send request to worker',
      task,
      request,
      transferables,
    );
    this.logger.perf(
      LOG_SOURCE,
      LOG_CATEGORY,
      `${request.data.name}`,
      'Begin',
      request.id,
    );
    this.readyTask.wait(
      () => {
        this.worker.postMessage(request, transferables);
        task.wait(
          () => {
            this.logger.perf(
              LOG_SOURCE,
              LOG_CATEGORY,
              `${request.data.name}`,
              'End',
              request.id,
            );
          },
          () => {
            this.logger.perf(
              LOG_SOURCE,
              LOG_CATEGORY,
              `${request.data.name}`,
              'End',
              request.id,
            );
          },
        );
        this.tasks.set(request.id, task);
      },
      () => {
        this.logger.perf(
          LOG_SOURCE,
          LOG_CATEGORY,
          `${request.data.name}`,
          'End',
          request.id,
        );
        task.reject(new PdfEngineError('worker initialization failed'));
      },
    );
  }
}
