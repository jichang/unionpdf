import { readString } from './helper';
import { PdfiumModule } from './pdfium';

describe('readString', () => {
  it('should manage memory and call callback with buffer', () => {
    const ptr = Math.random();
    const mockWasmModule = {
      _malloc: jest.fn(() => {
        return ptr;
      }),
      _free: jest.fn(),
      HEAP8: new Int8Array(100),
    } as unknown as PdfiumModule;
    const readChars = jest.fn(() => {
      return 10;
    });
    const parseChars = jest.fn(() => {
      return 'hello';
    });

    const str = readString(mockWasmModule, readChars, parseChars);
    expect(mockWasmModule._malloc).toBeCalledWith(100);
    expect(mockWasmModule._free).toBeCalledWith(ptr);
    expect(readChars).toBeCalledWith(ptr, 100);
    expect(str).toBe('hello');
  });
});
