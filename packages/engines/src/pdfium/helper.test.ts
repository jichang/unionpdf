import { readString } from './helper';
import { WrappedPdfiumModule } from '@unionpdf/pdfium';

describe('readString', () => {
  it('should manage memory and call callback with buffer', () => {
    const ptr = Math.random();
    const mockWasmModule = {
      pdfium: {
        wasmExports: {
          malloc: jest.fn(() => {
            return ptr;
          }),
          free: jest.fn(),
        },
        HEAP8: new Int8Array(100),
      },
    } as unknown as WrappedPdfiumModule;
    const readChars = jest.fn(() => {
      return 10;
    });
    const parseChars = jest.fn(() => {
      return 'hello';
    });

    const str = readString(mockWasmModule.pdfium, readChars, parseChars);
    expect(mockWasmModule.pdfium.wasmExports.malloc).toHaveBeenCalledWith(100);
    expect(mockWasmModule.pdfium.wasmExports.free).toHaveBeenCalledWith(ptr);
    expect(readChars).toHaveBeenCalledWith(ptr, 100);
    expect(str).toBe('hello');
  });
});
