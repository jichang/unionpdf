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

export function calculateSize(
  size: Size,
  scaleFactor: number,
  rotation: Rotation
) {
  const rotatedPageSize = rotation % 2 === 0 ? size : swap(size);
  const scaledPageSize = {
    width: Math.ceil(rotatedPageSize.width * scaleFactor),
    height: Math.ceil(rotatedPageSize.height * scaleFactor),
  };

  return scaledPageSize;
}
