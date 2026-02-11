import {
  Logger,
  NoopLogger,
  PdfDocumentObject,
  PdfEngine,
  PdfFile,
  Rotation,
  PdfDestinationObject,
} from '@unionpdf/models';
import {
  PdfApplicationConfiguration,
  PdfApplicationConfigurationProvider,
  PdfApplicationMode,
  PdfApplicatinPluginConfiguration,
  PdfApplicatinPluginKey,
  MemoryPdfApplicationConfigurationProvider,
} from './application.configuration';

/**
 * Event bus for cross-component communication within a PDF application.
 * Components discover context by traversing the DOM tree to find the nearest
 * PdfApplicationElement ancestor.
 */

// ------------------------------------------------------------------
// UIStrings – same shape as the React package
// ------------------------------------------------------------------
export interface UIStrings {
  unknownError: string;
  rotate0Deg: string;
  rotate90Deg: string;
  rotate180Deg: string;
  rotate270Deg: string;
  thumbnails: string;
  bookmarks: string;
  noBookmarks: string;
  saveAs: string;
  print: string;
  metadata: string;
  title: string;
  author: string;
  subject: string;
  keywords: string;
  producer: string;
  creator: string;
  creationDate: string;
  modificationDate: string;
  search: string;
  nextMatch: string;
  previousMatch: string;
  matchCase: string;
  matchWholeWord: string;
  matchConsecutive: string;
  attchments: string;
  noAttachments: string;
  fileName: string;
  fileSize: string;
  fileCreationDate: string;
  download: string;
  upload: string;
  signatures: string;
  noSignatures: string;
  extract: string;
  pencil: string;
  fillForm: string;
  stamps: string;
  addTextBox: string;
  addStamp: string;
  addImage: string;
  selection: string;
  annotation: string;
  createStamp: string;
  cancel: string;
  exit: string;
  edit: string;
  open: string;
  save: string;
  commit: string;
  discard: string;
  uncommittedWarning: string;
  printing: string;
  remove: string;
  noFiles: string;
  merge: string;
  merging: string;
  extractPages: string;
  extractText: string;
}

export const defaultStrings: UIStrings = {
  unknownError: 'Unknown Error',
  rotate0Deg: '0 degree',
  rotate90Deg: '90 degree',
  rotate180Deg: '180 degree',
  rotate270Deg: '270 degree',
  thumbnails: 'Thumbnails',
  bookmarks: 'Bookmarks',
  noBookmarks: 'No bookmarks',
  saveAs: 'Save As',
  print: 'Print',
  metadata: 'Metadata',
  title: 'Title',
  author: 'Author',
  subject: 'Subject',
  keywords: 'Keywords',
  producer: 'Producer',
  creator: 'Creator',
  creationDate: 'Creation Date',
  modificationDate: 'Modification Date',
  search: 'Search',
  nextMatch: 'Next',
  previousMatch: 'Previous',
  matchCase: 'Match Case',
  matchWholeWord: 'Match Whole Word',
  matchConsecutive: 'Match Consecutive',
  attchments: 'Attachments',
  noAttachments: 'No Attachments',
  fileName: 'Name',
  fileSize: 'Size',
  fileCreationDate: 'Creation Date',
  download: 'Download',
  upload: 'Upload',
  signatures: 'Signatures',
  noSignatures: 'No Signatures',
  extract: 'Extract',
  pencil: 'Pencil',
  fillForm: 'Fill Form',
  addTextBox: 'Add Text Box',
  addStamp: 'Add Stamp',
  addImage: 'Add Image',
  selection: 'Selection',
  annotation: 'Annotation',
  stamps: 'Stamps',
  createStamp: 'Create Stamp',
  cancel: 'Cancel',
  exit: 'Exit',
  edit: 'Edit',
  open: 'Open',
  save: 'Save',
  commit: 'Commit',
  discard: 'Discard',
  uncommittedWarning:
    'You have changes that is not committed, do you want to save those changes ?',
  printing: 'Printing',
  remove: 'Remove',
  noFiles: 'No Files',
  merge: 'Merge',
  merging: 'Merging',
  extractPages: 'Extract Pages',
  extractText: 'Extract Text',
};

// ------------------------------------------------------------------
// Decoration
// ------------------------------------------------------------------
export interface PdfDocumentDecoration {
  pageIndex: number;
  index: number;
  type: string;
  source: string;
  payload: unknown;
}

// ------------------------------------------------------------------
// Navigator
// ------------------------------------------------------------------
export interface PdfNavigatorGotoPageEvent {
  kind: 'GotoPage';
  data: {
    destination: PdfDestinationObject;
  };
}

export type PdfNavigatorEvent = PdfNavigatorGotoPageEvent;

export type PdfNavigatorListener = {
  source: string;
  handler: (event: PdfNavigatorEvent, source: string) => void;
};

// ------------------------------------------------------------------
// PdfApplicationContext – the central shared state
// ------------------------------------------------------------------
export class PdfApplicationContext {
  // Engine
  private _engine: PdfEngine | null = null;
  get engine() {
    return this._engine;
  }
  set engine(v: PdfEngine | null) {
    this._engine = v;
    this.notify('engine');
  }

  // Logger
  private _logger: Logger = new NoopLogger();
  get logger() {
    return this._logger;
  }
  set logger(v: Logger) {
    this._logger = v;
    this.notify('logger');
  }

  // File
  private _file: PdfFile | null = null;
  get file() {
    return this._file;
  }
  set file(v: PdfFile | null) {
    this._file = v;
    this.notify('file');
  }

