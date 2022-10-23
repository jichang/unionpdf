import { WasmModule } from './wasm';

export function readString(
  wasmModule: WasmModule,
  readChars: (buffer: number, bufferLength: number) => number,
  parseChars: (buffer: number) => string,
  defaultLength: number = 100
): string {
  let buffer = wasmModule._malloc(defaultLength);
  const actualLength = readChars(buffer, defaultLength);
  let str: string;
  if (actualLength > defaultLength) {
    wasmModule._free(buffer);
    buffer = wasmModule._malloc(actualLength);
    readChars(buffer, defaultLength);
    str = parseChars(buffer);
  } else {
    str = parseChars(buffer);
  }
  wasmModule._free(buffer);

  return str;
}
