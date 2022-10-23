import { WasmModule } from './wasm';
import { wrap } from './wrapper';

describe('wrap', () => {
  it('should return module with cwrap function', () => {
    const fakeModule = {
      cwrap: (identity: any, returnType: any, argTypes: any) => {
        return {
          identity,
          returnType,
          argTypes,
        };
      },
    } as unknown as WasmModule;

    const result = wrap(fakeModule, {
      A: ['number', ['number', 'number'] as const] as const,
      B: ['number', ['number', 'number'] as const] as const,
    });
    expect(result).toEqual({
      A: {
        argTypes: ['number', 'number'],
        identity: 'A',
        returnType: 'number',
      },
      B: {
        argTypes: ['number', 'number'],
        identity: 'B',
        returnType: 'number',
      },
    });
  });
});
