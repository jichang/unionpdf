import {
  ignore,
  PdfDocumentObject,
  PdfPageObject,
  PdfZoomMode,
  Rotation,
  Size,
} from '@unionpdf/models';
import React, { ComponentProps, useCallback, useEffect, useState } from 'react';
import { PdfApplicationMode, usePdfApplication } from '../../core';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { usePdfNavigator } from '../../core/navigator.context';
import { useUIComponents, useUIStrings } from '../../ui';
import { ErrorBoundary } from '../../ui/errorboundary';
import {
  IntersectionObserverContextProvider,
  useIntersectionObserver,
} from '../../ui/intersectionobserver.context';
import { IntersectionObserverEntry } from '../../ui/intersectionobserver.entry';
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
    scaleFactor = 1,
    rotation = 0,
  } = props;
  const { ButtonComponent } = useUIComponents();
  const strings = useUIStrings();
  const { mode } = usePdfApplication();
  const doc = usePdfDocument();
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

  const [selectedPageIndexes, setSelectedIndexes] = useState<number[]>([]);

  const toggleThumbnailSelected = useCallback(
    (page: PdfPageObject) => {
      setSelectedIndexes((pageIndexes) => {
        const index = pageIndexes.indexOf(page.index);
        if (index === -1) {
          return [...pageIndexes, page.index];
        } else {
          return pageIndexes.filter((index) => {
            return index !== page.index;
          });
        }
      });
    },
    [setSelectedIndexes]
  );

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
            selectedPageIndexes={selectedPageIndexes}
            onSelectedChange={toggleThumbnailSelected}
          ></PdfThumbnailsContent>
          {mode === PdfApplicationMode.Edit ? (
            <div className="pdf__thumbnails__footer">
              <ButtonComponent>{strings.extract}</ButtonComponent>
            </div>
          ) : null}
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
  selectedPageIndexes: number[];
  onSelectedChange: (page: PdfPageObject) => void;
}

export function PdfThumbnailsContent(props: PdfThumbnailsContentProps) {
  const {
    doc,
    currPageIndex,
    scaleFactor,
    rotation,
    gotoPage,
    selectedPageIndexes,
    onSelectedChange,
    children,
  } = props;
  const { visibleEntryIds } = useIntersectionObserver();

  return (
    <>
      {doc?.pages.map((page, index) => {
        const isCurrent = page.index === currPageIndex;
        const isVisible = visibleEntryIds.has(page.index);
        const isSelected = selectedPageIndexes.indexOf(page.index) !== -1;

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
            onSelectedChange={onSelectedChange}
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
  onSelectedChange: (page: PdfPageObject) => void;
}

export function PdfThumbnail(props: PdfThumbnailProps) {
  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const {
    page,
    scaleFactor,
    rotation,
    isSelected,
    isVisible,
    isCurrent,
    onClick,
    onSelectedChange,
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

  const { mode } = usePdfApplication();
  const { InputComponent } = useUIComponents();

  const toggleThumbnailSelected = useCallback(() => {
    onSelectedChange(page);
  }, [page, onSelectedChange]);

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
      {mode === PdfApplicationMode.Edit ? (
        <InputComponent
          checked={isSelected}
          className="pdf__thumbnail__checkbox"
          type="checkbox"
          onChange={toggleThumbnailSelected}
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
