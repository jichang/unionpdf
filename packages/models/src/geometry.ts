import { Rotation } from './pdf';

export interface Size {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Rect {
  // reprensent the center of the rect
  origin: Position;
  size: Size;
}

export function scale(factor: number) {
  return (size: Size): Size => {
    return {
      width: size.width * factor,
      height: size.height * factor,
    };
  };
}

export function translate(position: Position) {
  return (origin: Position): Position => {
    return {
      x: origin.x + position.x,
      y: origin.y + position.y,
    };
  };
}

export function rotate(rotation: Rotation) {
  return (size: Size): Size => {
    switch (rotation) {
      case 0:
        return {
          width: size.width,
          height: size.height,
        };
      case 1:
        return {
          width: size.height,
          height: size.width,
        };
      case 2:
        return {
          width: size.width,
          height: size.height,
        };
      case 3:
        return {
          width: size.height,
          height: size.width,
        };
    }
  };
}

export type TransformFunc<T> = (t: T) => T;

export function combine<T>(funcs: TransformFunc<T>[]): TransformFunc<T> {
  return (t: T) => {
    return funcs.reduce((rect, t) => {
      return t(rect);
    }, t);
  };
}
