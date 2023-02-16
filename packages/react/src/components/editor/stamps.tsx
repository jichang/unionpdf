import { Position } from '@unionpdf/models';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { PdfStamp, Stamp } from '../common';
import { usePdfEditorStamps } from './stamps.context';
import './stamps.css';

export interface PdfEidtorStampsProps {}

export function PdfEditorStamps() {
  const { stamps } = usePdfEditorStamps();

  return (
    <div className="pdf__editor__stamps">
      {stamps.map((stamp, index) => {
        return <PdfEditorStamp index={index} stamp={stamp} key={index} />;
      })}
    </div>
  );
}

export interface DraggableStampData {
  type: 'stamp';
  index: number;
  cursorPosition: Position;
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
      <PdfStamp index={index} stamp={stamp} />
    </div>
  );
}
