import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  PdfInkListObject,
  Position,
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
              tranformation: { offset },
            } = operation;

            return translate(offset, annotation);
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
      x: minX,
      y: minY,
    },
    size: {
      width: maxX - minX,
      height: maxY - minY,
    },
  };
}

export function translate(offset: Position, annotation: PdfAnnotationObject) {
  const {
    rect: { origin, size },
  } = annotation;

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
    case PdfAnnotationSubtype.POLYGON:
    case PdfAnnotationSubtype.POLYLINE:
      updated.vertices = updated.vertices.map((point) => {
        return {
          x: point.x + offset.x,
          y: point.y + offset.y,
        };
      });
      break;
    case PdfAnnotationSubtype.LINE:
      updated.startPoint = {
        x: updated.startPoint.x + offset.x,
        y: updated.startPoint.y + offset.y,
      };
      updated.endPoint = {
        x: updated.endPoint.x + offset.x,
        y: updated.endPoint.y + offset.y,
      };
      break;
  }

  return updated;
}

export function serialze(annotation: PdfAnnotationObject) {
  if (annotation.type === PdfAnnotationSubtype.STAMP) {
    return JSON.stringify({
      ...annotation,
      content: {
        width: annotation.content.width,
        height: annotation.content.height,
        data: [...annotation.content.data],
        colorSpace: annotation.content.colorSpace,
      },
    });
  } else {
    return JSON.stringify(annotation);
  }
}

export function deserialize(data: string): PdfAnnotationObject {
  const annotation = JSON.parse(data) as PdfAnnotationObject;
  if (annotation.type === PdfAnnotationSubtype.STAMP) {
    const { content } = annotation;
    const data = new Uint8ClampedArray(content.data);

    return {
      ...annotation,
      content: new ImageData(data, content.width, content.height, {
        colorSpace: annotation.content.colorSpace,
      }),
    };
  } else {
    return annotation;
  }
}
