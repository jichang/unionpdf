import { Position } from '@unionpdf/models';
import classNames from 'classnames';
import React, {
  ComponentProps,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { calculateBoundingRect } from '../helpers/editor';
import './drawable.css';

/**
 * path in drawable component
 */
export interface DrawablePath {
  /**
   * points in path
   */
  points: Position[];
}

/**
 * Handle of drawable component
 */
export interface DrawableHandle {
  /**
   * clear canvas
   */
  clearCanvas: () => void;
  /**
   * get all paths in drawable component
   * @returns all path
   */
  queryPaths: () => DrawablePath[];
  /**
   * get all images in drawable component
   * @returns image data
   */
  queryImage: () => ImageData | undefined;
}

/**
 * Properties of drawable component
 */
export interface DrawableProps extends ComponentProps<'canvas'> {
  /**
   * Reference of handle
   */
  componentRef?: React.MutableRefObject<DrawableHandle | null>;
  /**
   * callback that will be called when adding new patch
   * @param path - added path
   * @returns
   */
  onAddPath: (path: DrawablePath) => void;
}

/**
 * Drawable component for drawaing paths
 * @param props - properties of drawable component
 * @returns
 *
 * @public
 */
export function Drawable(props: DrawableProps) {
  const { componentRef, className, onAddPath, ...rest } = props;
  const { width = 320, height = 480 } = rest;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paths, setPaths] = useState<DrawablePath[]>([]);

  useImperativeHandle(componentRef, () => {
    return {
      clearCanvas: () => {
        const canvasElem = canvasRef.current;
        if (canvasElem) {
          const ctx = canvasElem.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, Number(width), Number(height));
          }
        }
      },
      queryPaths: () => {
        return paths;
      },
      queryImage: () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
          const { origin, size } = calculateBoundingRect(paths);
          return ctx.getImageData(
            origin.x,
            origin.y,
            Number(size.width),
            Number(size.height),
          );
        }
      },
    };
  }, [width, height, paths]);

  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      const ctx = canvasElem.getContext('2d');
      if (!ctx) {
        return;
      }

      let isDrawing = false;
      let points: Position[] = [];
      const startDrawing = (evt: PointerEvent) => {
        if (isDrawing) {
          return;
        }

        isDrawing = true;
        points.push({
          x: evt.offsetX,
          y: evt.offsetY,
        });
        ctx.beginPath();
        ctx.moveTo(evt.offsetX, evt.offsetY);
      };

      const draw = (evt: PointerEvent) => {
        if (!isDrawing) {
          return;
        }

        points.push({
          x: evt.offsetX,
          y: evt.offsetY,
        });
        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.stroke();
      };

      const stopDrawing = (evt: PointerEvent) => {
        if (!isDrawing) {
          return;
        }

        points.push({
          x: evt.offsetX,
          y: evt.offsetY,
        });

        const newPath = {
          points: [...points],
        };

        setPaths((paths) => {
          return [...paths, newPath];
        });

        onAddPath(newPath);

        points = [];

        isDrawing = false;
      };
      canvasElem.addEventListener('pointerdown', startDrawing);

      canvasElem.addEventListener('pointerup', stopDrawing);
      canvasElem.addEventListener('pointerleave', stopDrawing);
      canvasElem.addEventListener('pointerout', stopDrawing);

      canvasElem.addEventListener('pointermove', draw);

      return () => {
        canvasElem.removeEventListener('pointerdown', startDrawing);

        canvasElem.removeEventListener('pointerup', stopDrawing);
        canvasElem.removeEventListener('pointerleave', stopDrawing);
        canvasElem.removeEventListener('pointerout', stopDrawing);

        canvasElem.removeEventListener('pointermove', draw);
      };
    }
  }, [setPaths, onAddPath]);

  return (
    <div className={classNames('pdf__drawable', className)}>
      <canvas ref={canvasRef} {...rest} />
    </div>
  );
}
