export interface FileSystemType {}

/**
 * Running environment for WASM
 */
export type EnvironmentType = 'WEB' | 'NODE' | 'SHELL' | 'WORKER';

/**
 * Name of JavaScript type
 */
export type JSTypeName = null | 'number' | 'string' | 'array' | 'boolean' | '';

/**
 * Convert name to JavaScript type
 */
export type NameToType<R extends JSTypeName> = R extends 'number'
  ? number
  : R extends 'string'
  ? string
  : R extends 'boolean'
  ? boolean
  : R extends 'array'
  ? number[] | string[] | boolean[] | Uint8Array | Int8Array
  : R extends ''
  ? void
  : R extends null
  ? null
  : never;

/**
 * Convert array of names to JavaScript types
 */
export type NamesToType<T extends readonly JSTypeName[]> = T extends []
  ? []
  : T extends readonly [infer U extends JSTypeName]
  ? [NameToType<U>]
  : T extends readonly [
      infer U extends JSTypeName,
      ...infer Rest extends readonly JSTypeName[]
    ]
  ? [NameToType<U>, ...NamesToType<Rest>]
  : [];

/**
 * Type name of integer in C
 */
export type CIntTypeName = 'i8' | 'i16' | 'i32' | 'i64';
/**
 * Type name of floating number in C
 */
export type CFloatTypeName = 'float' | 'double';
/**
 * Type name of C types
 */
export type CTypeName = CIntTypeName | CFloatTypeName;

/**
 * Imports type for WebAssembly
 */
export type WebAssemblyImports = Array<{
  name: string;
  kind: string;
}>;

/**
 * Exports type for WebAssembly
 */
export type WebAssemblyExports = Array<{
  module: string;
  name: string;
  kind: string;
}>;

/**
 * Options for calling into C functions
 */
export interface CCallOpts {
  async?: boolean | undefined;
}

/**
 * WebAssembly module
 */
export interface Module {
  print(str: string): void;
  printErr(str: string): void;
  arguments: string[];
  environment: EnvironmentType;
  preInit: Array<{ (): void }>;
  preRun: Array<{ (): void }>;
  postRun: Array<{ (): void }>;
  onAbort: { (what: any): void };
  onRuntimeInitialized: { (): void };
  preinitializedWebGLContext: WebGLRenderingContext;
  noInitialRun: boolean;
  noExitRuntime: boolean;
  logReadFiles: boolean;
  filePackagePrefixURL: string;
  wasmBinary: ArrayBuffer;

  destroy(object: object): void;
  getPreloadedPackage(
    remotePackageName: string,
    remotePackageSize: number
  ): ArrayBuffer;
  instantiateWasm(
    imports: WebAssemblyImports,
    successCallback: (module: WebAssembly.Module) => void
  ): WebAssemblyExports;
  locateFile(url: string, scriptDirectory: string): string;
  onCustomMessage(event: MessageEvent): void;

  HEAP8: Int8Array;
  HEAP16: Int16Array;
  HEAP32: Int32Array;
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAPU32: Uint32Array;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;

  TOTAL_STACK: number;
  TOTAL_MEMORY: number;
  FAST_MEMORY: number;

  addOnPreRun(cb: () => any): void;
  addOnInit(cb: () => any): void;
  addOnPreMain(cb: () => any): void;
  addOnExit(cb: () => any): void;
  addOnPostRun(cb: () => any): void;

  preloadedImages: any;
  preloadedAudios: any;

  _malloc(size: number): number;
  _free(ptr: number): void;
}

/**
 * Function for creating WebAssembly module
 */
export type ModuleFactory<T extends Module = Module> = (
  moduleOverrides?: Partial<T>
) => Promise<T>;

export interface Lookup {
  path: string;
  node: FSNode;
}

export interface FSStream {}
export interface FSNode {}
export interface ErrnoError {}

/**
 * File system
 */
export interface FS {
  ignorePermissions: boolean;
  trackingDelegate: any;
  tracking: any;
  genericErrors: any;

  lookupPath(path: string, opts: any): Lookup;
  getPath(node: FSNode): string;

  isFile(mode: number): boolean;
  isDir(mode: number): boolean;
  isLink(mode: number): boolean;
  isChrdev(mode: number): boolean;
  isBlkdev(mode: number): boolean;
  isFIFO(mode: number): boolean;
  isSocket(mode: number): boolean;

  major(dev: number): number;
  minor(dev: number): number;
  makedev(ma: number, mi: number): number;
  registerDevice(dev: number, ops: any): void;

  syncfs(populate: boolean, callback: (e: any) => any): void;
  syncfs(callback: (e: any) => any, populate?: boolean): void;
  mount(type: FileSystemType, opts: any, mountpoint: string): any;
  unmount(mountpoint: string): void;

