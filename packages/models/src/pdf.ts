import { Size, Rect, Position, Rotation } from './geometry';
import { Task, TaskError } from './task';

/**
 * Representation of pdf page
 *
 * @public
 */
export interface PdfPageObject {
  /**
   * Index of this page, starts from 0
   */
  index: number;

  /**
   * Orignal size of this page
   */
  size: Size;
}

/**
 * Representation of pdf document
 *
 * @public
 */
export interface PdfDocumentObject {
  /**
   * Identity of document
   */
  id: string;

  /**
   * name of document
   */
  name: string;

  /**
   * Count of pages in this document
   */
  pageCount: number;

  /**
   * Pages in this document
   */
  pages: PdfPageObject[];
}

/**
 * metadata of pdf document
 *
 * @public
 */
export interface PdfMetadataObject {
  /**
   * title of the document
   */
  title: string;
  /**
   * author of the document
   */
  author: string;
  /**
   * subject of the document
   */
  subject: string;
  /**
   * keywords of the document
   */
  keywords: string;
  /**
   * producer of the document
   */
  producer: string;
  /**
   * creator of the document
   */
  creator: string;
  /**
   * creation date of the document
   */
  creationDate: string;
  /**
   * modification date of the document
   */
  modificationDate: string;
}

/**
 * zoom mode
 *
 * @public
 */
export enum PdfZoomMode {
  Unknown = 0,
  /**
   * Zoom level with specified offset.
   */
  XYZ = 1,
  /**
   * Fit both the width and height of the page (whichever smaller).
   */
  FitPage = 2,
  /**
   * Fit the page width.
   */
  FitHorizontal = 3,
  /**
   * Fit the page height.
   */
  FitVertical = 4,
  /**
   * Fit a specific rectangle area within the window.
   */
  FitRectangle = 5,
}

/**
 * Representation of the linked destination
 *
 * @public
 */
export interface PdfDestinationObject {
  /**
   * Index of target page
   */
  pageIndex: number;
  /**
   * zoom config for target destination
   */
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

/**
 * Type of pdf action
 *
 * @public
 */
export enum PdfActionType {
  Unsupported = 0,
  /**
   * Goto specified position in this document
   */
  Goto = 1,
  /**
   * Goto specified position in another document
   */
  RemoteGoto = 2,
  /**
   * Goto specified URI
   */
  URI = 3,
  /**
   * Launch specifed application
   */
  LaunchAppOrOpenFile = 4,
}

/**
 * Representation of pdf action
 *
 * @public
 */
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

/**
 * target of pdf link
 *
 * @public
 */
export type PdfLinkTarget =
  | {
      type: 'action';
      action: PdfActionObject;
    }
  | {
      type: 'destination';
      destination: PdfDestinationObject;
    };

/**
 * PDF bookmark
 *
 * @public
 */
export interface PdfBookmarkObject {
  /**
   * title of bookmark
   */
  title: string;

  /**
   * target of bookmark
   */
  target?: PdfLinkTarget | undefined;

  /**
   * bookmarks in the next level
   */
  children?: PdfBookmarkObject[];
}

/**
 * Pdf Signature
 *
 * @public
 */
export interface PdfSignatureObject {
  /**
   * contents of signature
   */
  contents: ArrayBuffer;

  /**
   * byte range of signature
   */
  byteRange: ArrayBuffer;

  /**
   * sub filters of signature
   */
  subFilter: ArrayBuffer;

  /**
   * reason of signature
   */
  reason: string;

  /**
   * creation time of signature
   */
  time: string;

  /**
   * MDP
   */
  docMDP: number;
}

/**
 * Bookmark tree of pdf
 *
 * @public
 */
export interface PdfBookmarksObject {
  bookmarks: PdfBookmarkObject[];
}

/**
 * Text rectangle in pdf page
 *
 * @public
 */
export interface PdfTextRectObject {
  /**
   * Font of the text
   */
  font: {
    /**
     * font family
     */
    family: string;

    /**
     * font size
     */
    size: number;
  };

