import { calculateSize, swap } from './geometry';

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

  test('calculateSize should return rotated and scaled size', () => {
    const pageSize = {
      width: 50.5,
      height: 100.5,
    };

    const result = calculateSize(pageSize, 0.1, 1);
    expect(result).toEqual({
      width: 11,
      height: 6,
    });
  });
});
