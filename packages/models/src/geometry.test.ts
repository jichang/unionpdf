import { swap } from './geometry';

describe('Geometry', () => {
  test('swap should swap width and height', () => {
    const size = {
      width: 100,
      height: 50,
    };
    expect(swap(size)).toEqual({
      width: 50,
      height: 100,
    });
  });
});
