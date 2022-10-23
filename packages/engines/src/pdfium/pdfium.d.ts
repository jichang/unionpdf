import { ModuleInit, WasmModule } from './wasm';

export function createPdfiumModule(init: ModuleInit): Promise<WasmModule>;
