import { Position } from '@unionpdf/models';
import classNames from 'classnames';
import React, {
  ComponentProps,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './drawable.css';

export interface DrawablePath {
  points: Position[];
}

export interface DrawableHandle {
  query: () => DrawablePath[];
}

export interface DrawableProps extends ComponentProps<'canvas'> {
  componentRef?: RefObject<DrawableHandle>;
  onAddPath: (path: DrawablePath) => void;
}

export function Drawable(props: DrawableProps) {
  const { componentRef, className, onAddPath, ...rest } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paths, setPaths] = useState<DrawablePath[]>([]);

  useImperativeHandle(
    componentRef,
    () => {
      return {
        query: () => {
          return paths;
        },
      };
    },
    [paths]
  );

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
