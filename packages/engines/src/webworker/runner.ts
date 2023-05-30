import {
  Logger,
  NoopLogger,
  PdfEngine,
  PdfEngineError,
  Task,
} from '@unionpdf/models';

export type PdfEngineMethodName = keyof Required<PdfEngine>;
export type PdfEngineMethodArgs<P extends PdfEngineMethodName> = Readonly<
  Parameters<Required<PdfEngine>[P]>
>;
export type PdfEngineMethodReturnType<P extends PdfEngineMethodName> = Readonly<
  ReturnType<Required<PdfEngine>[P]>
>;
export type TaskResolveValueType<T> = T extends Task<infer R, infer U>
  ? R
  : never;
export type TaskRejectErrorType<T> = T extends Task<infer R, infer U>
  ? U
  : never;

export type PdfEngineMethodRequestBody = {
  [P in PdfEngineMethodName]: {
    name: P;
    args: PdfEngineMethodArgs<P>;
  };
}[PdfEngineMethodName];

export type TaskResultType<T> = T extends Task<infer R, infer E>
  ? { type: 'resolve'; result: R } | { type: 'reject'; error: E }
  : never;

export type PdfEngineMethodResponseBody = {
  [P in PdfEngineMethodName]: TaskResultType<PdfEngineMethodReturnType<P>>;
}[PdfEngineMethodName];

export interface AbortRequest {
  id: string;
  type: 'AbortRequest';
}

export interface ExecuteRequest {
  id: string;
  type: 'ExecuteRequest';
  data: PdfEngineMethodRequestBody;
}

export interface ExecuteResponse {
  id: string;
  type: 'ExecuteResponse';
  data: PdfEngineMethodResponseBody;
}

export interface ReadyResponse {
  id: string;
  type: 'ReadyResponse';
}

export type Request = ExecuteRequest | AbortRequest;

export type Response = ExecuteResponse | ReadyResponse;

const LOG_SOURCE = 'WebWorkerEngineRunner';
const LOG_CATEGORY = 'Engine';

export class EngineRunner {
  engine: PdfEngine | undefined;

  constructor(public logger: Logger = new NoopLogger()) {}

  ready() {
    this.respond({
      id: '0',
      type: 'ReadyResponse',
    });
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'runner is ready');
  }

  execute = (request: ExecuteRequest) => {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'runner start exeucte request');
    if (!this.engine) {
      const response: ExecuteResponse = {
        id: request.id,
        type: 'ExecuteResponse',
        data: {
          type: 'reject',
          error: new PdfEngineError('engine has not started yet'),
        },
      };
      this.respond(response);
      return;
    }

    const engine = this.engine;
    const { name, args } = request.data;
    if (!engine[name]) {
      const response: ExecuteResponse = {
        id: request.id,
        type: 'ExecuteResponse',
        data: {
          type: 'reject',
          error: new PdfEngineError('engine method has not supported yet'),
        },
      };
      this.respond(response);
      return;
    }

    let task: PdfEngineMethodReturnType<typeof name>;
    switch (name) {
      case 'isSupport':
        task = this.engine[name]!(...args);
        break;
      case 'initialize':
        task = this.engine[name]!(...args);
        break;
      case 'destroy':
        task = this.engine[name]!(...args);
        break;
      case 'openDocument':
        task = this.engine[name]!(...args);
        break;
      case 'getMetadata':
        task = this.engine[name]!(...args);
        break;
      case 'getBookmarks':
        task = this.engine[name]!(...args);
        break;
      case 'getSignatures':
        task = this.engine[name]!(...args);
        break;
      case 'renderPage':
        task = this.engine[name]!(...args);
        break;
      case 'renderPageRect':
        task = this.engine[name]!(...args);
        break;
      case 'renderThumbnail':
        task = this.engine[name]!(...args);
        break;
      case 'getPageAnnotations':
        task = this.engine[name]!(...args);
        break;
      case 'createPageAnnotation':
        task = this.engine[name]!(...args);
        break;
      case 'transformPageAnnotation':
        task = this.engine[name]!(...args);
        break;
      case 'removePageAnnotation':
        task = this.engine[name]!(...args);
        break;
      case 'getPageTextRects':
        task = this.engine[name]!(...args);
        break;
      case 'startSearch':
        task = this.engine[name]!(...args);
        break;
      case 'searchNext':
        task = this.engine[name]!(...args);
        break;
      case 'searchPrev':
        task = this.engine[name]!(...args);
        break;
      case 'stopSearch':
        task = this.engine[name]!(...args);
        break;
      case 'closeDocument':
        task = this.engine[name]!(...args);
        break;
      case 'saveAsCopy':
        task = this.engine[name]!(...args);
        break;
      case 'getAttachments':
        task = this.engine[name]!(...args);
        break;
      case 'readAttachmentContent':
        task = this.engine[name]!(...args);
        break;
      case 'extractPages':
        task = this.engine[name]!(...args);
        break;
      case 'extractText':
        task = this.engine[name]!(...args);
        break;
      case 'merge':
        task = this.engine[name]!(...args);
        break;
    }

    task.wait(
      (result) => {
        const response: ExecuteResponse = {
          id: request.id,
          type: 'ExecuteResponse',
          data: {
            type: 'resolve',
            result,
          },
        };
        this.respond(response);
      },
      (error) => {
        const response: ExecuteResponse = {
          id: request.id,
          type: 'ExecuteResponse',
          data: {
            type: 'reject',
            error,
          },
        };
        this.respond(response);
      }
    );
  };

  respond(response: Response) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'runner respond: ', response);
    self.postMessage(response);
  }
}

export function handler(
  runner: EngineRunner,
  logger: Logger = new NoopLogger()
) {
  return (evt: MessageEvent<Request>) => {
    logger.debug(
      LOG_SOURCE,
      LOG_CATEGORY,
      'webworker receive message event: ',
      evt.data
    );
    try {
      const request = evt.data as Request;
      switch (request.type) {
        case 'ExecuteRequest':
          runner.execute(request);
          break;
      }
    } catch (e) {
      logger.info(
        LOG_SOURCE,
        LOG_CATEGORY,
        'webworker met error when processing message event:',
        e
      );
    }
  };
}