  // Password
  private _password: string = '';
  get password() {
    return this._password;
  }
  set password(v: string) {
    this._password = v;
    this.notify('password');
  }

  // Document
  private _doc: PdfDocumentObject | null = null;
  get doc() {
    return this._doc;
  }
  set doc(v: PdfDocumentObject | null) {
    this._doc = v;
    this.notify('doc');
  }

  // Version
  private _version: number = Date.now();
  get version() {
    return this._version;
  }
  set version(v: number) {
    this._version = v;
    this.notify('version');
  }

  // UIStrings
  private _strings: UIStrings = defaultStrings;
  get strings() {
    return this._strings;
  }
  set strings(v: UIStrings) {
    this._strings = v;
    this.notify('strings');
  }

  // Configuration provider
  private _configProvider: PdfApplicationConfigurationProvider;
  get configProvider() {
    return this._configProvider;
  }

  // Derived configuration values
  private _configuration: PdfApplicationConfiguration;
  get configuration() {
    return this._configuration;
  }

  get mode(): PdfApplicationMode {
    const editorPlugin =
      this._configuration.plugins[PdfApplicatinPluginKey.Editor];
    return editorPlugin.isEnabled && editorPlugin.isVisible
      ? PdfApplicationMode.Edit
      : PdfApplicationMode.View;
  }

  get scaleFactor() {
    return this._configuration.scaleFactor;
  }
  get rotation() {
    return this._configuration.rotation;
  }
  get plugins() {
    return this._configuration.plugins;
  }

  // Navigator state
  private _currPageIndex: number = 0;
  get currPageIndex() {
    return this._currPageIndex;
  }
  set currPageIndex(v: number) {
    this._currPageIndex = v;
    this.notify('currPageIndex');
  }

  private _navigatorListeners: PdfNavigatorListener[] = [];

  // Decorations
  private _decorations: PdfDocumentDecoration[] = [];
  get decorations() {
    return this._decorations;
  }

  // ---- Event system ----
  private _listeners: Map<string, Set<() => void>> = new Map();

  constructor(configProvider?: PdfApplicationConfigurationProvider) {
    this._configProvider =
      configProvider || new MemoryPdfApplicationConfigurationProvider();
    this._configuration = this._configProvider.get();
    this._configProvider.subscribe(this._onConfigChange);
  }

  private _onConfigChange = (config: PdfApplicationConfiguration) => {
    this._configuration = config;
    this.notify('configuration');
    this.notify('mode');
    this.notify('scaleFactor');
    this.notify('rotation');
    this.notify('plugins');
  };

  subscribe(key: string, callback: () => void) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key)!.add(callback);
  }

  unsubscribe(key: string, callback: () => void) {
    this._listeners.get(key)?.delete(callback);
  }

  notify(key: string) {
    const listeners = this._listeners.get(key);
    if (listeners) {
      for (const cb of listeners) {
        try {
          cb();
        } catch (e) {
          this._logger.error('PdfApplicationContext', 'notify', e);
        }
      }
    }
  }

  // Configuration shortcuts
  setScaleFactor(scaleFactor: number) {
    this._configProvider.setScaleFactor(scaleFactor);
  }
  setRotation(rotation: Rotation) {
    this._configProvider.setRotation(rotation);
  }
  showPlugin(key: PdfApplicatinPluginKey) {
    this._configProvider.showPlugin(key);
  }
  hidePlugin(key: PdfApplicatinPluginKey) {
    this._configProvider.hidePlugin(key);
  }
  togglePlugin(key: PdfApplicatinPluginKey) {
    this._configProvider.togglePlugin(key);
  }

  // Navigator
  gotoPage(data: PdfNavigatorGotoPageEvent['data'], source: string) {
    if (this._currPageIndex === data.destination.pageIndex) {
      return;
    }

    const evt: PdfNavigatorEvent = { kind: 'GotoPage', data };
    for (const listener of this._navigatorListeners) {
      try {
        if (listener.source !== source) {
          listener.handler(evt, source);
        }
      } catch (e) {
        this._logger.error('PdfNavigator', 'gotoPage', e);
      }
    }

    this._currPageIndex = data.destination.pageIndex;
    this.notify('currPageIndex');
  }

  addNavigatorListener(
    source: string,
    handler: PdfNavigatorListener['handler'],
  ) {
    const existing = this._navigatorListeners.find(
      (l) => l.source === source && l.handler === handler,
    );
    if (!existing) {
      this._navigatorListeners.push({ source, handler });
    }
  }

  removeNavigatorListener(
    source: string,
    handler: PdfNavigatorListener['handler'],
  ) {
    this._navigatorListeners = this._navigatorListeners.filter(
      (l) => !(l.source === source && l.handler === handler),
    );
  }

  // Decorations
  addDecoration(decoration: PdfDocumentDecoration) {
    this._decorations = [...this._decorations, decoration];
    this.notify('decorations');
  }

  removeDecoration(decoration: PdfDocumentDecoration) {
    this._decorations = this._decorations.filter(
      (d) =>
        !(
          d.pageIndex === decoration.pageIndex &&
          d.index === decoration.index &&
          d.type === decoration.type &&
          d.source === decoration.source
        ),
    );
    this.notify('decorations');
  }

  destroy() {
    this._configProvider.unsubscribe(this._onConfigChange);
    this._listeners.clear();
    this._navigatorListeners = [];
  }
}
