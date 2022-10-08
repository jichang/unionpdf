import { Rotation, Size, swap } from '@unionpdf/models';

export function calculatePageSize(
  pageSize: Size,
  scaleFactor: number,
  rotation: Rotation
) {
  const rotatedPageSize = rotation % 2 === 0 ? pageSize : swap(pageSize);
  const scaledPageSize = {
    width: Math.ceil(rotatedPageSize.width * scaleFactor),
    height: Math.ceil(rotatedPageSize.height * scaleFactor),
  };

  return scaledPageSize;
}
