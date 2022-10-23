import { wrap } from './wrapper';

describe('wrap', () => {
  it('should return module with cwrap function', () => {
    const cwrap = (identity: any, returnType: any, argTypes: any) => {
      return {
        identity,
        returnType,
        argTypes,
      };
    };

    // @ts-ignore
    const result = wrap(cwrap, {
      A: [['number', 'number'] as const, 'number'] as const,
      B: [['number', 'number', 'number'] as const, ''] as const,
    });
    expect(result).toEqual({
      A: {
        argTypes: ['number', 'number'],
        identity: 'A',
        returnType: 'number',
      },
      B: {
        argTypes: ['number', 'number', 'number'],
        identity: 'B',
        returnType: '',
      },
    });
  });
});
