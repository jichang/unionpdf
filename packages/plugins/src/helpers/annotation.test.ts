import { calculateRectStyle } from './annotation';

describe('calculateAnnotationStyle', () => {
  test('should return rotated and scaled style of annotation', () => {
    const origin = {
      x: 0,
      y: 0,
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
      top: 0,
      left: 0,
    });
    expect(calculateRectStyle(rect, 0.1, 1)).toEqual({
      width: 11,
      height: 6,
      top: 0,
      right: 0,
    });
    expect(calculateRectStyle(rect, 0.1, 2)).toEqual({
      width: 6,
      height: 11,
      bottom: 0,
      right: 0,
    });
    expect(calculateRectStyle(rect, 0.1, 3)).toEqual({
      width: 11,
      height: 6,
      bottom: 0,
      left: 0,
    });
  });
});
