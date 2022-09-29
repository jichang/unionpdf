
export interface Size {
    width: number;
    height: number;
}

export interface Region extends Size {
    x: number;
    y: number;
}

export interface PdfPageModel {
    index: number;
    size: {
        width: number;
        height: number;
    }
}

export interface PdfDocumentModel {
    pageCount: number;
    size: Size;
    pages: PdfPageModel[];
}

export interface PdfLinkModel {
    url: string;
    text: string;
    bound: Region;
}

export interface PdfOutlineItemModel {
    text: string;
    pageIndex: number;
    children?: PdfOutlineItemModel[];
}

export interface PdfOutlineModel {
    items: PdfOutlineItemModel[];
}

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
    open: (url: PdfSource, signal: AbortSignal) => PdfEngineFunResult<PdfDocumentModel>;
    getOutline: () => PdfEngineFunResult<PdfOutlineModel>;
    renderPage: (page: PdfPageModel, scale: number, rotation: Rotation, region?: Region) => PdfEngineFunResult<ImageData>;
    getPageLinks: (page: PdfPageModel) => PdfEngineFunResult<PdfLinkModel[]>;
    renderThumbnail: (page: PdfPageModel, scale: number, rotation: Rotation, region?: Region) => PdfEngineFunResult<ImageData>;
    close: (pdf: PdfDocumentModel) => Promise<void>;
}
