import React from 'react';
import { ComponentProps } from 'react';
import {
  PdfApplicationContextProvider,
  PdfApplicationMode,
} from './application.context';
import { PdfEditorContextProvider } from './editor.context';

export interface PdfApplicationProps extends ComponentProps<'div'> {
  mode: PdfApplicationMode;
}

export function PdfApplication(props: PdfApplicationProps) {
  const { mode, children, ...rest } = props;

  return (
    <div
      className={`pdf__application ${
        mode === PdfApplicationMode.Edit
          ? 'pdf__application--edit'
          : 'pdf__application--read'
      }`}
      {...rest}
    >
      <PdfApplicationContextProvider mode={mode}>
        <PdfEditorContextProvider>{children}</PdfEditorContextProvider>
      </PdfApplicationContextProvider>
    </div>
  );
}
