import { Size, Rect } from './geometry';

export interface PdfPageObject {
  index: number;
  size: Size;
}

export interface PdfDocumentObject {
  id: string;
  pageCount: number;
  pages: PdfPageObject[];
}

export interface PdfMetadataObject {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  producer: string;
  creator: string;
  creationDate: string;
  modificationDate: string;
}

export enum PdfZoomMode {
  Unknown = 0,
  XYZ = 1, // Zoom level with specified offset.
  FitPage = 2, // Fit both the width and height of the page (whichever smaller).
  FitHorizontal = 3, // Fit the page width.
  FitVertical = 4, // Fit the page height.
  FitRectangle = 5, // Fit a specific rectangle area within the window.
}

export interface PdfDestinationObject {
  pageIndex: number;
  zoom:
    | {
        mode: PdfZoomMode.Unknown;
      }
    | { mode: PdfZoomMode.XYZ; params: { x: number; y: number; zoom: number } }
    | {
        mode: PdfZoomMode.FitPage;
      }
    | {
        mode: PdfZoomMode.FitHorizontal;
      }
    | {
        mode: PdfZoomMode.FitVertical;
      }
    | {
        mode: PdfZoomMode.FitRectangle;
      };
  view: number[];
}

export enum PdfActionType {
  Unsupported = 0,
  Goto = 1,
  RemoteGoto = 2,
  URI = 3,
  LaunchAppOrOpenFile = 4,
}

export type PdfActionObject =
  | {
      type: PdfActionType.Unsupported;
    }
  | {
      type: PdfActionType.Goto;
      destination: PdfDestinationObject;
    }
  | {
      type: PdfActionType.RemoteGoto;
      destination: PdfDestinationObject;
    }
  | {
      type: PdfActionType.URI;
      uri: string;
    }
  | {
      type: PdfActionType.LaunchAppOrOpenFile;
      path: string;
    };

export type PdfLinkTarget =
  | {
      type: 'action';
      action: PdfActionObject;
    }
  | {
      type: 'destination';
      destination: PdfDestinationObject;
    };

export interface PdfBookmarkObject {
  title: string;
  target?: PdfLinkTarget | undefined;
  children?: PdfBookmarkObject[];
}

export interface PdfSignatureObject {
  contents: ArrayBuffer;
  byteRange: ArrayBuffer;
  subFilter: ArrayBuffer;
  reason: string;
  time: string;
  docMDP: number;
}

export interface PdfBookmarksObject {
  bookmarks: PdfBookmarkObject[];
}

export interface PdfTextRectObject {
  font: {
    size: number;
  };
  content: string;
  rect: Rect;
}

export enum PdfAnnotationSubtype {
  UNKNOWN = 0,
  TEXT,
  LINK,
  FREETEXT,
  LINE,
  SQUARE,
  CIRCLE,
  POLYGON,
  POLYLINE,
  HIGHLIGHT,
  UNDERLINE,
  SQUIGGLY,
  STRIKEOUT,
  STAMP,
  CARET,
  INK,
  POPUP,
  FILEATTACHMENT,
  SOUND,
  MOVIE,
  WIDGET,
  SCREEN,
  PRINTERMARK,
  TRAPNET,
  WATERMARK,
  THREED,
  RICHMEDIA,
  XFAWIDGET,
  REDACT,
}

export interface PdfPopupAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.POPUP;
  rect: Rect;
  contents: string;
  open: boolean;
}

export interface PdfAnnotationObjectBase {
  id: number;
  type: PdfAnnotationSubtype;
  rect: Rect;
  popup?: PdfPopupAnnoObject | undefined;
}

export interface PdfLinkAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.LINK;
  text: string;
  target: PdfLinkTarget | undefined;
}

export interface PdfTextAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.TEXT;
  contents: string;
  color: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
}

export enum PDF_FORM_FIELD_TYPE {
  UNKNOWN = 0, // Unknown.
  PUSHBUTTON = 1, // push button type.
  CHECKBOX = 2, // check box type.
  RADIOBUTTON = 3, // radio button type.
  COMBOBOX = 4, // combo box type.
  LISTBOX = 5, // list box type.
  TEXTFIELD = 6, // text field type.
  SIGNATURE = 7, // text field type.
  XFA = 8, // Generic XFA type.
  XFA_CHECKBOX = 9, // XFA check box type.
  XFA_COMBOBOX = 10, // XFA combo box type.
  XFA_IMAGEFIELD = 11, // XFA image field type.
  XFA_LISTBOX = 12, // XFA list box type.
  XFA_PUSHBUTTON = 13, // XFA push button type.
  XFA_SIGNATURE = 14, // XFA signture field type.
  XFA_TEXTFIELD = 15, // XFA text field type.
}

