import { PdfZoomMode, Rotation } from '@unionpdf/models';
import React, { ChangeEvent, ComponentProps, useCallback } from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import './pages.toolbar.css';
import { ErrorBoundary, usePdfApplication } from '../../core';
import { usePdfDocument } from '../../core/document.context';
import { usePdfNavigator } from '../../core/navigator.context';
import classNames from 'classnames';

export const PDF_NAVIGATOR_SOURCE_PAGES_TOOLBAR = 'PdfToolbarPagesItemGroup';

export interface PdfToolbarPagesItemGroupProps extends ComponentProps<'div'> {}

export function PdfToolbarPagesItemGroup(props: PdfToolbarPagesItemGroupProps) {
  const { className, children, ...rest } = props;
  const strings = useUIStrings();
  const { Button, ToolbarItemGroup, Input, Select } = useUIComponents();

  const { scaleFactor, rotation, setRotation, setScaleFactor } =
    usePdfApplication();
  const { doc } = usePdfDocument();
  const { currPageIndex, gotoPage } = usePdfNavigator();

  const navigate = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const pageIndex = parseInt(evt.target.value, 10);
      if (!isNaN(pageIndex)) {
        gotoPage(
          {
            destination: {
              pageIndex: pageIndex - 1,
              zoom: {
                mode: PdfZoomMode.Unknown,
              },
              view: [],
            },
          },
          PDF_NAVIGATOR_SOURCE_PAGES_TOOLBAR
        );
      }
    },
    [gotoPage]
  );

  const rotationOptions = [
    {
      label: strings.rotate0Deg,
      value: '0',
    },
    {
      label: strings.rotate90Deg,
      value: '1',
    },
    {
      label: strings.rotate180Deg,
      value: '2',
    },
    {
      label: strings.rotate270Deg,
      value: '3',
    },
  ];

  const changeRotation = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      const rotation = parseInt(evt.target.value, 10) as Rotation;
      setRotation(rotation);
    },
    [setRotation]
  );

  const changeScaleFactor = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setScaleFactor(Number(evt.target.value));
    },
    [setScaleFactor]
  );

  return (
    <ErrorBoundary>
      <ToolbarItemGroup
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <Select
          className="pdf__toolbar__select pdf__toolbar__select--rotation"
          value={rotation}
          onChange={changeRotation}
          options={rotationOptions}
        />
        <Input
          className="pdf__toolbar__input pdf__toolbar__input--scalefactor"
          type="number"
          min="0.25"
          max="5"
          step="0.25"
          value={scaleFactor}
          onChange={changeScaleFactor}
        />
        <Input
          className="pdf__toolbar__input pdf__toolbar__input--page"
          value={currPageIndex + 1}
          min="1"
          max={doc?.pageCount}
          type="number"
          onChange={navigate}
        />
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}
