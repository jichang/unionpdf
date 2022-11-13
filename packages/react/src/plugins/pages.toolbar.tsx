import { PdfZoomMode, Rotation } from '@unionpdf/models';
import React, {
  ChangeEvent,
  ComponentProps,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useUIComponents, useUIStrings } from '../ui/ui.context';
import './pages.toolbar.css';
import { ErrorBoundary } from '../ui/errorboundary';
import { usePdfDocument } from '../core/document.context';
import { PdfNavigatorEvent } from '../core/navigator';
import { usePdfNavigator } from '../core/navigator.context';

export const PDF_NAVIGATOR_SOURCE_TOOLBAR = 'PdfPagesToolbar';

export interface PdfPagesToolbarProps extends ComponentProps<'div'> {
  scaleFactor: number;
  changeScaleFactor: (evt: ChangeEvent<HTMLInputElement>) => void;
  rotation: Rotation;
  changeRotation: (evt: ChangeEvent<HTMLSelectElement>) => void;
}

export function PdfPagesToolbar(props: PdfPagesToolbarProps) {
  const {
    scaleFactor,
    changeScaleFactor,
    rotation,
    changeRotation,
    children,
    ...rest
  } = props;
  const strings = useUIStrings();
  const { ToolbarItemGroupComponent, InputComponent, SelectComponent } =
    useUIComponents();

  const pdfDoc = usePdfDocument();

  const pdfNavigator = usePdfNavigator();
  const navigate = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const pageIndex = parseInt(evt.target.value, 10);
      if (!isNaN(pageIndex)) {
        pdfNavigator?.gotoPage(
          {
            destination: {
              pageIndex: pageIndex - 1,
              zoom: {
                mode: PdfZoomMode.Unknown,
              },
              view: [],
            },
          },
          PDF_NAVIGATOR_SOURCE_TOOLBAR
        );
        setCurrPageIndex(pageIndex - 1);
      }
    },
    [pdfNavigator]
  );

  const [currPageIndex, setCurrPageIndex] = useState(
    pdfNavigator?.currPageIndex || 0
  );

  useEffect(() => {
    if (pdfNavigator) {
      const handle = (evt: PdfNavigatorEvent, source: string) => {
        switch (evt.kind) {
          case 'GotoPage':
            if (source !== PDF_NAVIGATOR_SOURCE_TOOLBAR) {
              setCurrPageIndex(evt.data.destination.pageIndex);
            }
            break;
        }
      };
      pdfNavigator.addEventListener(PDF_NAVIGATOR_SOURCE_TOOLBAR, handle);

      return () => {
        pdfNavigator.removeEventListener(PDF_NAVIGATOR_SOURCE_TOOLBAR, handle);
      };
    }
  }, [pdfNavigator, setCurrPageIndex]);

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

  return (
    <ErrorBoundary>
      <ToolbarItemGroupComponent {...rest}>
        <SelectComponent
          className="pdf__toolbar__select pdf__toolbar__select--rotation"
          value={rotation}
          onChange={changeRotation}
          options={rotationOptions}
        />
        <InputComponent
          className="pdf__toolbar__input pdf__toolbar__input--scalefactor"
          type="number"
          min="0.25"
          max="5"
          step="0.25"
          value={scaleFactor}
          onChange={changeScaleFactor}
        />
        <InputComponent
          className="pdf__toolbar__input pdf__toolbar__input--page"
          value={currPageIndex + 1}
          min="1"
          max={pdfDoc?.pageCount}
          type="number"
          onChange={navigate}
        />
      </ToolbarItemGroupComponent>
    </ErrorBoundary>
  );
}
