import {
  PdfPageObject,
  PdfZoomMode,
  Rotation,
  transformSize,
  transformPosition,
  transformRect,
  ignore,
  PdfErrorCode,
} from '@unionpdf/models';
import { PdfBaseElement } from '../core/base-element';
import { PdfNavigatorEvent } from '../core/context';

const STYLES = `
:host {
  display: block;
  overflow: auto;
  position: relative;
  flex: 1;
}
.pdf__pages__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pdf__page {
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
.pdf__page--current {
  /* styling hook */
}
.pdf__page__content {
  position: relative;
  overflow: hidden;
}
.pdf__page__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.pdf__page__layer--canvas canvas {
  width: 100%;
  height: 100%;
}
.pdf__page__layer--text {
  color: transparent;
  pointer-events: auto;
}
.pdf__page__layer--text ::selection {
  background: rgba(0, 0, 255, 0.3);
}
.pdf__text__rect {
  position: absolute;
  white-space: pre;
  transform-origin: left top;
}
.pdf__page__layer--annotations {
  pointer-events: none;
}
.pdf__page__layer--decorations {
  pointer-events: none;
}
.pdf__decoration__rect--highlight {
  background: rgba(255, 255, 0, 0.3);
}
`;

const PDF_NAVIGATOR_SOURCE_PAGES = 'PdfPages';
const PDF_PAGE_DEFAULT_GAP = 8;

interface PageInfo extends PdfPageObject {
  offset: number;
}

/**
 * <pdf-pages> – renders all pages of the current PDF document.
 *
 * Attributes:
 *  - page-gap (number) – gap between pages in px (default 8)
 *  - prerender-range (string) – comma-separated [before, after] (default "0,0")
 *  - cache-range (string) – comma-separated [before, after] (default "0,0")
 *  - layers (string) – comma-separated layer names: canvas,text,annotations,decorations
 */
export class PdfPagesElement extends PdfBaseElement {
  static get observedAttributes() {
    return ['page-gap', 'prerender-range', 'cache-range', 'layers'];
  }

  private _shadow: ShadowRoot;
  private _container: HTMLDivElement | null = null;
  private _pages: PageInfo[] = [];
  private _observer: IntersectionObserver | null = null;
  private _visibleEntryIds: Set<number> = new Set();
  private _pageElements: Map<number, HTMLDivElement> = new Map();
  private _navigatorHandler:
    | ((evt: PdfNavigatorEvent, source: string) => void)
    | null = null;

  // Parsed attributes
  private get pageGap(): number {
    return (
      parseInt(this.getAttribute('page-gap') || '', 10) || PDF_PAGE_DEFAULT_GAP
    );
  }

  private get prerenderRange(): [number, number] {
    const val = this.getAttribute('prerender-range') || '0,0';
    const parts = val.split(',').map(Number);
    return [parts[0] || 0, parts[1] || 0];
  }

  private get cacheRange(): [number, number] {
    const val = this.getAttribute('cache-range') || '0,0';
    const parts = val.split(',').map(Number);
    return [parts[0] || 0, parts[1] || 0];
  }

