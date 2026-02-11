import {
  ignore,
  MatchFlag,
  PdfErrorCode,
  PdfZoomMode,
  SearchResult,
} from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfApplicatinPluginKey } from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__search__panel {
  display: none;
}
.pdf__search__panel.visible {
  display: block;
}
.pdf__search__header {
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
.pdf__search {
  padding: 8px;
}
.pdf__search__form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.pdf__search__field {
  display: flex;
  align-items: center;
  gap: 4px;
}
.pdf__search__field input[type="text"] {
  flex: 1;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.pdf__search__field label {
  font-size: 12px;
  cursor: pointer;
}
.pdf__search__actions {
  display: flex;
  gap: 4px;
}
.pdf__search__actions button {
  padding: 4px 8px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}
.pdf__search__actions button:hover {
  background: #eee;
}
`;

const PDF_NAVIGATOR_SOURCE_SEARCH = 'PdfSearch';
const PDF_PAGE_DECORATION_TYPE_SEARCH = 'highlight';

/**
 * <pdf-search> – search panel for full-text search within the PDF.
 */
export class PdfSearchElement extends PdfBaseElement {
  private _shadow: ShadowRoot;
  private _panelEl: HTMLDivElement | null = null;
  private _contextId: number = 0;
  private _currentResult: SearchResult | undefined;
  private _flags: MatchFlag[] = [];
  private _keyword: string = '';
  private _searchStarted: boolean = false;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  protected onContextReady() {
    this._contextId = Date.now();
    this.renderShell();
    this.listen('plugins', () => this.updateVisibility());
    this.listen('doc', () => this.onDocChanged());
  }

  disconnectedCallback() {
    this.stopSearch();
    super.disconnectedCallback();
  }

  private renderShell() {
    const ctx = this._ctx;
    if (!ctx) return;

    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._panelEl = document.createElement('div');
    this._panelEl.className = 'pdf__search__panel';

    const header = document.createElement('div');
    header.className = 'pdf__search__header';
    header.textContent = ctx.strings.search;
    this._panelEl.appendChild(header);

    const content = document.createElement('div');
    content.className = 'pdf__search';

    const form = document.createElement('form');
    form.className = 'pdf__search__form';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.searchNext();
    });

    // Keyword field
    const keywordField = document.createElement('div');
    keywordField.className = 'pdf__search__field';
    const keywordInput = document.createElement('input');
    keywordInput.type = 'text';
    keywordInput.placeholder = ctx.strings.search;
    keywordInput.addEventListener('input', () => {
      this._keyword = keywordInput.value;
    });
    keywordField.appendChild(keywordInput);
    form.appendChild(keywordField);

    // Match case
    this.addCheckbox(
      form,
      'matchCase',
      ctx.strings.matchCase,
      MatchFlag.MatchCase,
    );
    // Match whole word
    this.addCheckbox(
      form,
      'matchWholeWord',
      ctx.strings.matchWholeWord,
      MatchFlag.MatchWholeWord,
    );
    // Match consecutive
    this.addCheckbox(
      form,
      'matchConsecutive',
      ctx.strings.matchConsecutive,
      MatchFlag.MatchConsecutive,
    );

    // Action buttons
    const actions = document.createElement('div');
    actions.className = 'pdf__search__actions';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.textContent = ctx.strings.previousMatch;
    prevBtn.addEventListener('click', () => this.searchPrev());
    actions.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'submit';
    nextBtn.textContent = ctx.strings.nextMatch;
    actions.appendChild(nextBtn);

    form.appendChild(actions);
    content.appendChild(form);
    this._panelEl.appendChild(content);
    this._shadow.appendChild(this._panelEl);

    this.updateVisibility();
  }

  private addCheckbox(
    form: HTMLFormElement,
    id: string,
    label: string,
    flag: MatchFlag,
  ) {
    const field = document.createElement('div');
    field.className = 'pdf__search__field';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.value = String(flag);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (!this._flags.includes(flag)) this._flags.push(flag);
      } else {
        this._flags = this._flags.filter((f) => f !== flag);
      }
    });
    field.appendChild(checkbox);

    const labelEl = document.createElement('label');
    labelEl.htmlFor = id;
    labelEl.textContent = label;
    field.appendChild(labelEl);

    form.appendChild(field);
  }

  private updateVisibility() {
    if (!this._panelEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Search];
    const isVisible = config.isEnabled && config.isVisible;
    this._panelEl.classList.toggle('visible', isVisible);

    if (isVisible && !this._searchStarted) {
      this.startSearch();
    }
  }

  private onDocChanged() {
    this.stopSearch();
    this._currentResult = undefined;
    if (this._panelEl?.classList.contains('visible')) {
      this.startSearch();
    }
  }

  private startSearch() {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc) return;

    ctx.engine.startSearch(ctx.doc, this._contextId);
    this._searchStarted = true;
  }

  private stopSearch() {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc || !this._searchStarted) return;

    if (this._currentResult) {
      ctx.removeDecoration({
        index: 0,
        pageIndex: this._currentResult.pageIndex,
        type: PDF_PAGE_DECORATION_TYPE_SEARCH,
        source: PDF_NAVIGATOR_SOURCE_SEARCH,
        payload: this._currentResult.region,
      });
      this._currentResult = undefined;
    }

    ctx.engine.stopSearch(ctx.doc, this._contextId);
    this._searchStarted = false;
  }

  private searchNext() {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc) return;

    ctx.engine
      .searchNext(ctx.doc, this._contextId, {
        keyword: this._keyword,
        flags: this._flags,
      })
      .wait((result) => {
        this.handleSearchResult(result ?? null);
      }, ignore);
  }

  private searchPrev() {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc) return;

    ctx.engine
      .searchPrev(ctx.doc, this._contextId, {
        keyword: this._keyword,
        flags: this._flags,
      })
      .wait((result) => {
        this.handleSearchResult(result ?? null);
      }, ignore);
  }

  private handleSearchResult(result: SearchResult | null) {
    const ctx = this._ctx;
    if (!ctx) return;

    if (result) {
      // Remove previous highlight
      if (this._currentResult) {
        ctx.removeDecoration({
          index: 0,
          pageIndex: this._currentResult.pageIndex,
          type: PDF_PAGE_DECORATION_TYPE_SEARCH,
          source: PDF_NAVIGATOR_SOURCE_SEARCH,
          payload: this._currentResult.region,
        });
      }

      this._currentResult = result;

      // Add new highlight
      ctx.addDecoration({
        index: 0,
        pageIndex: result.pageIndex,
        type: PDF_PAGE_DECORATION_TYPE_SEARCH,
        source: PDF_NAVIGATOR_SOURCE_SEARCH,
        payload: result.region,
      });

      // Navigate to page
      ctx.gotoPage(
        {
          destination: {
            pageIndex: result.pageIndex,
            zoom: { mode: PdfZoomMode.Unknown },
            view: [],
          },
        },
        PDF_NAVIGATOR_SOURCE_SEARCH,
      );
    }
  }
}

customElements.define('pdf-search', PdfSearchElement);
