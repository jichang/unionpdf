import { readString } from './helper';
import { WasmModuleWrapper } from './wrapper';

describe('readString', () => {
  it('should manage memory and call callback with buffer', () => {
    const ptr = Math.random();
    const mockWasmModuleWrapper = {
      malloc: jest.fn(() => {
        return ptr;
      }),
      free: jest.fn(),
    } as unknown as WasmModuleWrapper;
    const readChars = jest.fn(() => {
      return 10;
    });
    const parseChars = jest.fn(() => {
      return 'hello';
    });

    const str = readString(mockWasmModuleWrapper, readChars, parseChars);
    expect(mockWasmModuleWrapper.malloc).toBeCalledWith(100);
    expect(mockWasmModuleWrapper.free).toBeCalledWith(ptr);
    expect(readChars).toBeCalledWith(ptr, 100);
    expect(str).toBe('hello');
  });
});
