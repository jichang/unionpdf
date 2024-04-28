import { PDF_FORM_FIELD_FLAG, PdfWidgetAnnoField } from '@unionpdf/models';
import React from 'react';
import { useUIComponents } from '../../adapters';

export interface PushButtonFieldProps {
  /**
   * Field info
   */
  field: PdfWidgetAnnoField;
  /**
   * Whether this field is editable
   */
  isEditable: boolean;
}

/**
 *
 * @param props - properties of PushButton field
 * @returns PushButtonField component
 */
export function PushButtonField(props: PushButtonFieldProps) {
  const { field, isEditable } = props;

  const { flag } = field;
  const name = field.alternateName || field.name;

  const isDisabled = !isEditable || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

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
