import React from 'react';
import { ComponentProps } from 'react';
import { PdfApplicationMode, usePdfApplication } from './application.context';

export interface PdfApplicationProps extends ComponentProps<'div'> {}

export function PdfApplication(props: PdfApplicationProps) {
  const { children, ...rest } = props;

  const { mode } = usePdfApplication();

  return (
    <div
      className={`pdf__application ${
        mode === PdfApplicationMode.Edit
          ? 'pdf__application--edit'
          : 'pdf__application--read'
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