  /**
   * content in this rectangle area
   */
  content: string;

  /**
   * rectangle of the text
   */
  rect: Rect;
}

/**
 * Annotation type
 *
 * @public
 */
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

/**
 * Name of annotation type
 *
 * @public
 */
export const PdfAnnotationSubtypeName: Record<PdfAnnotationSubtype, string> = {
  [PdfAnnotationSubtype.UNKNOWN]: 'unknow',
  [PdfAnnotationSubtype.TEXT]: 'text',
  [PdfAnnotationSubtype.LINK]: 'link',
  [PdfAnnotationSubtype.FREETEXT]: 'freetext',
  [PdfAnnotationSubtype.LINE]: 'line',
  [PdfAnnotationSubtype.SQUARE]: 'square',
  [PdfAnnotationSubtype.CIRCLE]: 'circle',
  [PdfAnnotationSubtype.POLYGON]: 'polygon',
  [PdfAnnotationSubtype.POLYLINE]: 'polyline',
  [PdfAnnotationSubtype.HIGHLIGHT]: 'highlight',
  [PdfAnnotationSubtype.UNDERLINE]: 'underline',
  [PdfAnnotationSubtype.SQUIGGLY]: 'squiggly',
  [PdfAnnotationSubtype.STRIKEOUT]: 'strikeout',
  [PdfAnnotationSubtype.STAMP]: 'stamp',
  [PdfAnnotationSubtype.CARET]: 'caret',
  [PdfAnnotationSubtype.INK]: 'ink',
  [PdfAnnotationSubtype.POPUP]: 'popup',
  [PdfAnnotationSubtype.FILEATTACHMENT]: 'fileattachment',
  [PdfAnnotationSubtype.SOUND]: 'sound',
  [PdfAnnotationSubtype.MOVIE]: 'movie',
  [PdfAnnotationSubtype.WIDGET]: 'widget',
  [PdfAnnotationSubtype.SCREEN]: 'screen',
  [PdfAnnotationSubtype.PRINTERMARK]: 'printermark',
  [PdfAnnotationSubtype.TRAPNET]: 'trapnet',
  [PdfAnnotationSubtype.WATERMARK]: 'watermark',
  [PdfAnnotationSubtype.THREED]: 'threed',
  [PdfAnnotationSubtype.RICHMEDIA]: 'richmedia',
  [PdfAnnotationSubtype.XFAWIDGET]: 'xfawidget',
  [PdfAnnotationSubtype.REDACT]: 'redact',
};

/**
 * Status of pdf annotation
 *
 * @public
 */
export enum PdfAnnotationObjectStatus {
  /**
   * Annotation is created
   */
  Created,
  /**
   * Annotation is committed to PDF file
   */
  Committed,
}

/**
 * Appearance mode
 *
 * @public
 */
export enum AppearanceMode {
  Normal = 0,
  Rollover = 1,
  Down = 2,
}

/**
 * Basic information of pdf annotation
 *
 * @public
 */
export interface PdfAnnotationObjectBase {
  /**
   * Sub type of annotation
   */
  type: PdfAnnotationSubtype;

  /**
   * Status of pdf annotation
   */
  status: PdfAnnotationObjectStatus;

  /**
   * The index of page that this annotation belong to
   */
  pageIndex: number;

  /**
   * id of the annotation
   */
  id: number;

  /**
   * Rectangle of the annotation
   */
  rect: Rect;

  /**
   * Related popup annotation
   */
  popup?: PdfPopupAnnoObject | undefined;

  /**
   * Appearences of annotation
   */
  appearances: {
    normal: string;
    rollover: string;
    down: string;
  };
}

/**
 * Popup annotation
 *
 * @public
 */
export interface PdfPopupAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.POPUP;
  /**
   * Contents of the popup
   */
  contents: string;

  /**
   * Whether the popup is opened or not
   */
  open: boolean;
}

