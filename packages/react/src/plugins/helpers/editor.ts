import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  PdfInkListObject,
  Rect,
} from '@unionpdf/models';
import { Operation } from '../editor/editor.context';

export function apply(
  annotations: PdfAnnotationObject[],
  operations: Operation[]
) {
  return operations.reduce((annotations, operation) => {
    switch (operation.action) {
      case 'create':
        return [...annotations, operation.annotation];
      case 'transform':
        return annotations.map((annotation) => {
          if (annotation.id !== operation.annotation.id) {
            return annotation;
          } else {
            const {
              rect: { origin, size },
            } = annotation;
            const {
              tranformation: { offset },
            } = operation;

            let updated = {
              ...annotation,
              rect: {
                origin: {
                  x: origin.x + offset.x,
                  y: origin.y + offset.y,
                },
                size,
              },
            };

            switch (updated.type) {
              case PdfAnnotationSubtype.INK:
                updated.inkList = updated.inkList.map((inkList) => {
                  return {
                    points: inkList.points.map((point) => {
                      return {
                        x: point.x + offset.x,
                        y: point.y + offset.y,
                      };
                    }),
                  };
                });
                break;
            }

            return updated;
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
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < inkLists.length; i++) {
    const points = inkLists[i].points;
    for (let j = 0; j < points.length; j++) {
      const point = points[j];
      minX = Math.min(point.x, minX);
      maxX = Math.max(point.x, maxX);
      minY = Math.min(point.y, minY);
      maxY = Math.max(point.y, maxY);
    }
  }

  return {
    origin: {
      x: minX - 1,
      y: minY - 1,
    },
    size: {
      width: maxX - minX + 2,
      height: maxY - minY + 2,
    },
  };
}
