import { Rotation } from '@unionpdf/models';
import React, {
  ChangeEvent,
  ComponentProps,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useUIComponents, useUIStrings } from './ui/ui.context';
import './toolbar.css';
import { ErrorBoundary } from './errorboundary';
import { usePdfDocument } from '../core/document.context';
import { PdfNavigatorEvent } from '../core/navigator';
import { usePdfNavigator } from '../core/navigator.context';

export const PDF_NAVIGATOR_SOURCE_TOOLBAR = 'Toolbar';

export interface PdfToolbarProps extends ComponentProps<'div'> {
  scaleFactor: number;
  changeScaleFactor: (evt: ChangeEvent<HTMLInputElement>) => void;
  rotation: Rotation;
  changeRotation: (evt: ChangeEvent<HTMLSelectElement>) => void;
}

export function PdfToolbar(props: PdfToolbarProps) {
  const {
    scaleFactor,
    changeScaleFactor,
    rotation,
    changeRotation,
    children,
    ...rest
  } = props;
  const strings = useUIStrings();
  const { ToolbarComponent, InputComponent, SelectComponent } =
    useUIComponents();

  const pdfDoc = usePdfDocument();

  const pdfNavigator = usePdfNavigator();
  const navigate = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const pageIndex = parseInt(evt.target.value, 10);
      if (!isNaN(pageIndex)) {
        pdfNavigator?.gotoPage(
          { pageIndex: pageIndex - 1 },
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
              setCurrPageIndex(evt.data.pageIndex);
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
      <ToolbarComponent className="pdf__toolbar" {...rest}>
        <SelectComponent
          className="pdf__toolbar__select pdf__toolbar__select--rotation"
          value={rotation}
          onChange={changeRotation}
          options={rotationOptions}
        ></SelectComponent>
        <InputComponent
          className="pdf__toolbar__input pdf__toolbar__input--scalefactor"
          type="number"
          min="0.5"
          max="3.0"
          step="0.1"
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
      </ToolbarComponent>
    </ErrorBoundary>
  );
}
