import { PdfiumEngine } from './engine';
import { WasmModule } from './wasm';

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
    } as unknown as WasmModule;
    const engine = new PdfiumEngine(wasmModule);

    expect(engine).toBeDefined();
  });
});
