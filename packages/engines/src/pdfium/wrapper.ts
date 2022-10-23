import { JSTypeName, CWrappedFunc, CWrap } from './emscripten';

export type WrappedModule<
  T extends Record<string, readonly [readonly JSTypeName[], JSTypeName]>
> = {
  [P in keyof T]: CWrappedFunc<T[P][0], T[P][1]>;
};

export function wrap<
  T extends Record<string, readonly [readonly JSTypeName[], JSTypeName]>
>(cwrap: CWrap, dict: T): WrappedModule<T> {
  const wrappedModle = {} as WrappedModule<T>;

  for (const key in dict) {
    wrappedModle[key] = cwrap(key, dict[key][1], dict[key][0]);
  }

  return wrappedModle;
}
