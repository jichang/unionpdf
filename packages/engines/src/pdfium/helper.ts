import { PdfiumModule } from './pdfium';

export function readString(
  wasmModule: PdfiumModule,
  readChars: (buffer: number, bufferLength: number) => number,
  parseChars: (buffer: number) => string,
  defaultLength: number = 100
): string {
  let buffer = wasmModule._malloc(defaultLength);
  for (let i = 0; i < defaultLength; i++) {
    wasmModule.HEAP8[buffer + i] = 0;
  }
  const actualLength = readChars(buffer, defaultLength);
  let str: string;
  if (actualLength > defaultLength) {
    wasmModule._free(buffer);
    buffer = wasmModule._malloc(actualLength);
    for (let i = 0; i < actualLength; i++) {
      wasmModule.HEAP8[buffer + i] = 0;
    }
    readChars(buffer, actualLength);
    str = parseChars(buffer);
  } else {
    str = parseChars(buffer);
  }
  wasmModule._free(buffer);

  return str;
}