export enum PDF_FORM_FIELD_FLAG {
  NONE = 0,
  READONLY = 1 << 0,
  REQUIRED = 1 << 1,
  NOEXPORT = 1 << 2,
  TEXT_MULTIPLINE = 1 << 12,
  TEXT_PASSWORD = 1 << 13,
  CHOICE_COMBO = 1 << 17,
  CHOICE_EDIT = 1 << 18,
  CHOICE_MULTL_SELECT = 1 << 21,
}

export interface PdfWidgetAnnoOption {
  label: string;
  isSelected: boolean;
}

export interface PdfWidgetAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.WIDGET;
  field: {
    flag: PDF_FORM_FIELD_FLAG;
    name: string;
    alternateName: string;
    type: PDF_FORM_FIELD_TYPE;
    value: string;
    isChecked: boolean;
    options: PdfWidgetAnnoOption[];
  };
}

export interface PdfFileAttachmentAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.FILEATTACHMENT;
}

export interface PdfUnsupportedAnnoObject extends PdfAnnotationObjectBase {
  type: Exclude<
    PdfAnnotationSubtype,
    | PdfAnnotationSubtype.TEXT
    | PdfAnnotationSubtype.LINK
    | PdfAnnotationSubtype.WIDGET
    | PdfAnnotationSubtype.FILEATTACHMENT
  >;
}

export type PdfAnnotationObject =
  | PdfTextAnnoObject
  | PdfLinkAnnoObject
  | PdfWidgetAnnoObject
  | PdfFileAttachmentAnnoObject
  | PdfUnsupportedAnnoObject;

export interface PdfAttachmentObject {
  index: number;
  name: string;
  creationDate: string;
  checksum: string;
}

/*
 * Clockwise direction
 *
 * 0 - 0deg
 * 1 - 90deg
 * 2 - 180deg
 * 3 - 270deg
 */
export type Rotation = 0 | 1 | 2 | 3;

// source can be a URL points to a remote pdf file or array contains
// pdf content
export type PdfSource = ArrayBuffer;

export enum PdfEngineFeature {
  RenderPage,
  RenderPageRect,
  Thumbnails,
  Bookmarks,
  Annotations,
}

export enum PdfEngineOperation {
  Create,
  Read,
  Update,
  Delete,
}

export enum MatchFlag {
  None = 0,
  MatchCase = 1,
  MatchWholeWord = 2,
  MatchConsecutive = 4,
}

export function unionFlags(flags: MatchFlag[]) {
  return flags.reduce((flag, currFlag) => {
    return flag | currFlag;
  }, MatchFlag.None);
}

export interface SearchTarget {
  keyword: string;
  flags: MatchFlag[];
}

export function compareSearchTarge(
  targetA: SearchTarget,
  targetB: SearchTarget
) {
  const flagA = unionFlags(targetA.flags);
  const flagB = unionFlags(targetB.flags);

  return flagA === flagB && targetA.keyword === targetB.keyword;
}

export interface SearchResult {
  pageIndex: number;
  charIndex: number;
  charCount: number;
}

export enum TaskStage {
  Pending = 0,
  Resolved = 1,
  Rejected = 2,
  Aborted = 3,
}

export type ResolvedCallback<R> = (r: R) => void;
export type RejectedCallback<E> = (e: E | TaskAbortError) => void;

export class TaskAbortError extends Error {}

export type TaskState<R, E> =
  | {
      stage: TaskStage.Pending;
    }
  | {
      stage: TaskStage.Resolved;
      result: R;
    }
  | {
      stage: TaskStage.Rejected;
      error: E;
    }
  | {
      stage: TaskStage.Aborted;
      error: TaskAbortError | E;
    };

export interface Task<R, E = Error> {
  state: TaskState<R, E>;

  wait: (
    doneCallback: ResolvedCallback<R>,
    failedCallback: RejectedCallback<E>
  ) => void;
  resolve: (r: R) => void;
  reject: (e: E) => void;
  abort: (error?: E | TaskAbortError) => void;
}

