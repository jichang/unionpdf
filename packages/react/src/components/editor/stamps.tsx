import { Position } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../ui';
import { Drawable, DrawableHandle, DrawablePath } from '../common';
import { usePdfEditorStamps } from './stamps.context';
import './stamps.css';

export interface PdfEidtorStampsProps {}

export function PdfEditorStamps() {
  const { stamps } = usePdfEditorStamps();

  const strings = useUIStrings();
  const { DialogComponent, ButtonComponent } = useUIComponents();

  const [drawableDialogIsShown, setDrawableDialogIsShown] = useState(false);
  const [paths, setPaths] = useState<DrawablePath[]>([]);

  const onAddPath = useCallback(
    (path: DrawablePath) => {
      setPaths((paths) => {
        return [...paths, path];
      });
    },
    [setPaths]
  );

  const cancel = useCallback(() => {
    setDrawableDialogIsShown(false);
  }, [setDrawableDialogIsShown]);

  const { onAddStamp } = usePdfEditorStamps();

  const drawableHandleRef = useRef<DrawableHandle>(null);
  const submit = useCallback(() => {
    if (drawableHandleRef.current) {
      const imageData = drawableHandleRef.current.queryImage();
      if (imageData) {
        onAddStamp({ source: imageData });
      }
    }
    setDrawableDialogIsShown(false);
  }, [onAddStamp, setDrawableDialogIsShown]);

  return (
    <div className="pdf__editor__stamps">
      <header className="pdf__editor__stamps__header">
        <ButtonComponent
          onClick={() => {
            setDrawableDialogIsShown(true);
          }}
        >
          {strings.createStamp}
        </ButtonComponent>
      </header>
      <div className="pdf__editor__stamps__list">
        {stamps.map((stamp, index) => {
          return <PdfEditorStamp key={index} index={index} stamp={stamp} />;
        })}
      </div>
      <DialogComponent
        open={drawableDialogIsShown}
        onClose={() => {
          setDrawableDialogIsShown(false);
        }}
      >
        <Drawable
          componentRef={drawableHandleRef}
          width={320}
          height={480}
          onAddPath={onAddPath}
        />
        <div>
          <ButtonComponent onClick={cancel}>{strings.cancel}</ButtonComponent>
          <ButtonComponent onClick={submit}>
            {strings.createStamp}
          </ButtonComponent>
        </div>
      </DialogComponent>
    </div>
  );
}

export interface DraggableStampData {
  type: 'stamp';
  index: number;
  cursorPosition: Position;
}

export interface Stamp {
  source: ImageData;
}

export interface PdfEditorStampProps {
  index: number;
  stamp: Stamp;
}

export function PdfEditorStamp(props: PdfEditorStampProps) {
  const { index, stamp } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      const draggbleData: DraggableStampData = {
        type: 'stamp',
        index,
        cursorPosition: {
          x: evt.nativeEvent.offsetX,
          y: evt.nativeEvent.offsetY,
        },
      };
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.setData(
        'application/json',
        JSON.stringify(draggbleData)
      );
    },
    [index]
  );

  const handleDrag = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.dataTransfer.dropEffect = 'move';
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const handleDragEnd = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      setIsDragging(false);
    },
    [setIsDragging]
  );

  const canvasElemRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvasElem = canvasElemRef.current;
    if (canvasElem) {
      canvasElem.width = stamp.source.width;
      canvasElem.height = stamp.source.height;
      const ctx = canvasElem.getContext('2d');

      if (ctx) {
        ctx.resetTransform();
        ctx?.clearRect(0, 0, stamp.source.width, stamp.source.height);
        ctx.putImageData(stamp.source, 0, 0);
      }
    }
  }, [stamp.source]);

  return (
    <div
      tabIndex={0}
      className={classNames('pdf__editor__stamp', {
        'pdf__editor__stamp--dragging': isDragging,
      })}
      draggable={true}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <canvas className="pdf__editor__stamp__canvas" ref={canvasElemRef} />
    </div>
  );
}
