import { PdfBaseElement } from '../core/base-element';
import {
  PdfApplicatinPluginKey,
  PdfApplicationMode,
} from '../core/application.configuration';
import { PdfZoomMode, Rotation } from '@unionpdf/models';

const STYLES = `
:host {
  display: block;
}
.pdf__toolbar {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;
  border-bottom: 1px solid #ddd;
  background: #f8f8f8;
  flex-wrap: wrap;
}
.pdf__toolbar__item__group {
  display: flex;
  align-items: center;
  gap: 4px;
}
.pdf__toolbar__item__group--left {
  flex: 1;
}
.pdf__toolbar__item__group--center {
  flex: 0 0 auto;
}
.pdf__toolbar__item__group--right {
  flex: 1;
  justify-content: flex-end;
}
button {
  cursor: pointer;
  padding: 4px 8px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  font-size: 12px;
}
button:hover {
  background: #eee;
}
button.active {
  background: #ddd;
}
select, input {
  padding: 3px 6px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
}
input[type="number"] {
  width: 60px;
}
`;

const PDF_NAVIGATOR_SOURCE_TOOLBAR = 'PdfToolbarPagesItemGroup';

/**
 * <pdf-toolbar> – toolbar with plugin toggles, page navigation, and file actions.
 */
export class PdfToolbarElement extends PdfBaseElement {
  private _shadow: ShadowRoot;
  private _toolbarEl: HTMLDivElement | null = null;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  protected onContextReady() {
    this.render();
    this.listen('plugins', () => this.updateButtons());
    this.listen('mode', () => this.render());
    this.listen('doc', () => this.updateNavigation());
    this.listen('currPageIndex', () => this.updateNavigation());
    this.listen('scaleFactor', () => this.updateNavigation());
    this.listen('rotation', () => this.updateNavigation());
  }

  private render() {
    const ctx = this._ctx;
    if (!ctx) return;

    this._shadow.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    const toolbar = document.createElement('div');
    toolbar.className = 'pdf__toolbar';
    this._toolbarEl = toolbar;

    if (ctx.mode === PdfApplicationMode.View) {
      // Plugin toggle group (left)
      const pluginGroup = document.createElement('div');
      pluginGroup.className =
        'pdf__toolbar__item__group pdf__toolbar__item__group--left';
      this.addPluginButton(
        pluginGroup,
        PdfApplicatinPluginKey.Metadata,
        ctx.strings.metadata,
      );
      this.addPluginButton(
        pluginGroup,
        PdfApplicatinPluginKey.Bookmarks,
        ctx.strings.bookmarks,
      );
      this.addPluginButton(
        pluginGroup,
        PdfApplicatinPluginKey.Thumbnails,
        ctx.strings.thumbnails,
      );
      this.addPluginButton(
        pluginGroup,
        PdfApplicatinPluginKey.Attachments,
        ctx.strings.attchments,
      );
      this.addPluginButton(
        pluginGroup,
        PdfApplicatinPluginKey.Signatures,
        ctx.strings.signatures,
      );
      this.addPluginButton(
        pluginGroup,
        PdfApplicatinPluginKey.Search,
        ctx.strings.search,
      );
      toolbar.appendChild(pluginGroup);
    } else {
      // Editor operation group (left)
      const editorGroup = document.createElement('div');
      editorGroup.className =
        'pdf__toolbar__item__group pdf__toolbar__item__group--left';

      const exitBtn = document.createElement('button');
      exitBtn.textContent = ctx.strings.exit;
      exitBtn.addEventListener('click', () => {
        ctx.hidePlugin(PdfApplicatinPluginKey.Editor);
      });
      editorGroup.appendChild(exitBtn);

      toolbar.appendChild(editorGroup);
    }

    // Page navigation group (center)
    const navGroup = document.createElement('div');
    navGroup.className =
      'pdf__toolbar__item__group pdf__toolbar__item__group--center';

    // Rotation select
    const rotationSelect = document.createElement('select');
    rotationSelect.className = 'pdf__toolbar__rotation';
    const rotationOptions = [
      { label: ctx.strings.rotate0Deg, value: '0' },
      { label: ctx.strings.rotate90Deg, value: '1' },
      { label: ctx.strings.rotate180Deg, value: '2' },
      { label: ctx.strings.rotate270Deg, value: '3' },
    ];
    for (const opt of rotationOptions) {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      rotationSelect.appendChild(option);
    }
    rotationSelect.value = String(ctx.rotation);
    rotationSelect.addEventListener('change', () => {
      ctx.setRotation(parseInt(rotationSelect.value, 10) as Rotation);
    });
    navGroup.appendChild(rotationSelect);

    // Scale factor input
    const scaleInput = document.createElement('input');
    scaleInput.type = 'number';
    scaleInput.className = 'pdf__toolbar__scalefactor';
    scaleInput.min = '0.25';
    scaleInput.max = '5';
    scaleInput.step = '0.25';
    scaleInput.value = String(ctx.scaleFactor);
    scaleInput.addEventListener('change', () => {
      ctx.setScaleFactor(Number(scaleInput.value));
    });
    navGroup.appendChild(scaleInput);

    // Page number input
    const pageInput = document.createElement('input');
    pageInput.type = 'number';
    pageInput.className = 'pdf__toolbar__page';
    pageInput.min = '1';
    pageInput.max = String(ctx.doc?.pageCount ?? 1);
    pageInput.value = String(ctx.currPageIndex + 1);
    pageInput.addEventListener('change', () => {
      const pageIndex = parseInt(pageInput.value, 10) - 1;
      if (!isNaN(pageIndex)) {
        ctx.gotoPage(
          {
            destination: {
              pageIndex,
              zoom: { mode: PdfZoomMode.Unknown },
              view: [],
            },
          },
          PDF_NAVIGATOR_SOURCE_TOOLBAR,
        );
      }
    });
    navGroup.appendChild(pageInput);

    toolbar.appendChild(navGroup);

    if (ctx.mode === PdfApplicationMode.View) {
      // File actions group (right)
      const fileGroup = document.createElement('div');
      fileGroup.className =
        'pdf__toolbar__item__group pdf__toolbar__item__group--right';
      this.addPluginButton(
        fileGroup,
        PdfApplicatinPluginKey.Editor,
        ctx.strings.edit,
      );
      this.addPluginButton(
        fileGroup,
        PdfApplicatinPluginKey.Downloader,
        ctx.strings.saveAs,
      );
      this.addPluginButton(
        fileGroup,
        PdfApplicatinPluginKey.Printer,
        ctx.strings.print,
      );
      toolbar.appendChild(fileGroup);
    }

    this._shadow.appendChild(toolbar);
  }

