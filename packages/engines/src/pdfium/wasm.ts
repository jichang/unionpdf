export interface ModuleInit {
  wasmBinary: ArrayBuffer;
}

export type ArgTypeStr = 'number' | 'string' | '';

export type ArgType<T extends string> = T extends undefined
  ? void
  : T extends 'number'
  ? number
  : T extends 'string'
  ? string
  : T extends ''
  ? void
  : never;

export type ArgsType<T extends readonly string[]> = T extends []
  ? []
  : T extends readonly [infer U extends ArgTypeStr]
  ? [ArgType<U>]
  : T extends readonly [
      infer U extends ArgTypeStr,
      ...infer Rest extends readonly string[]
    ]
  ? [ArgType<U>, ...ArgsType<Readonly<Rest>>]
  : never;

export type CWrappedFunc<
  R extends ArgTypeStr,
  As extends readonly ArgTypeStr[]
> = (...args: ArgsType<As>) => ArgType<R>;

export type ValueType = 'i8' | 'i16' | 'i32' | 'float' | 'i64' | 'double';
export const ValueTypeBytes: Record<ValueType, number> = {
  i8: 1,
  i16: 2,
  i32: 4,
  i64: 8,
  float: 4,
  double: 8,
};

export type CWrap = <T extends ArgTypeStr, U extends readonly ArgTypeStr[]>(
  identity: string,
  returnType: T,
  argTypes: U
) => CWrappedFunc<T, U>;

export interface WasmModule {
  cwrap: CWrap;
  _malloc: (size: number) => number;
  _free: (ptr: number) => void;
  HEAP8: {
    set: (source: Int8Array, target: number) => void;
  };
  HEAP16: {
    set: (source: Int16Array, target: number) => void;
  };
  HEAP32: {
    set: (source: Int32Array, target: number) => void;
  };
  HEAPU8: {
    set: (source: Uint8Array, target: number) => void;
  };
  HEAPU16: {
    set: (source: Uint16Array, target: number) => void;
  };
  HEAPU32: {
    set: (source: Uint32Array, target: number) => void;
  };
  getValue: (ptr: number, type: ValueType) => number;
  setValue: (ptr: number, type: ValueType) => number;
  UTF8ToString: (ptr: number, maxBytesToRead?: number) => string;
  stringToUTF8: (str: string, outPtr: number, maxBytesToWrite: number) => void;
  UTF16ToString: (ptr: number) => string;
  stringToUTF16: (str: string, outPtr: number, maxBytesToWrite: number) => void;
  UTF32ToString: (ptr: number) => string;
  stringToUTF32: (str: string, outPtr: number, maxBytesToWrite: number) => void;
  AsciiToString: (ptr: number) => string;
  intArrayFromString: (
    str: string,
    dontAddNull: boolean,
    length?: number
  ) => string;
  intArrayToString: (ptr: number) => string;
  writeStringToMemory: (
    str: string,
    buffer: number,
    dontAddNull: boolean
  ) => void;
  writeArrayToMemory: (
    array:
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | Int8Array
      | Int16Array
      | Int32Array,
    buffer: number
  ) => void;
  writeAsciiToMemory: (
    str: string,
    buffer: number,
    dontAddNull: boolean
  ) => void;
}
