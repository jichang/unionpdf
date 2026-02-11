import {
  PdfDocumentObject,
  PdfEngine,
  PdfEngineError,
  PdfFile,
  Logger,
  NoopLogger,
} from '@unionpdf/models';
import {
  PdfApplicationContext,
  UIStrings,
  defaultStrings,
} from '../core/context';
import {
  PdfApplicationConfigurationProvider,
  PdfApplicationMode,
  PdfApplicatinPluginKey,
  MemoryPdfApplicationConfigurationProvider,
} from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
  position: relative;
  font-family: sans-serif;
}
:host(.pdf__application--edit) {
  /* additional edit-mode styles */
}
.pdf__document {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
`;

/**
 * <pdf-application> – root element for the unionpdf web component tree.
 *
 * Properties:
 *  - engine: PdfEngine
 *  - file: PdfFile | null
 *  - password: string
 *  - logger: Logger
 *  - strings: UIStrings
 *  - configProvider: PdfApplicationConfigurationProvider
 *
 * Events:
 *  - pdf-open-success: { detail: PdfDocumentObject }
 *  - pdf-open-failure: { detail: PdfEngineError }
 */
export class PdfApplicationElement extends HTMLElement {
  static get observedAttributes() {
    return ['password'];
  }

  /** @internal */
  __pdfContext!: PdfApplicationContext;

  private _shadow: ShadowRoot;
  private _openPending = false;
  private _openGeneration = 0;

  // ---- Public setters ----
  private _engine: PdfEngine | null = null;
  get engine() {
    return this._engine;
  }
  set engine(v: PdfEngine | null) {
    this._engine = v;
    if (this.__pdfContext) {
      this.__pdfContext.engine = v;
    }
    this.scheduleOpen();
  }

  private _file: PdfFile | null = null;
  get file() {
    return this._file;
  }
  set file(v: PdfFile | null) {
    this._file = v;
    if (this.__pdfContext) {
      this.__pdfContext.file = v;
    }
    this.scheduleOpen();
  }

  private _password: string = '';
  get password() {
    return this._password;
  }
  set password(v: string) {
    this._password = v;
    if (this.__pdfContext) {
      this.__pdfContext.password = v;
    }
    this.scheduleOpen();
  }

  private _logger: Logger = new NoopLogger();
  get logger() {
    return this._logger;
  }
  set logger(v: Logger) {
    this._logger = v;
    if (this.__pdfContext) {
      this.__pdfContext.logger = v;
    }
  }

  private _strings: UIStrings = defaultStrings;
  get strings() {
    return this._strings;
  }
  set strings(v: UIStrings) {
    this._strings = v;
    if (this.__pdfContext) {
      this.__pdfContext.strings = v;
    }
  }

  private _configProvider: PdfApplicationConfigurationProvider | null = null;
  get configProvider() {
    return this._configProvider;
  }
  set configProvider(v: PdfApplicationConfigurationProvider | null) {
    this._configProvider = v;
    // Reinitialize context with new provider - rare operation
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const provider =
      this._configProvider || new MemoryPdfApplicationConfigurationProvider();
    this.__pdfContext = new PdfApplicationContext(provider);
    this.__pdfContext.engine = this._engine;
    this.__pdfContext.file = this._file;
    this.__pdfContext.password = this._password;
    this.__pdfContext.logger = this._logger;
    this.__pdfContext.strings = this._strings;

    // Listen for mode changes to update host class
    this.__pdfContext.subscribe('mode', () => this.updateModeClass());

    this.render();
    this.scheduleOpen();
  }

  disconnectedCallback() {
    this.closeCurrentDocument();
    this.__pdfContext?.destroy();
  }

  attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
    if (name === 'password') {
      this.password = newVal || '';
    }
  }

  private updateModeClass() {
    if (this.__pdfContext?.mode === PdfApplicationMode.Edit) {
      this.classList.add('pdf__application--edit');
      this.classList.remove('pdf__application--read');
    } else {
      this.classList.remove('pdf__application--edit');
      this.classList.add('pdf__application--read');
    }
  }

  private closeCurrentDocument() {
    if (this.__pdfContext?.doc && this._engine) {
      this._engine.closeDocument(this.__pdfContext.doc);
      this.__pdfContext.doc = null;
    }
  }

  /**
   * Schedule an open-document attempt on the next microtask, coalescing
   * multiple rapid property changes (e.g. file + password) into one call.
   */
  private scheduleOpen() {
    if (!this.__pdfContext) return;
    if (this._openPending) return;
    this._openPending = true;
    queueMicrotask(() => {
      this._openPending = false;
      this.tryOpenDocument();
    });
  }

  private tryOpenDocument() {
    if (!this.__pdfContext) return;

    this.closeCurrentDocument();

    if (!this._engine || !this._file) {
      this.__pdfContext.doc = null;
      return;
    }

    const generation = ++this._openGeneration;
    const task = this._engine.openDocument(this._file, this._password);
    task.wait(
      (doc: PdfDocumentObject) => {
        if (generation !== this._openGeneration) return; // stale
        this.__pdfContext.doc = doc;
        this.__pdfContext.currPageIndex = 0;
        this.dispatchEvent(
          new CustomEvent('pdf-open-success', { detail: doc, bubbles: true }),
        );
      },
      (error: PdfEngineError) => {
        if (generation !== this._openGeneration) return; // stale
        this.dispatchEvent(
          new CustomEvent('pdf-open-failure', { detail: error, bubbles: true }),
        );
      },
    );
  }

  private render() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    const container = document.createElement('div');
    container.className = 'pdf__document';
    container.innerHTML = '<slot></slot>';
    this._shadow.appendChild(container);

    this.updateModeClass();
  }
}

customElements.define('pdf-application', PdfApplicationElement);
