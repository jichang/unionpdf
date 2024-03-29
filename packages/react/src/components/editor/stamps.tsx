import { Position, ignore } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import { Drawable, DrawableHandle } from '../common';
import { usePdfEditorStamps } from './stamps.context';
import './stamps.css';

export interface PdfEidtorStampsProps {}

/**
 * Pdf editor stamps, used to render all stamps
 * @returns
 */
export function PdfEditorStamps() {
  const { stamps } = usePdfEditorStamps();

  const strings = useUIStrings();
  const { Dialog, Button } = useUIComponents();

  const [drawableDialogIsShown, setDrawableDialogIsShown] = useState(false);

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
        <Button
          scenario={{ usage: 'start-create-stamp' }}
          onClick={() => {
            setDrawableDialogIsShown(true);
          }}
          data-testid={`pdf__editor__stamps__create__button`}
        >
          {strings.createStamp}
        </Button>
      </header>
      <div className="pdf__editor__stamps__list">
        {stamps.map((stamp, index) => {
          return (
            <PdfEditorStamp
              data-testid={`pdf__editor__stamps__item--${index}`}
              key={index}
              index={index}
              stamp={stamp}
            />
          );
        })}
      </div>
      <Dialog
        scenario={{ usage: 'stamp' }}
        isOpened={drawableDialogIsShown}
        onClose={() => {
          setDrawableDialogIsShown(false);
        }}
        title={strings.stamps}
      >
        <Drawable
          componentRef={drawableHandleRef}
          width={320}
          height={480}
          onAddPath={ignore}
        />
        <div>
          <Button scenario={{ usage: 'cancel-create-stamp' }} onClick={cancel}>
            {strings.cancel}
          </Button>
          <Button scenario={{ usage: 'confirm-create-stamp' }} onClick={submit}>
            {strings.createStamp}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

/**
 * Data when dragging stamp
 */
export interface DraggableStampData {
  type: 'stamp';
  index: number;
  cursorPosition: Position;
}

/**
 * Stamp data
 */
export interface Stamp {
  source: ImageData;
}

/**
 * Properties of pdf editor stamp
 */
export interface PdfEditorStampProps {
  index: number;
  stamp: Stamp;
}

/**
 * Stamp component
 * @param props - properties of PdfEditorStamp
 * @returns
 */
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
        JSON.stringify(draggbleData),
      );
    },
    [index],
  );

  const handleDrag = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      evt.dataTransfer.dropEffect = 'move';
      setIsDragging(true);
    },
    [setIsDragging],
  );

  const handleDragEnd = useCallback(
    (evt: React.DragEvent<HTMLDivElement>) => {
      setIsDragging(false);
    },
    [setIsDragging],
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
