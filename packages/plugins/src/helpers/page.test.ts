import { calculatePageSize } from './page';

describe('calculatePageSize', () => {
  test('should return rotated and scaled size', () => {
    const pageSize = {
      width: 50.5,
      height: 100.5,
    };

    const result = calculatePageSize(pageSize, 0.1, 1);
    expect(result).toEqual({
      width: 11,
      height: 6,
    });
  });
});
