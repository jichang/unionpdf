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

export interface RadioButtonFieldProps {
  /**
   * Field info
   */
  field: PdfWidgetAnnoField;
}

/**
 *
 * @param props - properties of RadioButton field
 * @returns RadioButtonField component
 */
export function RadioButtonField(props: RadioButtonFieldProps) {
  const { field } = props;
  const { mode } = usePdfApplication();

  const { type, flag, options } = field;
  const name = field.alternateName || field.name;
  const [value] = useState(() => {
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

  const [isChecked, setIsChecked] = useState(field.isChecked);
  const changeIsChecked = useCallback(
    (evt: FormEvent) => {
      setIsChecked((isChecked: boolean) => {
        return !isChecked;
      });
    },
    [setIsChecked]
  );

  const isDisabled =
    mode === PdfApplicationMode.View || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const { RadioButton } = useUIComponents();

  return (
    <RadioButton
      required={isRequired}
      disabled={isDisabled}
      name={name}
      aria-label={name}
      value={value}
      checked={isChecked}
      onChange={changeIsChecked}
    />
  );
}
