import { WasmModuleWrapper } from './wrapper';

export function readString(
  wasmModuleWrapper: WasmModuleWrapper,
  readChars: (buffer: number, bufferLength: number) => number,
  parseChars: (buffer: number) => string,
  defaultLength: number = 100
): string {
  let buffer = wasmModuleWrapper.malloc(defaultLength);
  const actualLength = readChars(buffer, defaultLength);
  let str: string;
  if (actualLength > defaultLength) {
    wasmModuleWrapper.free(buffer);
    buffer = wasmModuleWrapper.malloc(actualLength);
    readChars(buffer, defaultLength);
    str = parseChars(buffer);
  } else {
    str = parseChars(buffer);
  }
  wasmModuleWrapper.free(buffer);

  return str;
}
