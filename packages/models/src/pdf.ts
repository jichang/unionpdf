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

export enum PdfZoomMode {
  XYZ = 1, // Zoom level with specified offset.
  FitPage = 2, // Fit both the width and height of the page (whichever smaller).
  FitHorizontal = 3, // Fit the page width.
  FitVertical = 4, // Fit the page height.
  FitRectangle = 5, // Fit a specific rectangle area within the window.
}

export interface PdfDestinationObject {
  pageIndex: number;
  zoom: {
    mode: PdfZoomMode;
    params: number[];
  };
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

export type PdfTarget =
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
  target?: PdfTarget | undefined;
  children?: PdfBookmarkObject[];
}

export interface PdfBookmarksObject {
  bookmarks: PdfBookmarkObject[];
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

export interface PdfAnnotationObjectBase {
  id: number;
  type: PdfAnnotationSubtype;
  rect: Rect;
  popup?: {
    open: boolean;
    contents: string;
  };
}

export interface PdfLinkAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.LINK;
  text: string;
  target: PdfTarget | undefined;
}

export interface PdfTextAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.TEXT;
  text: string;
  color: string;
}

export interface PdfHighlightAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.HIGHLIGHT;
}

export interface PdfStrikeOutAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.STRIKEOUT;
}

export interface PdfUnderlineOutAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.UNDERLINE;
}

export interface PdfSquigglyAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.SQUIGGLY;
}

export interface PdfSquareAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.SQUARE;
}

export interface PdfCircleAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.CIRCLE;
}

export interface PdfLineAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.LINE;
}

export interface PdfPolylineAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.POLYLINE;
}

export interface PdfPolygonAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.POLYGON;
}

export interface PdfInkAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.INK;
}

export interface PdfStampAnnoObject extends PdfAnnotationObjectBase {
  type: PdfAnnotationSubtype.STAMP;
}

export type PdfAnnotationObject =
  | PdfTextAnnoObject
  | PdfLinkAnnoObject
  | PdfHighlightAnnoObject
  | PdfStrikeOutAnnoObject
  | PdfUnderlineOutAnnoObject
  | PdfSquigglyAnnoObject
  | PdfSquareAnnoObject
  | PdfCircleAnnoObject
  | PdfLineAnnoObject
  | PdfPolylineAnnoObject
  | PdfPolygonAnnoObject
  | PdfInkAnnoObject
  | PdfStampAnnoObject;

export class PdfError extends Error {
  constructor(public reason: any) {
    super();
  }
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

export type PdfEngineFunResult<T> = T | Promise<T>;

export enum PdfEngineFeature {
  Pages,
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

export interface PdfEngine {
  isSupport?: (
    feature: PdfEngineFeature
  ) => PdfEngineFunResult<PdfEngineOperation[]>;
  openDocument: (
    data: PdfSource,
    signal?: AbortSignal
  ) => PdfEngineFunResult<PdfDocumentObject>;
  getBookmarks: (
    doc: PdfDocumentObject,
    signal?: AbortSignal
  ) => PdfEngineFunResult<PdfBookmarksObject>;
  renderPage: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    rect?: Rect,
    signal?: AbortSignal
  ) => PdfEngineFunResult<ImageData>;
  getPageAnnotations: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    signal?: AbortSignal
  ) => PdfEngineFunResult<PdfAnnotationObject[]>;
  renderThumbnail: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    signal?: AbortSignal
  ) => PdfEngineFunResult<ImageData>;
  closeDocument: (
    pdf: PdfDocumentObject,
    signal?: AbortSignal
  ) => PdfEngineFunResult<void>;
}