  private get layerNames(): string[] {
    const val =
      this.getAttribute('layers') || 'canvas,text,annotations,decorations';
    return val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  protected onContextReady() {
    this.renderShell();
    this.listen('doc', () => this.onDocChanged());
    this.listen('scaleFactor', () => this.rebuildPages());
    this.listen('rotation', () => this.rebuildPages());
    this.listen('mode', () => this.rebuildPages());
    this.listen('version', () => this.rebuildPages());
    this.listen('decorations', () => this.updateDecorations());

    // Navigator listener
    this._navigatorHandler = (evt, source) => {
      if (evt.kind === 'GotoPage' && source === PDF_NAVIGATOR_SOURCE_PAGES)
        return;
      this.scrollToPage(evt.data.destination.pageIndex, evt.data.destination);
    };
    this._ctx?.addNavigatorListener(
      PDF_NAVIGATOR_SOURCE_PAGES,
      this._navigatorHandler,
    );

    if (this._ctx?.doc) {
      this.onDocChanged();
    }
  }

  disconnectedCallback() {
    if (this._navigatorHandler) {
      this._ctx?.removeNavigatorListener(
        PDF_NAVIGATOR_SOURCE_PAGES,
        this._navigatorHandler,
      );
    }
    this._observer?.disconnect();
    super.disconnectedCallback();
  }

  private renderShell() {
    const style = document.createElement('style');
    style.textContent = STYLES;
    this._shadow.appendChild(style);

    this._container = document.createElement('div');
    this._container.className = 'pdf__pages__container';
    this._container.style.paddingTop = `${this.pageGap / 2}px`;
    this._container.style.paddingBottom = `${this.pageGap / 2}px`;
    this._shadow.appendChild(this._container);
  }

  private onDocChanged() {
    this.buildPageInfos();
    this.rebuildPages();
  }

  private buildPageInfos() {
    const ctx = this._ctx;
    if (!ctx?.doc) {
      this._pages = [];
      return;
    }

    const rotation = ctx.rotation;
    let offset = 0;
    this._pages = ctx.doc.pages.map((page) => {
      const height = rotation % 2 === 0 ? page.size.height : page.size.width;
      const info: PageInfo = { ...page, offset };
      offset += height;
      return info;
    });
  }

  private rebuildPages() {
    const ctx = this._ctx;
    if (!this._container || !ctx) return;

    // Disconnect old observer
    this._observer?.disconnect();
    this._visibleEntryIds.clear();
    this._pageElements.clear();

    // Clear container
    this._container.innerHTML = '';

    if (!ctx.doc || this._pages.length === 0) return;

    const scaleFactor = ctx.scaleFactor;
    const rotation = ctx.rotation;
    const pageGap = this.pageGap;

    // Create intersection observer
    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLDivElement;
          const pageIndex = Number(target.dataset.pageIndex);
          if (entry.isIntersecting) {
            this._visibleEntryIds.add(pageIndex);
          } else {
            this._visibleEntryIds.delete(pageIndex);
          }
        }
        this.updateVisibility();
        this.updateCurrentPage();
      },
      { root: this._shadow.host as Element },
    );

    // Create page elements
    for (const page of this._pages) {
      const visualSize = transformSize(page.size, rotation, scaleFactor);

      const pageWrapper = document.createElement('div');
      pageWrapper.className = 'pdf__page';
      pageWrapper.dataset.pageIndex = String(page.index);
      pageWrapper.style.paddingTop = `${pageGap / 2}px`;
      pageWrapper.style.paddingBottom = `${pageGap / 2}px`;

      const content = document.createElement('div');
      content.className = 'pdf__page__content';
      content.tabIndex = 0;
      content.style.width = `${visualSize.width}px`;
      content.style.height = `${visualSize.height}px`;

      pageWrapper.appendChild(content);
      this._container.appendChild(pageWrapper);
      this._pageElements.set(page.index, pageWrapper);
      this._observer.observe(pageWrapper);
    }
  }

  private updateCurrentPage() {
    if (!this._ctx || this._visibleEntryIds.size === 0) return;

    const sorted = [...this._visibleEntryIds].sort((a, b) => a - b);
    const minPageIndex = sorted[0];

    this._ctx.gotoPage(
      {
        destination: {
          pageIndex: minPageIndex,
          zoom: { mode: PdfZoomMode.Unknown },
          view: [],
        },
      },
      PDF_NAVIGATOR_SOURCE_PAGES,
    );

    // Update current class
    for (const [idx, el] of this._pageElements) {
      el.classList.toggle('pdf__page--current', idx === minPageIndex);
    }
  }

  private updateVisibility() {
    if (!this._ctx) return;

    const sorted = [...this._visibleEntryIds].sort((a, b) => a - b);
    const minIdx = sorted[0] ?? 0;
    const maxIdx = sorted[sorted.length - 1] ?? 0;
    const [preBefore, preAfter] = this.prerenderRange;
    const [cacheBefore, cacheAfter] = this.cacheRange;

    for (const page of this._pages) {
      const isVisible = this._visibleEntryIds.has(page.index);
      const inVisibleRange =
        page.index >= minIdx + preBefore && page.index <= maxIdx + preAfter;
      const inCacheRange =
        page.index >= minIdx + cacheBefore && page.index <= maxIdx + cacheAfter;

      const wrapper = this._pageElements.get(page.index);
      if (!wrapper) continue;
      const content = wrapper.querySelector(
        '.pdf__page__content',
      ) as HTMLDivElement;
      if (!content) continue;

      if (inVisibleRange || isVisible) {
        this.renderPageLayers(
          content,
          page,
          isVisible,
          inVisibleRange,
          inCacheRange,
        );
      } else if (!inCacheRange) {
        content.innerHTML = '';
        delete content.dataset.rendered;
      }
    }
  }

  private renderPageLayers(
    container: HTMLDivElement,
    page: PageInfo,
    isVisible: boolean,
    inVisibleRange: boolean,
    inCacheRange: boolean,
  ) {
    const ctx = this._ctx;
    if (!ctx) return;

    const layers = this.layerNames;
    const alreadyRendered = container.dataset.rendered === 'true';

    if (alreadyRendered) {
      // Update existing layers if needed
      return;
    }

    container.innerHTML = '';
    container.dataset.rendered = 'true';

    for (const layerName of layers) {
      switch (layerName) {
        case 'canvas':
          this.renderCanvasLayer(container, page);
          break;
        case 'text':
          this.renderTextLayer(container, page);
          break;
        case 'annotations':
          this.renderAnnotationsLayer(container, page);
          break;
        case 'decorations':
          this.renderDecorationsLayer(container, page);
          break;
      }
    }
  }

  private renderCanvasLayer(container: HTMLDivElement, page: PageInfo) {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc) return;

    const layer = document.createElement('div');
    layer.className = 'pdf__page__layer pdf__page__layer--canvas';

    const canvas = document.createElement('canvas');
    layer.appendChild(canvas);
    container.appendChild(layer);

    const task = ctx.engine.renderPage(
      ctx.doc,
      page,
      ctx.scaleFactor,
      ctx.rotation,
      window.devicePixelRatio,
      { withAnnotations: ctx.mode === 0 }, // PdfApplicationMode.View = 0
    );

    task.wait((imageData: ImageData) => {
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      const c2d = canvas.getContext('2d');
      if (c2d) {
        c2d.putImageData(
          imageData,
          0,
          0,
          0,
          0,
          imageData.width,
          imageData.height,
        );
      }
    }, ignore);
  }

  private renderTextLayer(container: HTMLDivElement, page: PageInfo) {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc) return;

    const layer = document.createElement('div');
    layer.className = 'pdf__page__layer pdf__page__layer--text';
    container.appendChild(layer);

    const task = ctx.engine.getPageTextRects(
      ctx.doc,
      page,
      ctx.scaleFactor,
      ctx.rotation,
    );
    task.wait((rects) => {
      for (const textRect of rects) {
        const rect = transformRect(
          page.size,
          textRect.rect,
          ctx.rotation,
          ctx.scaleFactor,
        );

        const span = document.createElement('span');
        span.className = 'pdf__text__rect';
        span.style.top = `${rect.origin.y}px`;
        span.style.left = `${rect.origin.x}px`;
        span.style.width = `${rect.size.width}px`;
        span.style.height = `${rect.size.height}px`;

        const contentSpan = document.createElement('span');
        contentSpan.className = 'pdf__text__rect__content';
        contentSpan.textContent = textRect.content;
        span.appendChild(contentSpan);
        layer.appendChild(span);

        // Scale to fit
        requestAnimationFrame(() => {
          const w = contentSpan.offsetWidth;
          const h = contentSpan.offsetHeight;
          if (w && h) {
            contentSpan.style.transform = `scale(${rect.size.width / w}, ${rect.size.height / h})`;
            contentSpan.style.transformOrigin = 'left top';
          }
        });
      }
    }, ignore);
  }

  private renderAnnotationsLayer(container: HTMLDivElement, page: PageInfo) {
    const ctx = this._ctx;
    if (!ctx?.engine || !ctx.doc) return;

    const layer = document.createElement('div');
    layer.className = 'pdf__page__layer pdf__page__layer--annotations';
    container.appendChild(layer);

    // Annotations rendering is a placeholder - complex annotations
    // require further implementation
  }

  private renderDecorationsLayer(container: HTMLDivElement, page: PageInfo) {
    const ctx = this._ctx;
    if (!ctx) return;

    const layer = document.createElement('div');
    layer.className = 'pdf__page__layer pdf__page__layer--decorations';
    layer.dataset.pageIndex = String(page.index);
    container.appendChild(layer);

    this.updatePageDecorations(layer, page);
  }

  private updateDecorations() {
    if (!this._container) return;
    const layers = this._container.querySelectorAll(
      '.pdf__page__layer--decorations',
    ) as NodeListOf<HTMLDivElement>;

    for (const layer of layers) {
      const pageIndex = Number(layer.dataset.pageIndex);
      const page = this._pages.find((p) => p.index === pageIndex);
      if (page) {
        this.updatePageDecorations(layer, page);
      }
    }
  }

  private updatePageDecorations(layer: HTMLDivElement, page: PageInfo) {
    const ctx = this._ctx;
    if (!ctx) return;

    layer.innerHTML = '';

    const pageDecorations = ctx.decorations.filter(
      (d) => d.pageIndex === page.index,
    );
    for (const decoration of pageDecorations) {
      const payload = decoration.payload as { start: any; end: any };
      if (!payload?.start || !payload?.end) continue;

      const start = transformRect(
        page.size,
        payload.start,
        ctx.rotation,
        ctx.scaleFactor,
      );
      const end = transformRect(
        page.size,
        payload.end,
        ctx.rotation,
        ctx.scaleFactor,
      );

      const top = Math.min(start.origin.y, end.origin.y);
      const left = start.origin.x;
      const height = Math.max(
        start.size.height + start.origin.y - top,
        end.size.height + end.origin.y - top,
      );
      const width = end.origin.x + end.size.width - start.origin.x;

      const span = document.createElement('span');
      span.className = `pdf__decoration__rect pdf__decoration__rect--${decoration.type}`;
      span.style.position = 'absolute';
      span.style.top = `${top}px`;
      span.style.left = `${left}px`;
      span.style.height = `${height}px`;
      span.style.width = `${width}px`;
      layer.appendChild(span);
    }
  }

  private scrollToPage(pageIndex: number, destination?: any) {
    const wrapper = this._pageElements.get(pageIndex);
    if (wrapper) {
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

customElements.define('pdf-pages', PdfPagesElement);
