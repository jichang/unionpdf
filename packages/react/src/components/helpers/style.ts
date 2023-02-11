import { Rect, Rotation, swap } from '@unionpdf/models';

export function calculateRectStyle(
  rect: Rect,
  scaleFactor: number,
  rotation: Rotation
) {
  const { origin, size } = rect;

  const rotatedAnnoSize = rotation % 2 === 0 ? size : swap(size);
  const scaledAnnoSize = {
    width: Math.ceil(rotatedAnnoSize.width * scaleFactor),
    height: Math.ceil(rotatedAnnoSize.height * scaleFactor),
  };
  const scaledOrigin = {
    x: Math.ceil(origin.x * scaleFactor),
    y: Math.ceil(origin.y * scaleFactor),
  };

  switch (rotation) {
    case 0:
      return {
        top: scaledOrigin.y,
        left: scaledOrigin.x,
        width: scaledAnnoSize.width,
        height: scaledAnnoSize.height,
      };
    case 1:
      return {
        top: scaledOrigin.x,
        right: scaledOrigin.y,
        width: scaledAnnoSize.width,
        height: scaledAnnoSize.height,
      };
    case 2:
      return {
        bottom: scaledOrigin.y,
        right: scaledOrigin.x,
        width: scaledAnnoSize.width,
        height: scaledAnnoSize.height,
      };
    case 3:
      return {
        bottom: scaledOrigin.x,
        left: scaledOrigin.y,
        width: scaledAnnoSize.width,
        height: scaledAnnoSize.height,
      };
  }
}