/**
 * Pdf Link annotation
 *
 * @public
 */
export interface PdfLinkAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.LINK;
  /**
   * Text of the link
   */
  text: string;
  /**
   * target of the link
   */
  target: PdfLinkTarget | undefined;
}

/**
 * Pdf Text annotation
 *
 * @public
 */
export interface PdfTextAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.TEXT;
  /**
   * Text contents of the annotation
   */
  contents: string;

  /**
   * Color of the text
   */
  color: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
}

/**
 * Type of form field
 *
 * @public
 */
export enum PDF_FORM_FIELD_TYPE {
  /**
   * Unknow
   */
  UNKNOWN = 0,
  /**
   * push button type
   */
  PUSHBUTTON = 1,
  /**
   * check box type.
   */
  CHECKBOX = 2,
  /**
   * radio button type.
   */
  RADIOBUTTON = 3,
  /**
   * combo box type.
   */
  COMBOBOX = 4,
  /**
   * list box type.
   */
  LISTBOX = 5,
  /**
   *  text field type
   */
  TEXTFIELD = 6,
  /**
   * signature field type.
   */
  SIGNATURE = 7,
  /**
   * Generic XFA type.
   */
  XFA = 8,
  /**
   * XFA check box type.
   */
  XFA_CHECKBOX = 9,
  /**
   * XFA combo box type.
   */
  XFA_COMBOBOX = 10,
  /**
   * XFA image field type.
   */
  XFA_IMAGEFIELD = 11,
  /**
   * XFA list box type.
   */
  XFA_LISTBOX = 12,
  /**
   * XFA push button type.
   */
  XFA_PUSHBUTTON = 13,
  /**
   * XFA signture field type.
   */
  XFA_SIGNATURE = 14,
  /**
   * XFA text field type.
   */
  XFA_TEXTFIELD = 15,
}

/**
 * Flag of form field
 *
 * @public
 */
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

/**
 * Type of pdf object
 *
 * @public
 */
export enum PdfPageObjectType {
  UNKNOWN = 0,
  TEXT = 1,
  PATH = 2,
  IMAGE = 3,
  SHADING = 4,
  FORM = 5,
}

/**
 * Options of pdf widget annotation
 *
 * @public
 */
export interface PdfWidgetAnnoOption {
  label: string;
  isSelected: boolean;
}

/**
 * Field of PDF widget annotation
 *
 * @public
 */
export interface PdfWidgetAnnoField {
  /**
   * flag of field
   */
  flag: PDF_FORM_FIELD_FLAG;
  /**
   * name of field
   */
  name: string;
  /**
   * alternate name of field
   */
  alternateName: string;
  /**
   * type of field
   */
  type: PDF_FORM_FIELD_TYPE;
  /**
   * value of field
   */
  value: string;
  /**
   * whether field is checked
   */
  isChecked: boolean;
  /**
   * options of field
   */
  options: PdfWidgetAnnoOption[];
}

/**
 * PDF widget object
 *
 * @public
 */
export interface PdfWidgetAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.WIDGET;
  /**
   * Field of pdf widget object
   */
  field: PdfWidgetAnnoField;
}

/**
 * Pdf file attachments annotation
 *
 * @public
 */
export interface PdfFileAttachmentAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.FILEATTACHMENT;
}

/**
 * ink list in pdf ink annotation
 *
 * @public
 */
export interface PdfInkListObject {
  points: Position[];
}

/**
 * Pdf ink annotation
 *
 * @public
 */
export interface PdfInkAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.INK;
  inkList: PdfInkListObject[];
}

/**
 * Pdf polygon annotation
 *
 * @public
 */
export interface PdfPolygonAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.POLYGON;
  /**
   * vertices of annotation
   */
  vertices: Position[];
}

/**
 * PDF polyline annotation
 *
 * @public
 */
export interface PdfPolylineAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.POLYLINE;
  /**
   * vertices of annotation
   */
  vertices: Position[];
}

/**
 * PDF line annotation
 *
 * @public
 */
