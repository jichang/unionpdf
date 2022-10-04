import { Rotation } from './pdf';

export interface Size {
  width: number;
  height: number;
}

export function swap(size: Size): Size {
  const { width, height } = size;

  return {
    width: height,
    height: width,
  };
}

export interface Position {
  x: number;
  y: number;
}

export interface Rect {
  origin: Position;
  size: Size;
}
