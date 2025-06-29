exports.methods = [
  'wasmExports',
  'cwrap',
  'ccall',
  'setValue',
  'getValue',
  'UTF8ToString',
  'UTF16ToString',
  'stringToUTF8',
  'stringToUTF16',
  'HEAP8',
  'HEAPU8',
];

exports.types = {
  wasmExports: 'WasmExports',
  HEAP8: 'Int8Array',
  HEAPU8: 'Uint8Array',
};
