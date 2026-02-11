import { ignore, PdfErrorCode } from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfApplicatinPluginKey } from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__downloader__dialog {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}
.pdf__downloader__dialog.visible {
  display: flex;
}
.pdf__downloader__content {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.pdf__downloader__content h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
}
.pdf__downloader__content p {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #555;
}
.pdf__downloader__content a {
  display: inline-block;
  padding: 6px 16px;
  background: #0078d4;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 13px;
}
.pdf__downloader__content a:hover {
  background: #005a9e;
}
.pdf__downloader__close {
  float: right;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 18px;
  color: #999;
}
.pdf__downloader__close:hover {
  color: #333;
}
`;

/**
 * <pdf-downloader> – dialog to download the current PDF file.
 */
export class PdfDownloaderElement extends PdfBaseElement {
  private _shadow: ShadowRoot;
  private _dialogEl: HTMLDivElement | null = null;
  private _linkEl: HTMLAnchorElement | null = null;
  private _blobUrl: string | null = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  protected onContextReady() {
    this.renderShell();
    this.listen('plugins', () => this.updateVisibility());
    this.listen('doc', () => this.prepareDownload());
  }

  disconnectedCallback() {
    this.revokeUrl();
    super.disconnectedCallback();
  }

  private renderShell() {
    const ctx = this._ctx;
    if (!ctx) return;

    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._dialogEl = document.createElement('div');
    this._dialogEl.className = 'pdf__downloader__dialog';

    const content = document.createElement('div');
    content.className = 'pdf__downloader__content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'pdf__downloader__close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => {
      ctx.hidePlugin(PdfApplicatinPluginKey.Downloader);
    });
    content.appendChild(closeBtn);

    const title = document.createElement('h3');
    title.textContent = ctx.strings.saveAs;
    content.appendChild(title);

    const fileName = document.createElement('p');
    fileName.className = 'pdf__downloader__filename';
    content.appendChild(fileName);

    this._linkEl = document.createElement('a');
    this._linkEl.textContent = ctx.strings.download;
    this._linkEl.href = '#';
    content.appendChild(this._linkEl);

    this._dialogEl.appendChild(content);
    this._shadow.appendChild(this._dialogEl);

    // Close on backdrop click
    this._dialogEl.addEventListener('click', (e) => {
      if (e.target === this._dialogEl) {
        ctx.hidePlugin(PdfApplicatinPluginKey.Downloader);
      }
    });

    this.updateVisibility();
  }

  private updateVisibility() {
    if (!this._dialogEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Downloader];
    const isVisible = config.isEnabled && config.isVisible;
    this._dialogEl.classList.toggle('visible', isVisible);

    if (isVisible) {
      this.prepareDownload();
    }
  }

  private prepareDownload() {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc || !this._linkEl) return;

    this.revokeUrl();

    const fileNameEl = this._shadow.querySelector(
      '.pdf__downloader__filename',
    ) as HTMLElement;
    if (fileNameEl) {
      fileNameEl.textContent = ctx.doc.name || '';
    }

    const task = ctx.engine.saveAsCopy(ctx.doc);
    task.wait((buffer: ArrayBuffer) => {
      this._blobUrl = URL.createObjectURL(new Blob([buffer]));
      if (this._linkEl) {
        this._linkEl.href = this._blobUrl;
        this._linkEl.download = ctx.doc?.name || 'document.pdf';
      }
    }, ignore);
  }

  private revokeUrl() {
    if (this._blobUrl) {
      URL.revokeObjectURL(this._blobUrl);
      this._blobUrl = null;
    }
  }
}

customElements.define('pdf-downloader', PdfDownloaderElement);
