import {
  PdfWidgetAnnoObject,
  PDF_FORM_FIELD_FLAG,
  PdfWidgetAnnoField,
} from '@unionpdf/models';
import React from 'react';
import { usePdfApplication, PdfApplicationMode } from '../../core';
import { useUIComponents } from '../../adapters';

export interface PushButtonFieldProps {
  /**
   * Field info
   */
  field: PdfWidgetAnnoField;
}

/**
 *
 * @param props - properties of PushButton field
 * @returns PushButtonField component
 */
export function PushButtonField(props: PushButtonFieldProps) {
  const { field } = props;
  const { mode } = usePdfApplication();

  const { flag } = field;
  const name = field.alternateName || field.name;

  const isDisabled =
    mode === PdfApplicationMode.View || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const { Button } = useUIComponents();

  return (
    <Button
      scenario={{ usage: 'pdf-content-push-button' }}
      disabled={isDisabled}
      aria-label={name}
    >
      {name}
    </Button>
  );
}
