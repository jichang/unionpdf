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

export interface PdfBookmarkObject {
  title: string;
  target:
    | {
        type: 'action';
        action: PdfActionObject;
      }
    | {
        type: 'destination';
        destination: PdfDestinationObject;
      };
  children?: PdfBookmarkObject[];
}

export interface PdfBookmarksObject {
  bookmarks: PdfBookmarkObject[];
}

export interface PdfAnnotationObjectBase {
  id: number;
  rect: Rect;
  popup?: {
    open: boolean;
    contents: string;
  };
}

export interface PdfLinkAnnoObject extends PdfAnnotationObjectBase {
  type: 'link';
  text: string;
  target:
    | {
        type: 'url';
        url: string;
      }
    | {
        type: 'page';
        pageIndex: number;
        rect?: Rect;
      };
}

export interface PdfTextAnnoObject extends PdfAnnotationObjectBase {
  type: 'text';
  text: string;
  color: string;
}

export interface PdfHighlightAnnoObject extends PdfAnnotationObjectBase {
  type: 'highlight';
}

export interface PdfStrikeOutAnnoObject extends PdfAnnotationObjectBase {
  type: 'strikeout';
}

export interface PdfUnderlineOutAnnoObject extends PdfAnnotationObjectBase {
  type: 'underline';
}

export interface PdfSquigglyAnnoObject extends PdfAnnotationObjectBase {
  type: 'squiggly';
}

export interface PdfSquareAnnoObject extends PdfAnnotationObjectBase {
  type: 'square';
}

export interface PdfCircleAnnoObject extends PdfAnnotationObjectBase {
  type: 'circle';
}

export interface PdfLineAnnoObject extends PdfAnnotationObjectBase {
  type: 'line';
}

export interface PdfPolylineAnnoObject extends PdfAnnotationObjectBase {
  type: 'polyline';
}

export interface PdfPolygonAnnoObject extends PdfAnnotationObjectBase {
  type: 'polygon';
}

export interface PdfInkAnnoObject extends PdfAnnotationObjectBase {
  type: 'ink';
}

export interface PdfStampAnnoObject extends PdfAnnotationObjectBase {
  type: 'stamp';
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