  mkdir(path: string, mode?: number): any;
  mkdev(path: string, mode?: number, dev?: number): any;
  symlink(oldpath: string, newpath: string): any;
  rename(old_path: string, new_path: string): void;
  rmdir(path: string): void;
  readdir(path: string): any;
  unlink(path: string): void;
  readlink(path: string): string;
  stat(path: string, dontFollow?: boolean): any;
  lstat(path: string): any;
  chmod(path: string, mode: number, dontFollow?: boolean): void;
  lchmod(path: string, mode: number): void;
  fchmod(fd: number, mode: number): void;
  chown(path: string, uid: number, gid: number, dontFollow?: boolean): void;
  lchown(path: string, uid: number, gid: number): void;
  fchown(fd: number, uid: number, gid: number): void;
  truncate(path: string, len: number): void;
  ftruncate(fd: number, len: number): void;
  utime(path: string, atime: number, mtime: number): void;
  open(
    path: string,
    flags: string,
    mode?: number,
    fd_start?: number,
    fd_end?: number
  ): FSStream;
  close(stream: FSStream): void;
  llseek(stream: FSStream, offset: number, whence: number): any;
  read(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position?: number
  ): number;
  write(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position?: number,
    canOwn?: boolean
  ): number;
  allocate(stream: FSStream, offset: number, length: number): void;
  mmap(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position: number,
    prot: number,
    flags: number
  ): any;
  ioctl(stream: FSStream, cmd: any, arg: any): any;
  readFile(
    path: string,
    opts: { encoding: 'binary'; flags?: string | undefined }
  ): Uint8Array;
  readFile(
    path: string,
    opts: { encoding: 'utf8'; flags?: string | undefined }
  ): string;
  readFile(path: string, opts?: { flags?: string | undefined }): Uint8Array;
  writeFile(
    path: string,
    data: string | ArrayBufferView,
    opts?: { flags?: string | undefined }
  ): void;

  cwd(): string;
  chdir(path: string): void;
  init(
    input: null | (() => number | null),
    output: null | ((c: number) => any),
    error: null | ((c: number) => any)
  ): void;

  createLazyFile(
    parent: string | FSNode,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean
  ): FSNode;
  createPreloadedFile(
    parent: string | FSNode,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean,
    onload?: () => void,
    onerror?: () => void,
    dontCreateFile?: boolean,
    canOwn?: boolean
  ): void;
  createDataFile(
    parent: string | FSNode,
    name: string,
    data: ArrayBufferView,
    canRead: boolean,
    canWrite: boolean,
    canOwn: boolean
  ): FSNode;
}

export interface ModuleFS {
  MEMFS: FileSystemType;
  NODEFS: FileSystemType;
  IDBFS: FileSystemType;
}

/**
 * Runtime methods exported by WebAssembly module
 */
export interface ModuleRuntimeMethods {
  cwrap: <I extends readonly JSTypeName[], R extends JSTypeName>(
    ident: string,
    returnType: R,
    argTypes: I,
    opts?: CCallOpts
  ) => (...arg: NamesToType<I>) => NameToType<R>;

  ccall: <I extends readonly JSTypeName[], R extends JSTypeName>(
    ident: string,
    returnType: R,
    argTypes: I,
    args: NamesToType<I>,
    opts?: CCallOpts
  ) => NameToType<R>;

  setValue(ptr: number, value: any, type: CTypeName, noSafe?: boolean): void;
  getValue(ptr: number, type: CTypeName, noSafe?: boolean): number;

  allocate(
    slab: number[] | ArrayBufferView | number,
    types: CTypeName | CTypeName[],
    allocator: number,
    ptr?: number
  ): number;

  stackAlloc(size: number): number;
  stackSave(): number;
  stackRestore(ptr: number): void;

  AsciiToString(ptr: number, maxBytesToRead?: number): string;
  stringToAscii(str: string, outPtr: number, maxBytesToRead?: number): void;
  UTF8ToString(ptr: number, maxBytesToRead?: number): string;
  stringToUTF8(str: string, outPtr: number, maxBytesToRead?: number): void;
  lengthBytesUTF8(str: string): number;
  allocateUTF8(str: string): number;
  allocateUTF8OnStack(str: string): number;
  UTF16ToString(ptr: number): string;
  stringToUTF16(str: string, outPtr: number, maxBytesToRead?: number): void;
  lengthBytesUTF16(str: string): number;
  UTF32ToString(ptr: number): string;
  stringToUTF32(str: string, outPtr: number, maxBytesToRead?: number): void;
  lengthBytesUTF32(str: string): number;

  intArrayFromString(
    stringy: string,
    dontAddNull?: boolean,
    length?: number
  ): number[];
  intArrayToString(array: number[]): string;
  writeStringToMemory(str: string, buffer: number, dontAddNull: boolean): void;
  writeArrayToMemory(array: number[], buffer: number): void;
  writeAsciiToMemory(str: string, buffer: number, dontAddNull: boolean): void;

  addRunDependency(id: any): void;
  removeRunDependency(id: any): void;

  addFunction(func: (...args: any[]) => any, signature?: string): number;
  removeFunction(funcPtr: number): void;

  ALLOC_NORMAL: number;
  ALLOC_STACK: number;
  ALLOC_STATIC: number;
  ALLOC_DYNAMIC: number;
  ALLOC_NONE: number;
}

/**
 * Type of cwrap function, whic will be used to wrap function calling
 */
export type CWrap = <I extends readonly JSTypeName[], R extends JSTypeName>(
  ident: string,
  returnType: R,
  argTypes: I,
  opts?: CCallOpts
) => CWrappedFunc<I, R>;

/**
 * Type of wrapped function
 */
export type CWrappedFunc<
  I extends readonly JSTypeName[],
  R extends JSTypeName
> = (...args: NamesToType<I>) => NameToType<R>;

/**
 * Type of C function calling
 */
export type CCall = <I extends readonly JSTypeName[], R extends JSTypeName>(
  ident: string,
  returnType: R,
  argTypes: I,
  args: NamesToType<I>,
  opts?: CCallOpts
) => NameToType<R>;
