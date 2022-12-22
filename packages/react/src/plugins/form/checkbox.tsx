import { PdfWidgetAnnoObject, PDF_FORM_FIELD_FLAG } from '@unionpdf/models';
import React, { FormEvent, useCallback, useState } from 'react';
import { usePdfApplication, PdfApplicationMode } from '../../core';
import { useUIComponents } from '../../ui';

export interface CheckboxFieldProps {
  field: PdfWidgetAnnoObject['field'];
}

export function CheckboxField(props: CheckboxFieldProps) {
  const { field } = props;
  const { mode } = usePdfApplication();

  const { flag } = field;
  const name = field.alternateName || field.name;
  const [value, setValue] = useState(field.value);

  const changeValue = useCallback(
    (evt: FormEvent) => {
      setValue((evt.target as HTMLInputElement | HTMLSelectElement).value);
    },
    [setValue]
  );

  const isDisabled =
    mode === PdfApplicationMode.Read || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const { CheckboxComponent } = useUIComponents();

  return (
    <CheckboxComponent
      required={isRequired}
      disabled={isDisabled}
      name={name}
      aria-label={name}
      value={value === 'Yes' ? 'Off' : 'Yes'}
      checked={value === 'Yes'}
      onChange={changeValue}
    />
  );
}
