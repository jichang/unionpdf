import { PdfiumRuntimeMethods, PdfiumModule } from "@unionpdf/pdfium";

/**
 * Read string from WASM heap
 * @param wasmModule - pdfium wasm module instance
 * @param readChars - function to read chars
 * @param parseChars - function to parse chars
 * @param defaultLength - default length of chars that needs to read
 * @returns string from the heap
 *
 * @public
 */
export function readString(
  wasmModule: PdfiumRuntimeMethods & PdfiumModule,
  readChars: (buffer: number, bufferLength: number) => number,
  parseChars: (buffer: number) => string,
  defaultLength: number = 100,
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
/**
 * Read arraybyffer from WASM heap
 * @param wasmModule - pdfium wasm module instance
 * @param readChars - function to read chars
 * @returns arraybuffer from the heap
 *
 * @public
 */
export function readArrayBuffer(
  wasmModule: PdfiumRuntimeMethods & PdfiumModule,
  readChars: (buffer: number, bufferLength: number) => number,
): ArrayBuffer {
  const bufferSize = readChars(0, 0);

  const bufferPtr = wasmModule._malloc(bufferSize);

  readChars(bufferPtr, bufferSize);

  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);

  for (let i = 0; i < bufferSize; i++) {
    view.setInt8(i, wasmModule.getValue(bufferPtr + i, 'i8'));
  }

  wasmModule._free(bufferPtr);

  return arrayBuffer;
}
