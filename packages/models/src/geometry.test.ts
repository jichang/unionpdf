import { combine, rotate, scale, translate } from './geometry';

describe('Geometry', () => {
  test('scale should scale width and height', () => {
    const origin = {
      x: 0,
      y: 0,
    };
    expect(translate({ x: 100, y: 100 })(origin)).toEqual({
      x: 100,
      y: 100,
    });
  });

  test('scale should scale width and height', () => {
    const size = {
      width: 100,
      height: 100,
    };
    expect(scale(2)(size)).toEqual({
      width: 200,
      height: 200,
    });
  });

  test('rotate should rotate width and height', () => {
    const size = {
      width: 100,
      height: 200,
    };
    expect(rotate(0)(size)).toEqual({
      width: 100,
      height: 200,
    });
    expect(rotate(1)(size)).toEqual({
      width: 200,
      height: 100,
    });
    expect(rotate(2)(size)).toEqual({
      width: 100,
      height: 200,
    });
    expect(rotate(3)(size)).toEqual({
      width: 200,
      height: 100,
    });
  });

  test('combine should apply multipe transformations', () => {
    const size = {
      width: 100,
      height: 200,
    };
    expect(combine([scale(2), rotate(1)])(size)).toEqual({
      width: 400,
      height: 200,
    });
  });
});
