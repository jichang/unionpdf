import { calculateRectStyle } from './annotation';

describe('calculateAnnotationStyle', () => {
  test('should return rotated and scaled style of annotation', () => {
    const origin = {
      x: 10,
      y: 20,
    };
    const size = {
      width: 50.5,
      height: 100.5,
    };
    const rect = {
      origin,
      size,
    };

    expect(calculateRectStyle(rect, 0.1, 0)).toEqual({
      width: 6,
      height: 11,
      top: 2,
      left: 1,
    });
    expect(calculateRectStyle(rect, 0.1, 1)).toEqual({
      width: 11,
      height: 6,
      top: 1,
      right: 2,
    });
    expect(calculateRectStyle(rect, 0.1, 2)).toEqual({
      width: 6,
      height: 11,
      bottom: 2,
      right: 1,
    });
    expect(calculateRectStyle(rect, 0.1, 3)).toEqual({
      width: 11,
      height: 6,
      bottom: 1,
      left: 2,
    });
  });
});
