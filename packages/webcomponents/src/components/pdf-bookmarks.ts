import {
  PdfBookmarksObject,
  PdfBookmarkObject,
  PdfActionType,
  ignore,
  PdfErrorCode,
} from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfApplicatinPluginKey } from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__bookmarks__panel {
  display: none;
}
.pdf__bookmarks__panel.visible {
  display: block;
}
.pdf__bookmarks__header {
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
.pdf__bookmarks {
  padding: 8px;
  overflow: auto;
  max-height: 400px;
}
.pdf__bookmarks ol {
  list-style: none;
  padding-left: 1rem;
  margin: 0;
}
.pdf__bookmarks__entry {
  padding: 2px 0;
  cursor: pointer;
}
.pdf__bookmarks__entry--current > .pdf__bookmarks__entry__header > .title {
  font-weight: bold;
  color: #0078d4;
}
.pdf__bookmarks__entry__header {
  display: flex;
  align-items: center;
  gap: 4px;
}
.pdf__bookmarks__entry__header .toggle {
  cursor: pointer;
  user-select: none;
  width: 16px;
  text-align: center;
  font-size: 10px;
}
.pdf__bookmarks__entry__header .title {
  cursor: pointer;
}
.pdf__bookmarks__entry__header .title:hover {
  text-decoration: underline;
}
`;

const PDF_NAVIGATOR_SOURCE_BOOKMARKS = 'PdfBookmarks';

/**
 * <pdf-bookmarks> – displays the document bookmark tree as a panel.
 */
export class PdfBookmarksElement extends PdfBaseElement {
  private _shadow: ShadowRoot;
  private _panelEl: HTMLDivElement | null = null;
  private _contentEl: HTMLDivElement | null = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  protected onContextReady() {
    this.renderShell();
    this.listen('plugins', () => this.updateVisibility());
    this.listen('doc', () => this.loadBookmarks());
    this.listen('currPageIndex', () => this.updateCurrent());
  }

  private renderShell() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._panelEl = document.createElement('div');
    this._panelEl.className = 'pdf__bookmarks__panel';

    const header = document.createElement('div');
    header.className = 'pdf__bookmarks__header';
    header.textContent = this._ctx?.strings.bookmarks ?? 'Bookmarks';
    this._panelEl.appendChild(header);

    this._contentEl = document.createElement('div');
    this._contentEl.className = 'pdf__bookmarks';
    this._panelEl.appendChild(this._contentEl);

    this._shadow.appendChild(this._panelEl);
    this.updateVisibility();
  }

  private updateVisibility() {
    if (!this._panelEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Bookmarks];
    this._panelEl.classList.toggle(
      'visible',
      config.isEnabled && config.isVisible,
    );
  }

  private loadBookmarks() {
    const ctx = this._ctx;
    if (!this._contentEl || !ctx?.engine || !ctx.doc) return;

    this._contentEl.innerHTML = '';

    const task = ctx.engine.getBookmarks(ctx.doc);
    task.wait((bookmarks: PdfBookmarksObject) => {
      if (bookmarks.bookmarks.length === 0) {
        const p = document.createElement('p');
        p.textContent = ctx.strings.noBookmarks;
        this._contentEl!.appendChild(p);
      } else {
        const ol = document.createElement('ol');
        for (const bookmark of bookmarks.bookmarks) {
          ol.appendChild(this.createBookmarkEntry(bookmark));
        }
        this._contentEl!.appendChild(ol);
      }
    }, ignore);
  }

  private createBookmarkEntry(bookmark: PdfBookmarkObject): HTMLLIElement {
    const ctx = this._ctx!;
    const li = document.createElement('li');
    li.className = 'pdf__bookmarks__entry';

    const header = document.createElement('div');
    header.className = 'pdf__bookmarks__entry__header';

    const toggle = document.createElement('span');
    toggle.className = 'toggle';
    const hasChildren = bookmark.children && bookmark.children.length > 0;
    toggle.textContent = hasChildren ? '▶' : '';

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = bookmark.title;

    title.addEventListener('click', () => {
      this.navigateToBookmark(bookmark);
    });

    header.appendChild(toggle);
    header.appendChild(title);
    li.appendChild(header);

    // Mark current
    this.updateBookmarkCurrent(li, bookmark);

    if (hasChildren) {
      let isUnfold = false;
      const childList = document.createElement('ol');
      childList.style.display = 'none';
      for (const child of bookmark.children!) {
        childList.appendChild(this.createBookmarkEntry(child));
      }
      li.appendChild(childList);

      toggle.addEventListener('click', () => {
        isUnfold = !isUnfold;
        toggle.textContent = isUnfold ? '▼' : '▶';
        childList.style.display = isUnfold ? 'block' : 'none';
      });
    }

    return li;
  }

  private updateBookmarkCurrent(
    li: HTMLLIElement,
    bookmark: PdfBookmarkObject,
  ) {
    const ctx = this._ctx;
    if (!ctx) return;

    let isCurrent = false;
    if (bookmark.target) {
      switch (bookmark.target.type) {
        case 'destination':
          isCurrent =
            ctx.currPageIndex === bookmark.target.destination.pageIndex;
          break;
        case 'action':
          if (bookmark.target.action.type === PdfActionType.Goto) {
            isCurrent =
              bookmark.target.action.destination.pageIndex ===
              ctx.currPageIndex;
          }
          break;
      }
    }
    li.classList.toggle('pdf__bookmarks__entry--current', isCurrent);
  }

  private navigateToBookmark(bookmark: PdfBookmarkObject) {
    const ctx = this._ctx;
    if (!ctx || !bookmark.target) return;

    switch (bookmark.target.type) {
      case 'action':
        if (bookmark.target.action.type === PdfActionType.Goto) {
          ctx.gotoPage(
            { destination: bookmark.target.action.destination },
            PDF_NAVIGATOR_SOURCE_BOOKMARKS,
          );
        }
        break;
      case 'destination':
        ctx.gotoPage(
          { destination: bookmark.target.destination },
          PDF_NAVIGATOR_SOURCE_BOOKMARKS,
        );
        break;
    }
  }

  private updateCurrent() {
    // Re-render to update current highlights
    this.loadBookmarks();
  }
}

customElements.define('pdf-bookmarks', PdfBookmarksElement);
