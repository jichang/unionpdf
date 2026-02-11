import { ignore, PdfErrorCode, PdfMetadataObject } from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfApplicatinPluginKey } from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__metadata__panel {
  display: none;
}
.pdf__metadata__panel.visible {
  display: block;
}
.pdf__metadata__header {
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
.pdf__metadata {
  padding: 8px;
}
.pdf__metadata table {
  width: 100%;
  border-collapse: collapse;
}
.pdf__metadata td {
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
  font-size: 13px;
}
.pdf__metadata td:first-child {
  font-weight: 500;
  width: 40%;
  color: #555;
}
`;

/**
 * <pdf-metadata> – displays PDF document metadata.
 */
export class PdfMetadataElement extends PdfBaseElement {
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
    this.listen('doc', () => this.loadMetadata());
  }

  private renderShell() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._panelEl = document.createElement('div');
    this._panelEl.className = 'pdf__metadata__panel';

    const header = document.createElement('div');
    header.className = 'pdf__metadata__header';
    header.textContent = this._ctx?.strings.metadata ?? 'Metadata';
    this._panelEl.appendChild(header);

    this._contentEl = document.createElement('div');
    this._contentEl.className = 'pdf__metadata';
    this._panelEl.appendChild(this._contentEl);

    this._shadow.appendChild(this._panelEl);
    this.updateVisibility();
  }

  private updateVisibility() {
    if (!this._panelEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Metadata];
    this._panelEl.classList.toggle(
      'visible',
      config.isEnabled && config.isVisible,
    );
  }

  private loadMetadata() {
    const ctx = this._ctx;
    if (!this._contentEl || !ctx?.engine || !ctx.doc) return;

    this._contentEl.innerHTML = '';

    const task = ctx.engine.getMetadata(ctx.doc);
    task.wait((metadata: PdfMetadataObject) => {
      const strings = ctx.strings;
      const rows: [string, string][] = [
        [strings.title, metadata?.title || '-'],
        [strings.author, metadata?.author || '-'],
        [strings.subject, metadata?.subject || '-'],
        [strings.producer, metadata?.producer || '-'],
        [strings.creator, metadata?.creator || '-'],
        [strings.creationDate, metadata?.creationDate || '-'],
        [strings.modificationDate, metadata?.modificationDate || '-'],
      ];

      const table = document.createElement('table');
      const tbody = document.createElement('tbody');

      for (const [label, value] of rows) {
        const tr = document.createElement('tr');
        const tdLabel = document.createElement('td');
        tdLabel.textContent = label;
        const tdValue = document.createElement('td');
        tdValue.textContent = value;
        tr.appendChild(tdLabel);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
      }

      table.appendChild(tbody);
      this._contentEl!.appendChild(table);
    }, ignore);
  }
}

customElements.define('pdf-metadata', PdfMetadataElement);
