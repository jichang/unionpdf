
export interface Size {
    width: number;
    height: number;
}

export interface Rect extends Size {
    x: number;
    y: number;
}

export interface PdfPageObject {
    index: number;
    size: {
        width: number;
        height: number;
    }
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

export interface PdfLinkAnnoObject  {
  type: "link";
  url: string;
  text: string;
  rect: Rect;
}

export interface PdfTextAnnoObject {
    type: "text";
    content: string;
    color: string;
    rect: Rect;
}

export type PdfAnnotationObject = PdfLinkAnnoObject | PdfTextAnnoObject;

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

export interface PdfEngine {
    open: (url: PdfSource, signal: AbortSignal) => PdfEngineFunResult<PdfDocumentObject>;
    getOutlines: () => PdfEngineFunResult<PdfOutlinesObject>;
    renderPage: (page: PdfPageObject, scale: number, rotation: Rotation, region?: Rect) => PdfEngineFunResult<ImageData>;
    getPageAnnotations: (page: PdfPageObject) => PdfEngineFunResult<PdfAnnotationObject[]>;
    renderThumbnail: (page: PdfPageObject, scale: number, rotation: Rotation, region?: Rect) => PdfEngineFunResult<ImageData>;
    close: (pdf: PdfDocumentObject) => Promise<void>;
}
