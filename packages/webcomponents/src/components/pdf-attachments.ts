import { ignore, PdfAttachmentObject, PdfErrorCode } from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfApplicatinPluginKey } from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__attachments__panel {
  display: none;
}
.pdf__attachments__panel.visible {
  display: block;
}
.pdf__attachments__header {
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
.pdf__attachments {
  padding: 8px;
}
.pdf__attachments table {
  width: 100%;
  border-collapse: collapse;
}
.pdf__attachments th,
.pdf__attachments td {
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
  font-size: 13px;
  text-align: left;
}
.pdf__attachments button {
  padding: 2px 8px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}
.pdf__attachments button:hover {
  background: #eee;
}
`;

/**
 * <pdf-attachments> – lists PDF attachments with download buttons.
 */
export class PdfAttachmentsElement extends PdfBaseElement {
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
    this.listen('doc', () => this.loadAttachments());
  }

  private renderShell() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._panelEl = document.createElement('div');
    this._panelEl.className = 'pdf__attachments__panel';

    const header = document.createElement('div');
    header.className = 'pdf__attachments__header';
    header.textContent = this._ctx?.strings.attchments ?? 'Attachments';
    this._panelEl.appendChild(header);

    this._contentEl = document.createElement('div');
    this._contentEl.className = 'pdf__attachments';
    this._panelEl.appendChild(this._contentEl);

    this._shadow.appendChild(this._panelEl);
    this.updateVisibility();
  }

  private updateVisibility() {
    if (!this._panelEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Attachments];
    this._panelEl.classList.toggle(
      'visible',
      config.isEnabled && config.isVisible,
    );
  }

  private loadAttachments() {
    const ctx = this._ctx;
    if (!this._contentEl || !ctx?.engine || !ctx.doc) return;

    this._contentEl.innerHTML = '';

    const task = ctx.engine.getAttachments(ctx.doc);
    task.wait((attachments: PdfAttachmentObject[]) => {
      const strings = ctx.strings;
      const table = document.createElement('table');

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      for (const label of [strings.fileName, strings.fileCreationDate, '']) {
        const th = document.createElement('th');
        th.textContent = label;
        headerRow.appendChild(th);
      }
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      if (attachments.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 3;
        td.textContent = strings.noAttachments;
        tr.appendChild(td);
        tbody.appendChild(tr);
      } else {
        for (const attachment of attachments) {
          const tr = document.createElement('tr');

          const tdName = document.createElement('td');
          tdName.textContent = attachment.name;
          tr.appendChild(tdName);

          const tdDate = document.createElement('td');
          tdDate.textContent = attachment.creationDate || '-';
          tr.appendChild(tdDate);

          const tdAction = document.createElement('td');
          const downloadBtn = document.createElement('button');
          downloadBtn.textContent = strings.download;
          downloadBtn.addEventListener('click', () => {
            if (ctx.engine && ctx.doc) {
              ctx.engine
                .readAttachmentContent(ctx.doc, attachment)
                .wait((buffer: ArrayBuffer) => {
                  const url = URL.createObjectURL(new Blob([buffer]));
                  const linkElem = document.createElement('a');
                  linkElem.download = attachment.name;
                  linkElem.href = url;
                  linkElem.click();
                  URL.revokeObjectURL(url);
                }, ignore);
            }
          });
          tdAction.appendChild(downloadBtn);
          tr.appendChild(tdAction);

          tbody.appendChild(tr);
        }
      }
      table.appendChild(tbody);
      this._contentEl!.appendChild(table);
    }, ignore);
  }
}

customElements.define('pdf-attachments', PdfAttachmentsElement);
