import { Size, Rect } from './geometry';

export interface PdfPageObject {
  index: number;
  size: Size;
}

export interface PdfDocumentObject {
  pageCount: number;
  size: Size;
  pages: PdfPageObject[];
}

export interface PdfOutlineEntryObject {
  text: string;
  pageIndex: number;
  children?: PdfOutlineEntryObject[];
}

export interface PdfOutlinesObject {
  entries: PdfOutlineEntryObject[];
}

export interface PdfAnnotationObjectBase {
  rect: Rect;
}

export interface PdfLinkAnnoObject extends PdfAnnotationObjectBase {
  type: 'link';
  text: string;
  target:
  | {
    url: string;
  }
  | {
    rect: Rect;
  };
}

export interface PdfTextAnnoObject extends PdfAnnotationObjectBase {
  type: 'text';
  text: string;
  color: string;
}

export type PdfAnnotationObject = PdfTextAnnoObject | PdfLinkAnnoObject;

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
export type PdfSource = string | Uint8Array;

export type PdfEngineFunResult<T> = T | Promise<T>;

export enum PdfEngineFeature {
  Pages,
  Thumbnails,
  Outlines,
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
  open: (
    url: PdfSource,
    signal?: AbortSignal
  ) => PdfEngineFunResult<PdfDocumentObject>;
  getOutlines: (signal: AbortSignal) => PdfEngineFunResult<PdfOutlinesObject>;
  renderPage: (
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    rect?: Rect,
    signal?: AbortSignal
  ) => PdfEngineFunResult<ImageData>;
  getPageAnnotations: (
    page: PdfPageObject,
    signal?: AbortSignal
  ) => PdfEngineFunResult<PdfAnnotationObject[]>;
  renderThumbnail: (
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    signal?: AbortSignal
  ) => PdfEngineFunResult<ImageData>;
  close: (pdf: PdfDocumentObject, signal?: AbortSignal) => Promise<void>;
}
