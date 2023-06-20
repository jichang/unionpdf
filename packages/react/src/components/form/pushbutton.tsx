import { PdfWidgetAnnoObject, PDF_FORM_FIELD_FLAG } from '@unionpdf/models';
import React from 'react';
import { usePdfApplication, PdfApplicationMode } from '../../core';
import { useUIComponents } from '../../adapters';

export interface PushButtonFieldProps {
  field: PdfWidgetAnnoObject['field'];
}

export function PushButtonField(props: PushButtonFieldProps) {
  const { field } = props;
  const { mode } = usePdfApplication();

  const { flag } = field;
  const name = field.alternateName || field.name;

  const isDisabled =
    mode === PdfApplicationMode.View || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const { Button } = useUIComponents();

  return (
    <Button disabled={isDisabled} aria-label={name}>
      {name}
    </Button>
  );
}
