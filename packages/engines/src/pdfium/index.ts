import { create, ModuleInit } from './pdfium';

export class PdfiumEngine {
  module: any;

  async initialize(init: ModuleInit) {
    this.module = await create(init);
    console.log(this.module);
  }
}
