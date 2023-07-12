import {
  PdfAnnotationObject,
  PdfAnnotationSubtype,
  PdfInkListObject,
  Position,
  Rect,
  Rotation,
  Size,
} from '@unionpdf/models';
import { Operation } from '../editor/editor.context';
import { ResizerPosition } from '../editor/annotations.context';

/**
 * Apply operations on annotations
 * @param annotations - all annotations
 * @param operations - all operations
 * @returns updated annotations
 *
 * @public
 */
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

/**
 * Calculate bounding rect of all ink list
 * @param inkLists - all ink lists
 * @returns bounding rect
 */
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

/**
 * Transfrom annotation
 * @param params - transformation params
 * @param annotation - target annotations
 * @returns transformed annotation
 */
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

/**
 * Calculate transformation
 * @param rect - target rect
 * @param offset - translate offset
 * @param rotation - rotated angle
 * @param resizerPosition - position of resizer
 * @returns transform
 */
export function calculateTransformation(
  rect: Rect,
  offset: Position,
  rotation: Rotation,
  resizerPosition: ResizerPosition
): { offset: Position; scale: Size } {
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
          case ResizerPosition.TopLeft:
            transformation.offset.x = offset.x;
            transformation.offset.y = offset.y;
            transformation.scale.width =
              (rect.size.width - offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.y) / rect.size.height;
            break;
          case ResizerPosition.TopRight:
            transformation.offset.y = offset.y;
            transformation.scale.width =
              (rect.size.width + offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.y) / rect.size.height;
            break;
          case ResizerPosition.BottomRight:
            transformation.scale.width =
              (rect.size.width + offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.y) / rect.size.height;
            break;
          case ResizerPosition.BottomLeft:
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
          case ResizerPosition.TopLeft:
            transformation.offset.x = offset.y;
            transformation.scale.width =
              (rect.size.width - offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.x) / rect.size.height;
            break;
          case ResizerPosition.TopRight:
            transformation.offset.x = offset.y;
            transformation.offset.y = -offset.x;
            transformation.scale.width =
              (rect.size.width - offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.x) / rect.size.height;
            break;
          case ResizerPosition.BottomRight:
            transformation.offset.y = -offset.x;
            transformation.scale.width =
              (rect.size.width + offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.x) / rect.size.height;
            break;
          case ResizerPosition.BottomLeft:
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
          case ResizerPosition.TopLeft:
            transformation.scale.width =
              (rect.size.width - offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.y) / rect.size.height;
            break;
          case ResizerPosition.TopRight:
            transformation.offset.x = -offset.x;
            transformation.scale.width =
              (rect.size.width + offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.y) / rect.size.height;
            break;
          case ResizerPosition.BottomRight:
            transformation.offset.x = -offset.x;
            transformation.offset.y = -offset.y;
            transformation.scale.width =
              (rect.size.width + offset.x) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.y) / rect.size.height;
            break;
          case ResizerPosition.BottomLeft:
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
          case ResizerPosition.TopLeft:
            transformation.offset.y = offset.x;
            transformation.scale.width =
              (rect.size.width - offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height - offset.x) / rect.size.height;
            break;
          case ResizerPosition.TopRight:
            transformation.scale.width =
              (rect.size.width - offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.x) / rect.size.height;
            break;
          case ResizerPosition.BottomRight:
            transformation.offset.x = -offset.y;
            transformation.scale.width =
              (rect.size.width + offset.y) / rect.size.width;
            transformation.scale.height =
              (rect.size.height + offset.x) / rect.size.height;
            break;
          case ResizerPosition.BottomLeft:
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

  return transformation;
}

/**
 * Clone annotation
 * @param annotation - target annotation
 * @returns cloned annotation
 */
export function clone(annotation: PdfAnnotationObject) {
  const { rect } = annotation;
  const { origin, size } = rect;

  let updated: typeof annotation = {
    ...annotation,
    id: Date.now(),
    rect: {
      origin: {
        ...origin,
      },
      size: {
        ...size,
      },
    },
  };

  switch (updated.type) {
    case PdfAnnotationSubtype.INK:
      updated.inkList = updated.inkList.map((inkList) => {
        return {
          points: inkList.points.map((point) => {
            return {
              ...point,
            };
          }),
        };
      });
      break;
    case PdfAnnotationSubtype.POLYGON:
    case PdfAnnotationSubtype.POLYLINE:
      updated.vertices = updated.vertices.map((point) => {
        return {
          ...point,
        };
      });
      break;
    case PdfAnnotationSubtype.LINE:
      updated.startPoint = {
        ...updated.startPoint,
      };
      updated.endPoint = {
        ...updated.endPoint,
      };
      break;
  }

  return updated;
}
