export interface ModuleInit {
  wasmBinary: ArrayBuffer;
  onRuntimeInitialized: () => void;
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

export type CWrapFunc<
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

export interface WasmModule {
  cwrap: <T extends ArgTypeStr, U extends readonly ArgTypeStr[]>(
    identity: string,
    returnType: T,
    argTypes: U
  ) => CWrapFunc<T, U>;
  HEAPU8: {
    set: (source: Uint8Array, target: number) => void;
  };
  getValue: (ptr: number, type: ValueType) => number;
}
