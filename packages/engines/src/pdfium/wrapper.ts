import type { ArgTypeStr, CWrappedFunc, WasmModule } from './wasm';

export type WrappedModule<
  T extends Record<string, readonly [ArgTypeStr, readonly ArgTypeStr[]]>
> = {
  [P in keyof T]: CWrappedFunc<T[P][0], T[P][1]>;
};

export function wrap<
  T extends Record<string, readonly [ArgTypeStr, readonly ArgTypeStr[]]>
>(wasm: WasmModule, dict: T): WrappedModule<T> {
  const wrappedModle = {} as WrappedModule<T>;

  for (const key in dict) {
    wrappedModle[key] = wasm.cwrap(key, dict[key][0], dict[key][1]);
  }

  return wrappedModle;
}
