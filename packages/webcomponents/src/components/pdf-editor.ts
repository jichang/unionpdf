import { PdfBaseElement } from '../core/base-element';
import {
  PdfApplicatinPluginKey,
  PdfApplicationMode,
} from '../core/application.configuration';

const STYLES = `
:host {
  display: block;
}
.pdf__editor__panel {
  display: none;
}
.pdf__editor__panel.visible {
  display: block;
  padding: 8px;
}
.pdf__editor__toolbar {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
}
.pdf__editor__toolbar button {
  padding: 4px 8px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}
.pdf__editor__toolbar button:hover {
  background: #eee;
}
.pdf__editor__toolbar button.active {
  background: #0078d4;
  color: #fff;
  border-color: #0078d4;
}
.pdf__editor__content {
  min-height: 100px;
}
`;

/**
 * Editor tool types
 */
export enum PdfEditorTool {
  Annotation,
  Stamp,
  Extract,
  FillForm,
}

/**
 * Annotation tool types
 */
export enum PdfAnnotationTool {
  Selection,
  Pencil,
}

/**
 * <pdf-editor> – editor panel with annotation, stamp, and extract tools.
 *
 * Emits events:
 *  - pdf-editor-tool-change: { detail: PdfEditorTool }
 */
export class PdfEditorElement extends PdfBaseElement {
  private _shadow: ShadowRoot;
  private _panelEl: HTMLDivElement | null = null;
  private _currentTool: PdfEditorTool = PdfEditorTool.Annotation;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  protected onContextReady() {
    this.renderShell();
    this.listen('plugins', () => this.updateVisibility());
    this.listen('mode', () => this.updateVisibility());
  }

  private renderShell() {
    const ctx = this._ctx;
    if (!ctx) return;

    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._panelEl = document.createElement('div');
    this._panelEl.className = 'pdf__editor__panel';

    // Editor toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'pdf__editor__toolbar';

    const tools: { tool: PdfEditorTool; label: string }[] = [
      { tool: PdfEditorTool.Annotation, label: ctx.strings.annotation },
      { tool: PdfEditorTool.Stamp, label: ctx.strings.stamps },
      { tool: PdfEditorTool.Extract, label: ctx.strings.extract },
      { tool: PdfEditorTool.FillForm, label: ctx.strings.fillForm },
    ];

    for (const { tool, label } of tools) {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.dataset.tool = String(tool);
      if (tool === this._currentTool) btn.classList.add('active');

      btn.addEventListener('click', () => {
        this._currentTool = tool;
        this.updateToolbarActive(toolbar);
        this.dispatchEvent(
          new CustomEvent('pdf-editor-tool-change', {
            detail: tool,
            bubbles: true,
          }),
        );
      });

      toolbar.appendChild(btn);
    }

    this._panelEl.appendChild(toolbar);

    // Content area
    const content = document.createElement('div');
    content.className = 'pdf__editor__content';
    this._panelEl.appendChild(content);

    this._shadow.appendChild(this._panelEl);
    this.updateVisibility();
  }

  private updateToolbarActive(toolbar: HTMLDivElement) {
    const buttons = toolbar.querySelectorAll('button');
    for (const btn of buttons) {
      const tool = Number((btn as HTMLElement).dataset.tool);
      btn.classList.toggle('active', tool === this._currentTool);
    }
  }

  private updateVisibility() {
    if (!this._panelEl || !this._ctx) return;
    const config = this._ctx.plugins[PdfApplicatinPluginKey.Editor];
    const isVisible =
      config.isEnabled &&
      config.isVisible &&
      this._ctx.mode === PdfApplicationMode.Edit;
    this._panelEl.classList.toggle('visible', isVisible);
  }
}

customElements.define('pdf-editor', PdfEditorElement);