  private addPluginButton(
    container: HTMLElement,
    key: PdfApplicatinPluginKey,
    label: string,
  ) {
    const ctx = this._ctx;
    if (!ctx) return;

    const config = ctx.plugins[key];
    if (!config.isEnabled) return;

    const btn = document.createElement('button');
    btn.textContent = label;
    btn.dataset.pluginKey = String(key);
    if (config.isVisible) btn.classList.add('active');

    btn.addEventListener('click', () => {
      ctx.togglePlugin(key);
    });

    container.appendChild(btn);
  }

  private updateButtons() {
    if (!this._toolbarEl || !this._ctx) return;
    const buttons = this._toolbarEl.querySelectorAll('button[data-plugin-key]');
    for (const btn of buttons) {
      const key = Number(
        (btn as HTMLElement).dataset.pluginKey,
      ) as PdfApplicatinPluginKey;
      const config = this._ctx.plugins[key];
      (btn as HTMLElement).classList.toggle(
        'active',
        config?.isVisible ?? false,
      );
    }
  }

  private updateNavigation() {
    if (!this._toolbarEl || !this._ctx) return;

    const pageInput = this._toolbarEl.querySelector(
      '.pdf__toolbar__page',
    ) as HTMLInputElement;
    if (pageInput) {
      pageInput.value = String(this._ctx.currPageIndex + 1);
      pageInput.max = String(this._ctx.doc?.pageCount ?? 1);
    }

    const scaleInput = this._toolbarEl.querySelector(
      '.pdf__toolbar__scalefactor',
    ) as HTMLInputElement;
    if (scaleInput) {
      scaleInput.value = String(this._ctx.scaleFactor);
    }

    const rotationSelect = this._toolbarEl.querySelector(
      '.pdf__toolbar__rotation',
    ) as HTMLSelectElement;
    if (rotationSelect) {
      rotationSelect.value = String(this._ctx.rotation);
    }
  }
}

customElements.define('pdf-toolbar', PdfToolbarElement);
