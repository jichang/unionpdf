import { calculateAngle, Rotation } from '@unionpdf/models';

/**
 * Rotate image
 * @param imageData - original image data
 * @param rotation - rotation angle
 * @returns image data after rotation
 *
 * @public
 */
export function rotateImageData(imageData: ImageData, rotation: Rotation) {
  const size = { width: imageData.width, height: imageData.height };
  const canvasElem = document.createElement('canvas');
  canvasElem.width = size.width;
  canvasElem.height = size.height;
  const ctx = canvasElem.getContext('2d') as CanvasRenderingContext2D;
  ctx.translate(size.width / 2, size.height / 2);
  ctx.rotate(calculateAngle(rotation));
  ctx.putImageData(imageData, 0, 0);

  return ctx.getImageData(0, 0, size.width, size.height);
}