export interface PdfLineAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.LINE;
  /**
   * start point of line
   */
  startPoint: Position;
  /**
   * end point of line
   */
  endPoint: Position;
}

/**
 * PDF highlight annotation
 *
 * @public
 */
export interface PdfHighlightAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.HIGHLIGHT;

  /**
   * color of highlight area
   */
  color?: {
    red: number;
    gree: number;
    blue: number;
  };
}

/**
 * Matrix for transformation, in the form [a b c d e f], equivalent to:
 * | a  b  0 |
 * | c  d  0 |
 * | e  f  1 |
 *
 * Translation is performed with [1 0 0 1 tx ty].
 * Scaling is performed with [sx 0 0 sy 0 0].
 * See PDF Reference 1.7, 4.2.2 Common Transformations for more.
 */
export interface PdfTransformMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

/**
 * type of segment type in pdf path object
 *
 * @public
 */
export enum PdfSegmentObjectType {
  UNKNOWN = -1,
  LINETO = 0,
  BEZIERTO = 1,
  MOVETO = 2,
}

/**
 * segment of path object
 *
 * @public
 */
export interface PdfSegmentObject {
  type: PdfSegmentObjectType;
  /**
   * point of the segment
   */
  point: Position;
  /**
   * whether this segment close the path
   */
  isClosed: boolean;
}

/**
 * Pdf path object
 *
 * @public
 */
export interface PdfPathObject {
  type: PdfPageObjectType.PATH;
  /**
   * bound that contains the path
   */
  bounds: { left: number; bottom: number; right: number; top: number };
  /**
   * segments of the path
   */
  segments: PdfSegmentObject[];
  /**
   * transform matrix
   */
  matrix: PdfTransformMatrix;
}

/**
 * Pdf image object
 *
 * @public
 */
export interface PdfImageObject {
  type: PdfPageObjectType.IMAGE;
  /**
   * data of the image
   */
  imageData: ImageData;
  /**
   * transform matrix
   */
  matrix: PdfTransformMatrix;
}

/**
 * Pdf form object
 *
 * @public
 */
export interface PdfFormObject {
  type: PdfPageObjectType.FORM;
  /**
   * objects that in this form object
   */
  objects: (PdfImageObject | PdfPathObject | PdfFormObject)[];
  /**
   * transform matrix
   */
  matrix: PdfTransformMatrix;
}

/**
 * Contents type of pdf stamp annotation
 *
 * @public
 */
export type PdfStampAnnoObjectContents = Array<
  PdfPathObject | PdfImageObject | PdfFormObject
>;

/**
 * Pdf stamp annotation
 *
 * @public
 */
export interface PdfStampAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.STAMP;
  /**
   * contents in this stamp annotation
   */
  contents: PdfStampAnnoObjectContents;
}

/**
 * Pdf circle annotation
 *
 * @public
 */
export interface PdfCircleAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.CIRCLE;
}

/**
 * Pdf square annotation
 *
 * @public
 */
export interface PdfSquareAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.SQUARE;
}

/**
 * Pdf squiggly annotation
 *
 * @public
 */
export interface PdfSquigglyAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.SQUIGGLY;
}

/**
 * Pdf underline annotation
 *
 * @public
 */
export interface PdfUnderlineAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.UNDERLINE;
}

/**
 * Pdf strike out annotation
 *
 * @public
 */
export interface PdfStrikeOutAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.STRIKEOUT;
}

/**
 * Pdf caret annotation
 *
 * @public
 */
export interface PdfCaretAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.CARET;
}

/**
 * Pdf free text annotation
 *
 * @public
 */
export interface PdfFreeTextAnnoObject extends PdfAnnotationObjectBase {
  /** {@inheritDoc PdfAnnotationObjectBase.type} */
  type: PdfAnnotationSubtype.FREETEXT;
  contents: string;
}

/**
 * All annotation that support
 *
 * @public
 */
