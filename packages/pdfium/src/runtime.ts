
/// <reference types="emscripten" />

export interface PdfiumRuntimeMethods {
  cwrap: typeof cwrap;
  ccall: typeof ccall;
  setValue: typeof setValue;
  getValue: typeof getValue;
  UTF8ToString: typeof UTF8ToString;
  UTF16ToString: typeof UTF16ToString;
  stringToUTF8: typeof stringToUTF8;
  stringToUTF16: typeof stringToUTF16;
}
