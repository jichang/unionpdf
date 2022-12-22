import { PdfWidgetAnnoObject, PDF_FORM_FIELD_FLAG } from '@unionpdf/models';
import React from 'react';
import { usePdfApplication, PdfApplicationMode } from '../../core';
import { useUIComponents } from '../../ui';

export interface PushButtonFieldProps {
  field: PdfWidgetAnnoObject['field'];
}

export function PushButtonField(props: PushButtonFieldProps) {
  const { field } = props;
  const { mode } = usePdfApplication();

  const { flag } = field;
  const name = field.alternateName || field.name;

  const isDisabled =
    mode === PdfApplicationMode.Read || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const { ButtonComponent } = useUIComponents();

  return (
    <ButtonComponent disabled={isDisabled} aria-label={name}>
      {name}
    </ButtonComponent>
  );
}