export type PdfSupportedAnnoObject =
  | PdfInkAnnoObject
  | PdfTextAnnoObject
  | PdfLinkAnnoObject
  | PdfPolygonAnnoObject
  | PdfPolylineAnnoObject
  | PdfHighlightAnnoObject
  | PdfLineAnnoObject
  | PdfWidgetAnnoObject
  | PdfFileAttachmentAnnoObject
  | PdfStampAnnoObject
  | PdfSquareAnnoObject
  | PdfCircleAnnoObject
  | PdfSquigglyAnnoObject
  | PdfUnderlineAnnoObject
  | PdfStrikeOutAnnoObject
  | PdfCaretAnnoObject
  | PdfFreeTextAnnoObject;

/**
 * Pdf annotation that does not support
 *
 * @public
 */
export interface PdfUnsupportedAnnoObject extends PdfAnnotationObjectBase {
  type: Exclude<PdfAnnotationSubtype, PdfSupportedAnnoObject['type']>;
}

/**
 * all annotations
 *
 * @public
 */
export type PdfAnnotationObject =
  | PdfSupportedAnnoObject
  | PdfUnsupportedAnnoObject;

/**
 * Pdf attachment
 *
 * @public
 */
export interface PdfAttachmentObject {
  index: number;
  name: string;
  creationDate: string;
  checksum: string;
}

/**
 * Pdf engine features
 *
 * @public
 */
export enum PdfEngineFeature {
  RenderPage,
  RenderPageRect,
  Thumbnails,
  Bookmarks,
  Annotations,
}

/**
 * All operations for this engine
 *
 * @public
 */
export enum PdfEngineOperation {
  Create,
  Read,
  Update,
  Delete,
}

/**
 * flags to match the text during searching
 *
 * @public
 */
export enum MatchFlag {
  None = 0,
  MatchCase = 1,
  MatchWholeWord = 2,
  MatchConsecutive = 4,
}

/**
 * Union all the flags
 * @param flags - all the flags
 * @returns union of flags
 *
 * @public
 */
export function unionFlags(flags: MatchFlag[]) {
  return flags.reduce((flag, currFlag) => {
    return flag | currFlag;
  }, MatchFlag.None);
}

/**
 * Targe for searching
 *
 * @public
 */
export interface SearchTarget {
  keyword: string;
  flags: MatchFlag[];
}

/**
 * compare 2 search target
 * @param targetA - first target for search
 * @param targetB - second target for search
 * @returns whether 2 search target are the same
 *
 * @public
 */
export function compareSearchTarget(
  targetA: SearchTarget,
  targetB: SearchTarget,
) {
  const flagA = unionFlags(targetA.flags);
  const flagB = unionFlags(targetB.flags);

  return flagA === flagB && targetA.keyword === targetB.keyword;
}

/**
 * search result
 *
 * @public
 */
export interface SearchResult {
  /**
   * Index of the pdf page
   */
  pageIndex: number;
  /**
   * index of the first character
   */
  charIndex: number;
  /**
   * count of the characters
   */
  charCount: number;
  /**
   * region of the search result
   */
  region: {
    /**
     * the rect of the first character
     */
    start: Rect;
    /**
     * the rect of the end character
     */
    end: Rect;
  };
}
/**
 * form field value
 * @public
 */
export type FormFieldValue =
  | { kind: 'text'; text: string }
  | { kind: 'selection'; index: number; isSelected: boolean }
  | { kind: 'checked'; isChecked: boolean };

/**
 * Transformation that will be applied to annotation
 *
 * @public
 */
export interface PdfAnnotationTransformation {
  /**
   * Translated offset
   */
  offset: Position;
  /**
   * Scaled factors
   */
  scale: Size;
}

/**
 * Render options
 *
 * @public
 */
export interface PdfRenderOptions {
  /**
   * Whether needs to render the page with annotations
   */
  withAnnotations: boolean;
}

/**
 * source can be byte array contains pdf content
 *
 * @public
 */
