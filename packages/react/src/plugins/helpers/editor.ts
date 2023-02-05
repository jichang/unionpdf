import { PdfAnnotationObject, PdfInkListObject, Rect } from '@unionpdf/models';
import { Operation } from '../../core/editor.context';

export function apply(
  annotations: PdfAnnotationObject[],
  operations: Operation[]
) {
  return operations.reduce((annotations, operation) => {
    switch (operation.action) {
      case 'create':
        return [...annotations, operation.annotation];
      case 'update':
        return annotations.map((annotation) => {
          if (annotation.id !== operation.annotation.id) {
            return annotation;
          } else {
            return annotation;
          }
        });
      case 'remove':
        return annotations.filter((annotation) => {
          return annotation.id !== operation.annotation.id;
        });
      default:
        return annotations;
    }
  }, annotations);
}

export function calculateBoundingRect(inkLists: PdfInkListObject[]): Rect {
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < inkLists.length - 1; i++) {
    const points = inkLists[i].points;
    for (let j = 0; j < points.length; j++) {
      const point = points[j];
      minX = Math.min(point.x, minX);
      maxY = Math.max(point.x, maxX);
      minY = Math.min(point.y, minY);
      maxY = Math.max(point.y, maxY);
    }
  }

  return {
    origin: {
      x: minX,
      y: minY,
    },
    size: {
      width: maxX - minX,
      height: maxY - minY,
    },
  };
}
