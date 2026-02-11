import {
  PdfPageObject,
  PdfZoomMode,
  Rotation,
  ignore,
  PdfErrorCode,
} from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfApplicatinPluginKey } from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__thumbnails__panel {
  display: none;
}
.pdf__thumbnails__panel.visible {
  display: block;
}
.pdf__thumbnails__header {
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}
.pdf__thumbnails__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 8px;
  overflow: auto;
  max-height: 400px;
}
.pdf__thumbnail {
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
}
.pdf__thumbnail--current {
  border-color: #0078d4;
}
.pdf__thumbnail img {
  max-width: 100%;
  height: auto;
}
.pdf__thumbnail span {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
}
`;

const PDF_NAVIGATOR_SOURCE_THUMBNAILS = 'PdfThumbnails';

/**
 * <pdf-thumbnails> – displays page thumbnails as a panel.
 *
 * Attributes:
 *  - thumbnail-width (number) – width of thumbnails (default 120)
 *  - thumbnail-height (number) – height of thumbnails (default 160)
 *  - columns (number) – grid columns (default 1)
 */
export class PdfThumbnailsElement extends PdfBaseElement {
  private _shadow: ShadowRoot;
  private _panelEl: HTMLDivElement | null = null;
  private _gridEl: HTMLDivElement | null = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  protected onContextReady() {
    this.renderShell();
    this.listen('plugins', () => this.updateVisibility());
    this.listen('doc', () => this.renderThumbnails());
    this.listen('currPageIndex', () => this.updateCurrent());
  }

  private renderShell() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._panelEl = document.createElement('div');
    this._panelEl.className = 'pdf__thumbnails__panel';

    const header = document.createElement('div');
    header.className = 'pdf__thumbnails__header';
    header.textContent = this._ctx?.strings.thumbnails ?? 'Thumbnails';
    this._panelEl.appendChild(header);

    this._gridEl = document.createElement('div');
    this._gridEl.className = 'pdf__thumbnails__grid';
    const cols = parseInt(this.getAttribute('columns') || '1', 10);
    this._gridEl.style.gridTemplateColumns = Array(cols).fill('1fr').join(' ');
    this._panelEl.appendChild(this._gridEl);

    this._shadow.appendChild(this._panelEl);
    this.updateVisibility();
  }

  private updateVisibility() {
    if (!this._panelEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Thumbnails];
    this._panelEl.classList.toggle(
      'visible',
      config.isEnabled && config.isVisible,
    );
  }

  private renderThumbnails() {
    const ctx = this._ctx;
    if (!this._gridEl || !ctx?.doc || !ctx.engine) return;

    this._gridEl.innerHTML = '';

    const scaleFactor = 0.25; // Thumbnail scale
    const rotation = Rotation.Degree0;

    for (const page of ctx.doc.pages) {
      const thumb = document.createElement('div');
      thumb.className = 'pdf__thumbnail';
      thumb.dataset.pageIndex = String(page.index);
      if (page.index === ctx.currPageIndex) {
        thumb.classList.add('pdf__thumbnail--current');
      }

      const label = document.createElement('span');
      label.textContent = String(page.index + 1);
      thumb.appendChild(label);

      thumb.addEventListener('click', () => {
        ctx.gotoPage(
          {
            destination: {
              pageIndex: page.index,
              zoom: { mode: PdfZoomMode.Unknown },
              view: [],
            },
          },
          PDF_NAVIGATOR_SOURCE_THUMBNAILS,
        );
      });

      this._gridEl.appendChild(thumb);

      // Render thumbnail image
      const task = ctx.engine.renderThumbnail(
        ctx.doc,
        page,
        scaleFactor,
        rotation,
        window.devicePixelRatio,
      );
      task.wait((imageData: ImageData) => {
        const img = document.createElement('img');
        img.alt = `page ${page.index + 1}`;
        img.width = page.size.width * scaleFactor;
        img.height = page.size.height * scaleFactor;
        img.src = imageDataToDataUrl(imageData);
        thumb.insertBefore(img, label);
      }, ignore);
    }
  }

  private updateCurrent() {
    if (!this._gridEl || !this._ctx) return;
    const thumbs = this._gridEl.querySelectorAll('.pdf__thumbnail');
    for (const thumb of thumbs) {
      const idx = Number((thumb as HTMLElement).dataset.pageIndex);
      thumb.classList.toggle(
        'pdf__thumbnail--current',
        idx === this._ctx.currPageIndex,
      );
    }
  }
}

function imageDataToDataUrl(imageData: ImageData): string {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const context = canvas.getContext('2d');
  context?.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

customElements.define('pdf-thumbnails', PdfThumbnailsElement);