export type PdfFileContent = ArrayBuffer;

export enum PdfPermission {
  PrintDocument = 2 ** 3,
  ModifyContent = 2 ** 4,
  CopyOrExtract = 2 ** 5,
  AddOrModifyTextAnnot = 2 ** 6,
  FillInExistingForm = 2 ** 9,
  ExtractTextOrGraphics = 2 ** 10,
  AssembleDocument = 2 ** 11,
  PrintHighQuality = 2 ** 12,
}

export enum PdfPageFlattenFlag {
  Display = 0,
  Print = 1,
}

export enum PdfPageFlattenResult {
  Fail = 0,
  Success = 1,
  NothingToDo = 2,
}

/**
 * Pdf File
 *
 * @public
 */
export interface PdfFile {
  /**
   * id of file
   */
  id: string;
  /**
   * name of file
   */
  name: string;
  /**
   * content of file
   */
  content: PdfFileContent;
}

export enum PdfErrorCode {
  Ok, //  #define FPDF_ERR_SUCCESS 0    // No error.
  Unknown, // #define FPDF_ERR_UNKNOWN 1    // Unknown error.
  NotFound, // #define FPDF_ERR_FILE 2       // File not found or could not be opened.
  WrongFormat, // #define FPDF_ERR_FORMAT 3     // File not in PDF format or corrupted.
  Password, // #define FPDF_ERR_PASSWORD 4   // Password required or incorrect password.
  Security, // #define FPDF_ERR_SECURITY 5   // Unsupported security scheme.
  PageError, // #define FPDF_ERR_PAGE 6       // Page not found or content error.
  XFALoad, // #ifdef PDF_ENABLE_XFA
  XFALayout, //
  Cancelled,
  Initialization,
  NotReady,
  NotSupport,
  LoadDoc,
  DocNotOpen,
  CantCloseDoc,
  CantCreateNewDoc,
  CantImportPages,
  CantCreateAnnot,
  CantSetAnnotRect,
  CantSetAnnotContent,
  CantRemoveInkList,
  CantAddInkStoke,
  CantReadAttachmentSize,
  CantReadAttachmentContent,
  CantFocusAnnot,
  CantSelectText,
  CantSelectOption,
  CantCheckField,
}

export interface PdfErrorReason {
  code: PdfErrorCode;
  message: string;
}

export type PdfEngineError = TaskError<PdfErrorReason>;

export type PdfTask<R> = Task<R, PdfErrorReason>;

export class PdfTaskHelper {
  /**
   * Create a task
   * @returns new task
   */
  static create<R>(): Task<R, PdfErrorReason> {
    return new Task<R, PdfErrorReason>();
  }

  /**
   * Create a task that has been resolved with value
   * @param result - resolved value
   * @returns resolved task
   */
  static resolve<R>(result: R): Task<R, PdfErrorReason> {
    const task = new Task<R, PdfErrorReason>();
    task.resolve(result);

    return task;
  }

  /**
   * Create a task that has been rejected with error
   * @param reason - rejected error
   * @returns rejected task
   */
  static reject<T = any>(reason: PdfErrorReason): Task<T, PdfErrorReason> {
    const task = new Task<T, PdfErrorReason>();
    task.reject(reason);

    return task;
  }

  /**
   * Create a task that has been aborted with error
   * @param reason - aborted error
   * @returns aborted task
   */
  static abort<T = any>(reason: PdfErrorReason): Task<T, PdfErrorReason> {
    const task = new Task<T, PdfErrorReason>();
    task.reject(reason);

    return task;
  }
}

/**
 * Pdf engine
 *
 * @public
 */