export class TaskBase<R, E = Error> implements Task<R, E> {
  state: TaskState<R, E> = {
    stage: TaskStage.Pending,
  };
  resolvedCallbacks: ResolvedCallback<R>[] = [];
  rejectedCallbacks: RejectedCallback<E>[] = [];

  static resolve<R, E = Error>(result: R): TaskBase<R, E> {
    const task = new TaskBase<R, E>();
    task.resolve(result);

    return task;
  }

  static reject<R, E = Error>(error: E): TaskBase<R, E> {
    const task = new TaskBase<R, E>();
    task.reject(error);

    return task;
  }

  wait(
    resolvedCallback: ResolvedCallback<R>,
    rejectedCallback: RejectedCallback<E>
  ) {
    switch (this.state.stage) {
      case TaskStage.Pending:
        this.resolvedCallbacks.push(resolvedCallback);
        this.rejectedCallbacks.push(rejectedCallback);
        break;
      case TaskStage.Resolved:
        resolvedCallback(this.state.result);
        break;
      case TaskStage.Rejected:
        rejectedCallback(this.state.error);
        break;
      case TaskStage.Aborted:
        rejectedCallback(this.state.error);
        break;
    }
  }

  resolve(result: R) {
    if (this.state.stage === TaskStage.Pending) {
      this.state = {
        stage: TaskStage.Resolved,
        result,
      };
      for (const resolvedCallback of this.resolvedCallbacks) {
        try {
          resolvedCallback(result);
        } catch (e) {}
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }

  reject(error: E) {
    if (this.state.stage === TaskStage.Pending) {
      this.state = {
        stage: TaskStage.Rejected,
        error,
      };
      for (const rejectedCallback of this.rejectedCallbacks) {
        try {
          rejectedCallback(error);
        } catch (e) {}
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }

  abort(error?: E | TaskAbortError) {
    if (this.state.stage === TaskStage.Pending) {
      this.state = {
        stage: TaskStage.Aborted,
        error: error || new TaskAbortError(),
      };
      for (const rejectedCallback of this.rejectedCallbacks) {
        try {
          rejectedCallback(this.state.error);
        } catch (e) {}
      }
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
    }
  }
}

export class PdfEngineError extends Error {
  code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
  }
}

export interface PdfEngine {
  isSupport?: (
    feature: PdfEngineFeature
  ) => Task<PdfEngineOperation[], PdfEngineError>;
  initialize?: () => Task<boolean, PdfEngineError>;
  destroy?: () => Task<boolean, PdfEngineError>;
  openDocument: (
    id: string,
    data: PdfSource,
    password: string
  ) => Task<PdfDocumentObject, PdfEngineError>;
  getMetadata: (
    doc: PdfDocumentObject
  ) => Task<PdfMetadataObject, PdfEngineError>;
  getSignatures: (
    doc: PdfDocumentObject
  ) => Task<PdfSignatureObject[], PdfEngineError>;
  getBookmarks: (
    doc: PdfDocumentObject
  ) => Task<PdfBookmarksObject, PdfEngineError>;
  renderPage: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) => Task<ImageData, PdfEngineError>;
  renderPageRect?: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    rect: Rect
  ) => Task<ImageData, PdfEngineError>;
  getPageAnnotations: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) => Task<PdfAnnotationObject[], PdfEngineError>;
  getPageTextRects: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) => Task<PdfTextRectObject[], PdfEngineError>;
  renderThumbnail: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation
  ) => Task<ImageData, PdfEngineError>;
  startSearch: (
    doc: PdfDocumentObject,
    contextId: number
  ) => Task<boolean, PdfEngineError>;
  searchNext: (
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget
  ) => Task<SearchResult | undefined, PdfEngineError>;
  searchPrev: (
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget
  ) => Task<SearchResult | undefined, PdfEngineError>;
  stopSearch: (
    doc: PdfDocumentObject,
    contextId: number
  ) => Task<boolean, PdfEngineError>;
  getAttachments: (
    doc: PdfDocumentObject
  ) => Task<PdfAttachmentObject[], PdfEngineError>;
  readAttachmentContent: (
    doc: PdfDocumentObject,
    attachment: PdfAttachmentObject
  ) => Task<ArrayBuffer, PdfEngineError>;
  saveAsCopy: (doc: PdfDocumentObject) => Task<ArrayBuffer, PdfEngineError>;
  closeDocument: (doc: PdfDocumentObject) => Task<boolean, PdfEngineError>;
}
