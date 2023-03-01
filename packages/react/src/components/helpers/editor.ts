import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  PdfInkListObject,
  Position,
  Rect,
  Rotation,
  Size,
} from '@unionpdf/models';
import { PdfPageAnnotationResizerPosition } from '../editor';
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
            const { params } = operation;

            return transform(params, annotation);
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

export function transform(
  params: { offset: Position; scale: Size },
  annotation: PdfAnnotationObject
) {
  const { offset, scale } = params;
  const { rect } = annotation;
  const { origin, size } = rect;

  let updated = {
    ...annotation,
    rect: {
      origin: {
        x: origin.x + offset.x,
        y: origin.y + offset.y,
      },
      size: {
        width: size.width * scale.width,
        height: size.height * scale.height,
      },
    },
  };

  switch (updated.type) {
    case PdfAnnotationSubtype.INK:
      updated.inkList = updated.inkList.map((inkList) => {
        return {
          points: inkList.points.map((point) => {
            return {
              x:
                updated.rect.origin.x + (point.x - rect.origin.x) * scale.width,
              y:
                updated.rect.origin.y +
                (point.y - rect.origin.y) * scale.height,
            };
          }),
        };
      });
      break;
    case PdfAnnotationSubtype.POLYGON:
    case PdfAnnotationSubtype.POLYLINE:
      updated.vertices = updated.vertices.map((point) => {
        return {
          x: updated.rect.origin.x + (point.x - rect.origin.x) * scale.width,
          y: updated.rect.origin.y + (point.y - rect.origin.y) * scale.height,
        };
      });
      break;
    case PdfAnnotationSubtype.LINE:
      updated.startPoint = {
        x:
          updated.rect.origin.x +
          (updated.startPoint.x - rect.origin.x) * scale.width,
        y:
          updated.rect.origin.y +
          (updated.startPoint.y - rect.origin.y) * scale.height,
      };
      updated.endPoint = {
        x:
          updated.rect.origin.x +
          (updated.endPoint.x - rect.origin.x) * scale.width,
        y:
          updated.rect.origin.y +
          (updated.endPoint.y - rect.origin.y) * scale.height,
      };
      break;
  }

  return updated;
}

export function calculateTransformation(
  rect: Rect,
  offset: Position,
  rotation: Rotation,
  resizerPosition: PdfPageAnnotationResizerPosition
) {
  const transformation = {
    offset: {
      x: 0,
      y: 0,
    },
    scale: {
      width: 1,
      height: 1,
    },
  };
  if (offset.x === 0 && offset.y === 0) {
    return transformation;
  }

  switch (rotation) {
    case Rotation.Degree0:
      {
        switch (resizerPosition) {
          case PdfPageAnnotationResizerPosition.TopLeft:
            transformation.offset.x = offset.x;
            transformation.offset.y = offset.y;
            transformation.scale.width =
              (rect.size.width - offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.y) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.TopRight:
            transformation.offset.y = offset.y;
            transformation.scale.width =
              (rect.size.width + offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.y) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.BottomRight:
            transformation.scale.width =
              (rect.size.width + offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.y) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.BottomLeft:
            transformation.offset.x = offset.x;
            transformation.scale.width =
              (rect.size.width - offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.y) / rect.size.height;
            break;
        }
      }
      break;
    case Rotation.Degree90:
      {
        switch (resizerPosition) {
          case PdfPageAnnotationResizerPosition.TopLeft:
            transformation.offset.x = offset.y;
            transformation.scale.width =
              (rect.size.width - offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.x) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.TopRight:
            transformation.offset.x = offset.y;
            transformation.offset.y = -offset.x;
            transformation.scale.width =
              (rect.size.width - offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.x) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.BottomRight:
            transformation.offset.y = -offset.x;
            transformation.scale.width =
              (rect.size.width + offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.x) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.BottomLeft:
            transformation.scale.width =
              (rect.size.width + offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.x) / rect.size.height;
            break;
        }
      }
      break;
    case Rotation.Degree180:
      {
        switch (resizerPosition) {
          case PdfPageAnnotationResizerPosition.TopLeft:
            transformation.scale.width =
              (rect.size.width - offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.y) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.TopRight:
            transformation.offset.x = -offset.x;
            transformation.scale.width =
              (rect.size.width + offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.y) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.BottomRight:
            transformation.offset.x = -offset.x;
            transformation.offset.y = -offset.y;
            transformation.scale.width =
              (rect.size.width + offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.y) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.BottomLeft:
            transformation.offset.y = -offset.y;
            transformation.scale.width =
              (rect.size.width - offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.y) / rect.size.height;
            break;
        }
      }
      break;
    case Rotation.Degree270:
      {
        switch (resizerPosition) {
          case PdfPageAnnotationResizerPosition.TopLeft:
            transformation.offset.y = offset.x;
            transformation.scale.width =
              (rect.size.width - offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.x) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.TopRight:
            transformation.scale.width =
              (rect.size.width - offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.x) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.BottomRight:
            transformation.offset.x = -offset.y;
            transformation.scale.width =
              (rect.size.width + offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.x) / rect.size.height;
            break;
          case PdfPageAnnotationResizerPosition.BottomLeft:
            transformation.offset.x = -offset.y;
            transformation.offset.y = offset.x;
            transformation.scale.width =
              (rect.size.width + offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.x) / rect.size.height;
            break;
        }
      }
      break;
  }

  if (transformation.scale.width < 0 || transformation.scale.height < 0) {
    debugger;
  }

  return transformation;
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
