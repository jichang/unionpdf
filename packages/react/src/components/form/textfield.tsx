import {
  PdfWidgetAnnoObject,
  PdfWidgetAnnoOption,
  PDF_FORM_FIELD_FLAG,
  PDF_FORM_FIELD_TYPE,
  PdfWidgetAnnoField,
} from '@unionpdf/models';
import React, { FormEvent, useCallback, useState } from 'react';
import { usePdfApplication, PdfApplicationMode } from '../../core';
import { useUIComponents } from '../../adapters';

export interface TextFieldProps {
  /**
   * Field info
   */
  field: PdfWidgetAnnoField;
}

/**
 *
 * @param props - properties of Text field
 * @returns TextField component
 */
export function TextField(props: TextFieldProps) {
  const { field } = props;
  const { mode } = usePdfApplication();

  const { type, flag, options } = field;
  const name = field.alternateName || field.name;
  const [value, setValue] = useState(() => {
    switch (type) {
      case PDF_FORM_FIELD_TYPE.COMBOBOX:
        let option = options.find((option: PdfWidgetAnnoOption) => {
          return option.isSelected;
        });
        return option?.label || field.value;
      default:
        return field.value;
    }
  });

  const changeValue = useCallback(
    (evt: FormEvent) => {
      setValue((evt.target as HTMLInputElement | HTMLSelectElement).value);
    },
    [setValue],
  );

  const isDisabled =
    mode === PdfApplicationMode.View || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isPassword = !!(flag & PDF_FORM_FIELD_FLAG.TEXT_PASSWORD);
  const isMultipleLine = !!(flag & PDF_FORM_FIELD_FLAG.TEXT_MULTIPLINE);

  const { TextArea, Input } = useUIComponents();

  return isMultipleLine ? (
    <TextArea
      required={isRequired}
      disabled={isDisabled}
      name={name}
      aria-label={name}
      value={value}
      onChange={changeValue}
    />
  ) : (
    <Input
      required={isRequired}
      disabled={isDisabled}
      type={isPassword ? 'password' : 'text'}
      name={name}
      aria-label={name}
      value={value}
      onChange={changeValue}
    />
  );
}
