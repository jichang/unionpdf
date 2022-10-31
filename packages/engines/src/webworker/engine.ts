import {
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

  constructor(url: URL) {
    this.worker = new Worker(url);
    this.worker.addEventListener('message', this.handle);

    this.prepareTask = new WorkerTask<boolean, Error>(this.worker, '0');
    this.tasks.set('0', this.prepareTask);
  }

  handle = (evt: MessageEvent<any>) => {
    console.log('receive response: ', evt.data);
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
      console.log(e);
    }
  };

  generateRequestId() {
    return `${Date.now()}.${Math.random()}`;
  }

  initialize() {
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
    this.prepareTask.wait(
      () => {
        console.log('send request: ', request);
        this.worker.postMessage(request, transferables);
        this.tasks.set(request.id, task);
      },
      () => {
        task.reject(new Error('worker initialization failed'));
      }
    );
  }
}
