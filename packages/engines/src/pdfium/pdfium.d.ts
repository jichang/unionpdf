export interface ModuleInit {
  wasmBinary: ArrayBuffer;
}

export function create(init: ModuleInit): void;
