import { EngineRunner } from '../webworker';
import { PdfiumEngine } from './engine';
import createPdfiumModule from './pdfium';

export class PdfiumEngineRunner extends EngineRunner {
  constructor(private wasmBinary: ArrayBuffer) {
    super();

    this.initialize();
  }

  async initialize() {
    const wasmBinary = this.wasmBinary;
    const wasmModule = await createPdfiumModule({ wasmBinary });
    this.engine = new PdfiumEngine(wasmModule);
    this.ready();
  }
}