export interface PdfEngine {
  /**
   * Check whether pdf engine supports this feature
   * @param feature - which feature want to check
   * @returns support or not
   */
  isSupport?: (feature: PdfEngineFeature) => PdfTask<PdfEngineOperation[]>;
  /**
   * Initialize the engine
   * @returns task that indicate whether initialization is successful
   */
  initialize?: () => PdfTask<boolean>;
  /**
   * Destroy the engine
   * @returns task that indicate whether destroy is successful
   */
  destroy?: () => PdfTask<boolean>;
  /**
   * Open pdf document
   * @param file - pdf file
   * @param password - protected password for this file
   * @returns task that contains the file or error
   */
  openDocument: (file: PdfFile, password: string) => PdfTask<PdfDocumentObject>;
  /**
   * Get the metadata of the file
   * @param doc - pdf document
   * @returns task that contains the metadata or error
   */
  getMetadata: (doc: PdfDocumentObject) => PdfTask<PdfMetadataObject>;
  /**
   * Get permissions of the file
   * @param doc - pdf document
   * @returns task that contains a 32-bit integer indicating permission flags
   */
  getDocPermissions: (doc: PdfDocumentObject) => PdfTask<number>;
  /**
   * Get the user permissions of the file
   * @param doc - pdf document
   * @returns task that contains a 32-bit integer indicating permission flags
   */
  getDocUserPermissions: (doc: PdfDocumentObject) => PdfTask<number>;
  /**
   * Get the signatures of the file
   * @param doc - pdf document
   * @returns task that contains the signatures or error
   */
  getSignatures: (doc: PdfDocumentObject) => PdfTask<PdfSignatureObject[]>;
  /**
   * Get the bookmarks of the file
   * @param doc - pdf document
   * @returns task that contains the bookmarks or error
   */
  getBookmarks: (doc: PdfDocumentObject) => PdfTask<PdfBookmarksObject>;
  /**
   * Render the specified pdf page
   * @param doc - pdf document
   * @param page - pdf page
   * @param scaleFactor - factor of scaling
   * @param rotation - rotated angle
   * @param dpr - devicePixelRatio
   * @param options - render options
   * @returns task contains the rendered image or error
   */
  renderPage: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    dpr: number,
    options: PdfRenderOptions,
  ) => PdfTask<ImageData>;
  /**
   * Render the specified rect of pdf page
   * @param doc - pdf document
   * @param page - pdf page
   * @param scaleFactor - factor of scaling
   * @param rotation - rotated angle
   * @param dpr - devicePixelRatio
   * @param rect - target rect
   * @param options - render options
   * @returns task contains the rendered image or error
   */
  renderPageRect: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    dpr: number,
    rect: Rect,
    options: PdfRenderOptions,
  ) => PdfTask<ImageData>;
  /**
   * Get annotations of pdf page
   * @param doc - pdf document
   * @param page - pdf page
   * @param scaleFactor - factor of scaling
   * @param rotation - rotated angle
   * @returns task contains the annotations or error
   */
  getPageAnnotations: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
  ) => PdfTask<PdfAnnotationObject[]>;
  /**
   * Create a annotation on specified page
   * @param doc - pdf document
   * @param page - pdf page
   * @param annotation - new annotations
   * @returns task whether the annotations is created successfully
   */
  createPageAnnotation: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
  ) => PdfTask<boolean>;
  /**
   * Transform the annotation
   * @param doc - pdf document
   * @param page - pdf page
   * @param annotation - new annotations
   * @param transformation - transformation applied on the annotation
   * @returns task whether the annotations is transformed successfully
   */
  transformPageAnnotation: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
    transformation: PdfAnnotationTransformation,
  ) => PdfTask<boolean>;
  /**
   * Remove a annotation on specified page
   * @param doc - pdf document
   * @param page - pdf page
   * @param annotation - new annotations
   * @returns task whether the annotations is removed successfully
   */
  removePageAnnotation: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfAnnotationObject,
  ) => PdfTask<boolean>;
  /**
   * get all text rects in pdf page
   * @param doc - pdf document
   * @param page - pdf page
   * @param scaleFactor - factor of scaling
   * @param rotation - rotated angle
   * @returns task contains the text rects or error
   */
  getPageTextRects: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
  ) => PdfTask<PdfTextRectObject[]>;
  /**
   * Render the thumbnail of specified pdf page
   * @param doc - pdf document
   * @param page - pdf page
   * @param scaleFactor - factor of scaling
   * @param rotation - rotated angle
   * @param dpr - devicePixelRatio
   * @param options - render options
   * @returns task contains the rendered image or error
   */
  renderThumbnail: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    scaleFactor: number,
    rotation: Rotation,
    dpr: number,
  ) => PdfTask<ImageData>;
  /**
   * Start searching with new context
   * @param doc - pdf document
   * @param contextId - id of context
   * @returns Task contains whether search has started
   */
  startSearch: (doc: PdfDocumentObject, contextId: number) => PdfTask<boolean>;
  /**
   * Search next target
   * @param doc - pdf document
   * @param contextId - id of context
   * @param target - search target
   * @returns task contains the search result or error
   */
  searchNext: (
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget,
  ) => PdfTask<SearchResult | undefined>;
  /**
   * Search the previous targets
   * @param doc - pdf document
   * @param contextId - id of context
   * @param target - search target
   * @returns task contains the search result or error
   */
  searchPrev: (
    doc: PdfDocumentObject,
    contextId: number,
    target: SearchTarget,
  ) => PdfTask<SearchResult | undefined>;
  /**
   * Stop searching with new context
   * @param doc - pdf document
   * @param contextId - id of context
   * @returns Task contains whether search has stopped
   */
  stopSearch: (doc: PdfDocumentObject, contextId: number) => PdfTask<boolean>;
  /**
   * Get all attachments in this file
   * @param doc - pdf document
   * @returns task that contains the attachments or error
   */
  getAttachments: (doc: PdfDocumentObject) => PdfTask<PdfAttachmentObject[]>;
  /**
   * Read content of pdf attachment
   * @param doc - pdf document
   * @param attachment - pdf attachments
   * @returns task that contains the content of specified attachment or error
   */
  readAttachmentContent: (
    doc: PdfDocumentObject,
    attachment: PdfAttachmentObject,
  ) => PdfTask<ArrayBuffer>;
  /**
   * Set form field value
   * @param doc - pdf document
   * @param page - pdf page
   * @param annotation - pdf annotation
   * @param text - text value
   */
  setFormFieldValue: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    annotation: PdfWidgetAnnoObject,
    value: FormFieldValue,
  ) => PdfTask<boolean>;
  /**
   * Flatten annotations and form fields into the page contents.
   * @param doc - pdf document
   * @param page - pdf page
   * @param flag - flatten flag
   */
  flattenPage: (
    doc: PdfDocumentObject,
    page: PdfPageObject,
    flag: PdfPageFlattenFlag,
  ) => PdfTask<PdfPageFlattenResult>;
  /**
   * Extract pdf pages to a new file
   * @param doc - pdf document
   * @param pageIndexes - indexes of pdf pages
   * @returns task contains the new pdf file content
   */
  extractPages: (
    doc: PdfDocumentObject,
    pageIndexes: number[],
  ) => PdfTask<ArrayBuffer>;
  /**
   * Extract text on specified pdf pages
   * @param doc - pdf document
   * @param pageIndexes - indexes of pdf pages
   * @returns task contains the text
   */
  extractText: (
    doc: PdfDocumentObject,
    pageIndexes: number[],
  ) => PdfTask<string>;
  /**
   * Merge multiple pdf documents
   * @param files - all the pdf files
   * @returns task contains the merged pdf file
   */
  merge: (files: PdfFile[]) => PdfTask<PdfFile>;
  /**
   * Save a copy of pdf document
   * @param doc - pdf document
   * @returns task contains the new pdf file content
   */
  saveAsCopy: (doc: PdfDocumentObject) => PdfTask<ArrayBuffer>;
  /**
   * Close pdf document
   * @param doc - pdf document
   * @returns task that file is closed or not
   */
  closeDocument: (doc: PdfDocumentObject) => PdfTask<boolean>;
}

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
