import { ignore, PdfErrorCode } from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfApplicatinPluginKey } from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__printer__dialog {
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
.pdf__printer__dialog.visible {
  display: flex;
}
.pdf__printer__content {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
}
.pdf__printer__content p {
  margin: 0 0 16px 0;
  font-size: 14px;
}
.pdf__printer__content button {
  padding: 6px 16px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
.pdf__printer__content button:hover {
  background: #eee;
}
`;

/**
 * Printing method
 */
export enum PrinterMethod {
  Iframe,
}

/**
 * <pdf-printer> – dialog to print the current PDF.
 *
 * Attributes:
 *  - method: "iframe" (default)
 */
export class PdfPrinterElement extends PdfBaseElement {
  private _shadow: ShadowRoot;
  private _dialogEl: HTMLDivElement | null = null;
  private _iframeElem: HTMLIFrameElement | null = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  protected onContextReady() {
    this.renderShell();
    this.listen('plugins', () => this.updateVisibility());
  }

  disconnectedCallback() {
    this.cleanupIframe();
    super.disconnectedCallback();
  }

  private renderShell() {
    const ctx = this._ctx;
    if (!ctx) return;

    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._dialogEl = document.createElement('div');
    this._dialogEl.className = 'pdf__printer__dialog';

    const content = document.createElement('div');
    content.className = 'pdf__printer__content';

    const message = document.createElement('p');
    message.className = 'pdf__printer__message';
    message.textContent = `${ctx.strings.printing}: ${ctx.doc?.name || ''}`;
    content.appendChild(message);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = ctx.strings.cancel;
    cancelBtn.addEventListener('click', () => {
      ctx.hidePlugin(PdfApplicatinPluginKey.Printer);
    });
    content.appendChild(cancelBtn);

    this._dialogEl.appendChild(content);
    this._shadow.appendChild(this._dialogEl);

    // Close on backdrop
    this._dialogEl.addEventListener('click', (e) => {
      if (e.target === this._dialogEl) {
        ctx.hidePlugin(PdfApplicatinPluginKey.Printer);
      }
    });

    this.updateVisibility();
  }

  private updateVisibility() {
    if (!this._dialogEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Printer];
    const isVisible = config.isEnabled && config.isVisible;
    this._dialogEl.classList.toggle('visible', isVisible);

    if (isVisible) {
      this.doPrint();
    } else {
      this.cleanupIframe();
    }
  }

  private doPrint() {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc) return;

    // Update message
    const message = this._shadow.querySelector(
      '.pdf__printer__message',
    ) as HTMLElement;
    if (message) {
      message.textContent = `${ctx.strings.printing}: ${ctx.doc.name || ''}`;
    }

    const task = ctx.engine.saveAsCopy(ctx.doc);
    task.wait((buffer: ArrayBuffer) => {
      const url = URL.createObjectURL(
        new Blob([buffer], { type: 'application/pdf' }),
      );

      this.cleanupIframe();

      this._iframeElem = document.createElement('iframe');
      this._iframeElem.style.display = 'none';
      this._iframeElem.src = url;
      document.body.appendChild(this._iframeElem);

      this._iframeElem.addEventListener('load', () => {
        this._iframeElem?.contentWindow?.focus();
        this._iframeElem?.contentWindow?.print();
      });
    }, ignore);
  }

  private cleanupIframe() {
    if (this._iframeElem) {
      document.body.removeChild(this._iframeElem);
      this._iframeElem = null;
    }
  }
}

customElements.define('pdf-printer', PdfPrinterElement);
