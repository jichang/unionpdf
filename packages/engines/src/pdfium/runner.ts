import { EngineRunner } from '../webworker';
import { PdfiumEngine } from './engine';
import createPdfiumModule from './pdfium';

/**
 * EngineRunner for pdfium-based wasm engine
 */
export class PdfiumEngineRunner extends EngineRunner {
  /**
   * Create an instance of PdfiumEngineRunner
   * @param wasmBinary - wasm binary that contains the pdfium wasm file
   */
  constructor(private wasmBinary: ArrayBuffer) {
    super();
  }

  /**
   * Initialize runner
   */
  async prepare() {
    const wasmBinary = this.wasmBinary;
    const wasmModule = await createPdfiumModule({ wasmBinary });
    this.engine = new PdfiumEngine(wasmModule);
    this.ready();
  }
}
