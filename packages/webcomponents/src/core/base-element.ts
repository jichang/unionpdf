import { PdfApplicationContext } from './context';

/**
 * Base class for all PDF web components.
 * Provides access to the shared PdfApplicationContext by traversing
 * the DOM tree to find the nearest <pdf-application> ancestor.
 */
export class PdfBaseElement extends HTMLElement {
  protected _ctx: PdfApplicationContext | null = null;
  private _subscriptions: Array<{ key: string; cb: () => void }> = [];

  /**
   * Get the application context by walking up the DOM tree.
   */
  get ctx(): PdfApplicationContext | null {
    return this._ctx;
  }

  connectedCallback() {
    this._ctx = this.resolveContext();
    this.onContextReady();
  }

  disconnectedCallback() {
    this.cleanupSubscriptions();
    this._ctx = null;
  }

  /**
   * Find the nearest <pdf-application> element and return its context.
   */
  protected resolveContext(): PdfApplicationContext | null {
    let el: HTMLElement | null = this.parentElement;
    while (el) {
      if ((el as any).__pdfContext) {
        return (el as any).__pdfContext as PdfApplicationContext;
      }
      // Also check shadow host
      if (!el.parentElement && el.getRootNode() instanceof ShadowRoot) {
        el = ((el.getRootNode() as ShadowRoot).host as HTMLElement) || null;
      } else {
        el = el.parentElement;
      }
    }
    return null;
  }

  /**
   * Called once context is resolved. Override in subclasses to set up
   * subscriptions and initial render.
   */
  protected onContextReady() {
    // Subclasses override
  }

  /**
   * Subscribe to a context key change. Subscriptions are automatically
   * cleaned up on disconnect.
   */
  protected listen(key: string, cb: () => void) {
    if (this._ctx) {
      this._ctx.subscribe(key, cb);
      this._subscriptions.push({ key, cb });
    }
  }

  private cleanupSubscriptions() {
    if (this._ctx) {
      for (const sub of this._subscriptions) {
        this._ctx.unsubscribe(sub.key, sub.cb);
      }
    }
    this._subscriptions = [];
  }

  /**
   * Utility to create an element with optional classes and text.
   */
  protected createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    opts?: {
      className?: string;
      textContent?: string;
      attrs?: Record<string, string>;
    },
  ): HTMLElementTagNameMap[K] {
    const el = document.createElement(tag);
    if (opts?.className) el.className = opts.className;
    if (opts?.textContent) el.textContent = opts.textContent;
    if (opts?.attrs) {
      for (const [k, v] of Object.entries(opts.attrs)) {
        el.setAttribute(k, v);
      }
    }
    return el;
  }
}
