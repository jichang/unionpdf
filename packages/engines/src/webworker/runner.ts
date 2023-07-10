import {
  Logger,
  NoopLogger,
  PdfEngine,
  PdfEngineError,
  Task,
} from '@unionpdf/models';

/**
 * Method name of PdfEngine interface
 *
 * @public
 */
export type PdfEngineMethodName = keyof Required<PdfEngine>;
/**
 * Arguments of PdfEngine method
 *
 * @public
 */
export type PdfEngineMethodArgs<P extends PdfEngineMethodName> = Readonly<
  Parameters<Required<PdfEngine>[P]>
>;
/**
 * Return type of PdfEngine method
 *
 * @public
 */
export type PdfEngineMethodReturnType<P extends PdfEngineMethodName> = Readonly<
  ReturnType<Required<PdfEngine>[P]>
>;
/**
 * Type of task resolved value
 *
 * @public
 */
export type TaskResolveValueType<T> = T extends Task<infer R, infer U>
  ? R
  : never;
/**
 * Type of task rejected error
 *
 * @public
 */
export type TaskRejectErrorType<T> = T extends Task<infer R, infer U>
  ? U
  : never;

/**
 * Request body that represent method calls of PdfEngine, it contains the
 * method name and arguments
 */
export type PdfEngineMethodRequestBody = {
  [P in PdfEngineMethodName]: {
    name: P;
    args: PdfEngineMethodArgs<P>;
  };
}[PdfEngineMethodName];

/**
 * Type that represent the result of executing task
 */
export type TaskResultType<T extends Task<any, any>> = T extends Task<
  infer R,
  infer E
>
  ? { type: 'resolve'; result: R } | { type: 'reject'; error: E }
  : never;
/**
 * Response body that represent return value of PdfEngine
 */
export type PdfEngineMethodResponseBody = {
  [P in PdfEngineMethodName]: TaskResultType<PdfEngineMethodReturnType<P>>;
}[PdfEngineMethodName];

/**
 * Request that abort the specified task
 */
export interface AbortRequest {
  /**
   * message id
   */
  id: string;
  /**
   * request type
   */
  type: 'AbortRequest';
}
/**
 * Request that execute pdf engine method
 */
export interface ExecuteRequest {
  /**
   * message id
   */
  id: string;
  /**
   * request type
   */
  type: 'ExecuteRequest';
  /**
   * request body
   */
  data: PdfEngineMethodRequestBody;
}
/**
 * Response that execute pdf engine method
 */
export interface ExecuteResponse {
  /**
   * message id
   */
  id: string;
  /**
   * response type
   */
  type: 'ExecuteResponse';
  /**
   * response body
   */
  data: PdfEngineMethodResponseBody;
}

/**
 * Response that indicate engine is ready
 */
export interface ReadyResponse {
  /**
   * message id
   */
  id: string;
  /**
   * response type
   */
  type: 'ReadyResponse';
}

/**
 * Request type
 */
export type Request = ExecuteRequest | AbortRequest;
/**
 * Response type
 */
export type Response = ExecuteResponse | ReadyResponse;

const LOG_SOURCE = 'WebWorkerEngineRunner';
const LOG_CATEGORY = 'Engine';

/**
 * Pdf engine runner, it will execute pdf engine based on the request it received and
 * send back the response with post message
 */
export class EngineRunner {
  engine: PdfEngine | undefined;

  /**
   * Create instance of EngineRunnder
   * @param logger - logger instance
   */
  constructor(public logger: Logger = new NoopLogger()) {}

  /**
   * Send the ready response when pdf engine is ready
   * @returns
   *
   * @protected
   */
  ready() {
    this.respond({
      id: '0',
      type: 'ReadyResponse',
    });
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'runner is ready');
  }

  /**
   * Execute the request
   * @param request - request that represent the pdf engine call
   * @returns
   *
   * @protected
   */
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

  /**
   * Send back the response
   * @param response - response that needs sent back
   *
   * @protected
   */
  respond(response: Response) {
    this.logger.debug(LOG_SOURCE, LOG_CATEGORY, 'runner respond: ', response);
    self.postMessage(response);
  }
}

/**
 * Create a handler of webworker post message
 * @param runner - engine runner that will handle the message by calling pdf engine
 * @param logger - logger instance
 * @returns
 *
 * @public
 */
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
