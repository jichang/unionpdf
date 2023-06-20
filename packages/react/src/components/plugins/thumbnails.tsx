import {
  ignore,
  PdfDocumentObject,
  PdfPageObject,
  PdfZoomMode,
  Rotation,
  Size,
} from '@unionpdf/models';
import React, { ComponentProps, useCallback, useEffect, useState } from 'react';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { usePdfNavigator } from '../../core/navigator.context';
import { useUIComponents } from '../../adapters';
import { ErrorBoundary } from '../../core/errorboundary';
import {
  IntersectionObserverContextProvider,
  useIntersectionObserver,
} from '../../core';
import { IntersectionObserverEntry } from '../../core';
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
  enableCheckbox?: boolean;
  selectedIndexes?: number[];
  onClickCheckbox?: (page: PdfPageObject) => void;
}

export const PDF_NAVIGATOR_SOURCE_THUMBNAILS = 'PdfThumbnails';

export function PdfThumbnails(props: PdfThumbnailsProps) {
  const {
    layout = { direction: 'vertical', itemsCount: 1 },
    scaleFactor = 1,
    rotation = 0,
    enableCheckbox = false,
    selectedIndexes = [],
    onClickCheckbox: onClickThumbnail,
  } = props;
  const { doc } = usePdfDocument();
  const { currPageIndex, gotoPage } = usePdfNavigator();

  const jumpToPage = useCallback(
    (page: PdfPageObject) => {
      gotoPage(
        {
          destination: {
            pageIndex: page.index,
            zoom: {
              mode: PdfZoomMode.Unknown,
            },
            view: [],
          },
        },
        PDF_NAVIGATOR_SOURCE_THUMBNAILS
      );
    },
    [gotoPage]
  );

  const styleTemplate: string[] = [];
  for (let i = 0; i < layout.itemsCount; i++) {
    styleTemplate.push('1fr');
  }

  return (
    <ErrorBoundary>
      <div className="pdf__thumbnails">
        <IntersectionObserverContextProvider
          className={`pdf__thumbnails__grid pdf__thumbnails__grid--${layout.direction}`}
          style={
            layout.direction === 'vertical'
              ? { gridTemplateColumns: styleTemplate.join(' ') }
              : { gridTemplateRows: styleTemplate.join(' ') }
          }
        >
          <PdfThumbnailsContent
            doc={doc}
            currPageIndex={currPageIndex}
            scaleFactor={scaleFactor}
            rotation={rotation}
            gotoPage={jumpToPage}
            enableCheckbox={enableCheckbox}
            selectedIndexes={selectedIndexes}
            onClickThumbnail={onClickThumbnail}
          />
        </IntersectionObserverContextProvider>
      </div>
    </ErrorBoundary>
  );
}

export interface PdfThumbnailsContentProps extends ComponentProps<'div'> {
  doc: PdfDocumentObject | null;
  currPageIndex: number;
  scaleFactor: number;
  rotation: Rotation;
  gotoPage: (page: PdfPageObject) => void;
  enableCheckbox: boolean;
  selectedIndexes: number[];
  onClickThumbnail?: (page: PdfPageObject) => void;
}

export function PdfThumbnailsContent(props: PdfThumbnailsContentProps) {
  const {
    doc,
    currPageIndex,
    scaleFactor,
    rotation,
    gotoPage,
    enableCheckbox,
    selectedIndexes,
    onClickThumbnail,
    children,
  } = props;
  const { visibleEntryIds } = useIntersectionObserver();

  return (
    <>
      {doc?.pages.map((page, index) => {
        const isCurrent = page.index === currPageIndex;
        const isVisible = visibleEntryIds.has(page.index);
        const isSelected = selectedIndexes.indexOf(page.index) !== -1;

        return (
          <PdfThumbnail
            key={index}
            page={page}
            isVisible={isVisible}
            scaleFactor={scaleFactor}
            rotation={rotation}
            isCurrent={isCurrent}
            isSelected={isSelected}
            onClick={gotoPage}
            enableCheckbox={enableCheckbox}
            onClickCheckbox={onClickThumbnail}
          />
        );
      })}
      {children}
    </>
  );
}

export interface PdfThumbnailProps {
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  isVisible: boolean;
  isCurrent: boolean;
  isSelected: boolean;
  onClick: (page: PdfPageObject) => void;
  enableCheckbox: boolean;
  onClickCheckbox?: (page: PdfPageObject) => void;
}

export function PdfThumbnail(props: PdfThumbnailProps) {
  const engine = usePdfEngine();
  const { doc } = usePdfDocument();
  const {
    page,
    scaleFactor,
    rotation,
    isSelected,
    isVisible,
    isCurrent,
    onClick,
    enableCheckbox,
  } = props;
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (!src && engine && doc && page && isVisible) {
      const task = engine.renderThumbnail(doc, page, scaleFactor, rotation);
      task.wait((imageData) => {
        setSrc(imageDataToDataUrl(imageData));
      }, ignore);

      return () => {
        task.abort();
      };
    }
  }, [src, engine, doc, page, scaleFactor, rotation, isVisible]);

  const { Input } = useUIComponents();

  const onClickCheckbox = useCallback(() => {
    props.onClickCheckbox?.(page);
  }, [page, props.onClickCheckbox]);

  return (
    <IntersectionObserverEntry
      entryId={`${page.index}`}
      tabIndex={0}
      className={`pdf__thumbnail ${isCurrent ? 'pdf__thumbnail--current' : ''}`}
    >
      <img
        alt={`page ${page.index}`}
        src={src}
        onClick={() => {
          onClick(page);
        }}
        width={page.size.width * scaleFactor}
        height={page.size.height * scaleFactor}
      />
      {enableCheckbox ? (
        <Input
          checked={isSelected}
          className="pdf__thumbnail__checkbox"
          type="checkbox"
          onChange={onClickCheckbox}
        />
      ) : null}
      <span>{page.index + 1}</span>
    </IntersectionObserverEntry>
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
