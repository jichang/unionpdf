import {
  PdfNavigatorEvent,
  usePdfDocument,
  usePdfEngine,
  usePdfNavigator,
} from '@unionpdf/core';
import { PdfPageObject, Rotation, Size } from '@unionpdf/models';
import React, { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from './errorboundary';
import './thumbnails.css';

export type Direction = 'horizontal' | 'vertical';

export interface Layout {
  direction: Direction;
  itemsCount: number;
}

export interface PdfThumbnailsProps {
  layout?: Layout;
  size: Size;
  scaleFactor?: number;
  rotation?: Rotation;
}

export const PDF_NAVIGATOR_SOURCE_THUMBNAILS = 'PdfThumbnails';

export function PdfThumbnails(props: PdfThumbnailsProps) {
  const {
    layout = { direction: 'vertical', itemsCount: 1 },
    size,
    scaleFactor = 1,
    rotation = 0,
  } = props;
  const doc = usePdfDocument();
  const pdfNavigator = usePdfNavigator();
  const [currPageIndex, setCurrPageIndex] = useState(
    pdfNavigator?.currPageIndex || 0
  );

  useEffect(() => {
    if (pdfNavigator) {
      const handle = (evt: PdfNavigatorEvent, source: string) => {
        switch (evt.kind) {
          case 'GotoPage':
            if (source !== PDF_NAVIGATOR_SOURCE_THUMBNAILS) {
              setCurrPageIndex(evt.data.pageIndex);
            }
            break;
        }
      };
      pdfNavigator.addEventListener(PDF_NAVIGATOR_SOURCE_THUMBNAILS, handle);

      return () => {
        pdfNavigator.removeEventListener(
          PDF_NAVIGATOR_SOURCE_THUMBNAILS,
          handle
        );
      };
    }
  }, [pdfNavigator, setCurrPageIndex]);

  const gotoPage = useCallback(
    (page: PdfPageObject) => {
      pdfNavigator?.gotoPage(
        { pageIndex: page.index },
        PDF_NAVIGATOR_SOURCE_THUMBNAILS
      );
      setCurrPageIndex(page.index);
    },
    [pdfNavigator, setCurrPageIndex]
  );
  const styleTemplate = [];
  for (let i = 0; i < layout.itemsCount; i++) {
    styleTemplate.push('1fr');
  }

  return (
    <ErrorBoundary>
      <div
        className={`pdf__thumbnails pdf__thumbnails--${layout.direction}`}
        style={
          layout.direction === 'vertical'
            ? { gridTemplateColumns: styleTemplate.join(' ') }
            : { gridTemplateRows: styleTemplate.join(' ') }
        }
      >
        {doc?.pages.map((page, index) => {
          const isCurrent = page.index === currPageIndex;
          return (
            <PdfThumbnail
              key={index}
              page={page}
              scaleFactor={scaleFactor}
              rotation={rotation}
              isCurrent={isCurrent}
              onClick={gotoPage}
            />
          );
        })}
      </div>
    </ErrorBoundary>
  );
}

export interface PdfThumbnailProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  isCurrent: boolean;
  onClick: (page: PdfPageObject) => void;
}

export function PdfThumbnail(props: PdfThumbnailProps) {
  const engine = usePdfEngine();
  const { page, scaleFactor, rotation, isCurrent, onClick } = props;
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (engine && page) {
      const abortController = new AbortController();
      const load = async () => {
        const result = await engine.renderThumbnail(
          page,
          scaleFactor,
          rotation,
          abortController.signal
        );
        if (result instanceof Promise) {
          result.then(() => {
            setSrc(imageDataToDataUrl(result));
          });
        } else {
          setSrc(imageDataToDataUrl(result));
        }
      };

      load();

      return () => {
        abortController.abort();
      };
    }
  }, [engine, page, scaleFactor, rotation]);

  return (
    <div
      tabIndex={0}
      className={`pdf__thumbnail ${isCurrent ? 'pdf__thumbnail--current' : ''}`}
    >
      <img
        alt={`page ${page.index}`}
        src={src}
        onClick={() => {
          onClick(page);
        }}
      />
      <span>{page.index + 1}</span>
    </div>
  );
}

function imageDataToDataUrl(imageData: ImageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const context = canvas.getContext('2d');
  context?.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
}
