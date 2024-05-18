import { WrappedPdfiumModule } from '@unionpdf/pdfium';
import { PdfiumEngine } from './engine';

describe('PdfiumEngine', () => {
  it('should return module with cwrap function', () => {
    const wasmModule = {
      cwrap: (identity: any, returnType: any, argTypes: any) => {
        return {
          identity,
          returnType,
          argTypes,
        };
      },
    } as unknown as WrappedPdfiumModule;
    const engine = new PdfiumEngine(wasmModule);

    expect(engine).toBeDefined();
  });
});
