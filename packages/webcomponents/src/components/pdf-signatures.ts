import { ignore, PdfErrorCode, PdfSignatureObject } from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfApplicatinPluginKey } from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__signatures__panel {
  display: none;
}
.pdf__signatures__panel.visible {
  display: block;
}
.pdf__signatures__header {
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
.pdf__signatures {
  padding: 8px;
}
.pdf__signatures table {
  width: 100%;
  border-collapse: collapse;
}
.pdf__signatures td {
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
  font-size: 13px;
}
`;

/**
 * <pdf-signatures> – displays PDF signatures.
 */
export class PdfSignaturesElement extends PdfBaseElement {
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
    this.listen('doc', () => this.loadSignatures());
  }

  private renderShell() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._panelEl = document.createElement('div');
    this._panelEl.className = 'pdf__signatures__panel';

    const header = document.createElement('div');
    header.className = 'pdf__signatures__header';
    header.textContent = this._ctx?.strings.signatures ?? 'Signatures';
    this._panelEl.appendChild(header);

    this._contentEl = document.createElement('div');
    this._contentEl.className = 'pdf__signatures';
    this._panelEl.appendChild(this._contentEl);

    this._shadow.appendChild(this._panelEl);
    this.updateVisibility();
  }

  private updateVisibility() {
    if (!this._panelEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Signatures];
    this._panelEl.classList.toggle(
      'visible',
      config.isEnabled && config.isVisible,
    );
  }

  private loadSignatures() {
    const ctx = this._ctx;
    if (!this._contentEl || !ctx?.engine || !ctx.doc) return;

    this._contentEl.innerHTML = '';

    const task = ctx.engine.getSignatures(ctx.doc);
    task.wait((signatures: PdfSignatureObject[]) => {
      const strings = ctx.strings;
      const table = document.createElement('table');
      const tbody = document.createElement('tbody');

      if (signatures.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 3;
        td.textContent = strings.noSignatures;
        tr.appendChild(td);
        tbody.appendChild(tr);
      } else {
        for (const sig of signatures) {
          const tr = document.createElement('tr');

          const tdReason = document.createElement('td');
          tdReason.textContent = sig.reason || '-';
          tr.appendChild(tdReason);

          const tdTime = document.createElement('td');
          tdTime.textContent = sig.time || '-';
          tr.appendChild(tdTime);

          const tdDocMDP = document.createElement('td');
          tdDocMDP.textContent = String(sig.docMDP ?? '-');
          tr.appendChild(tdDocMDP);

          tbody.appendChild(tr);
        }
      }

      table.appendChild(tbody);
      this._contentEl!.appendChild(table);

      // Fire event for external consumers
      this.dispatchEvent(
        new CustomEvent('pdf-signatures-loaded', {
          detail: signatures,
          bubbles: true,
        }),
      );
    }, ignore);
  }
}

customElements.define('pdf-signatures', PdfSignaturesElement);
