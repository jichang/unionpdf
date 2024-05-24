import { PdfWidgetAnnoOption, PDF_FORM_FIELD_FLAG } from '@unionpdf/models';
import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import { useUIComponents } from '../../adapters';
import { FieldCommonProps } from './common';

export interface RadioButtonFieldProps extends FieldCommonProps {}

/**
 *
 * @param props - properties of RadioButton field
 * @returns RadioButtonField component
 */
export function RadioButtonField(props: RadioButtonFieldProps) {
  const { field, isEditable, config, onChangeValues } = props;

  const { flag, options } = field;
  const name = field.alternateName || field.name;
  const defaultValue = useMemo(() => {
    const option = options.find((option: PdfWidgetAnnoOption) => {
      return option.isSelected;
    });
    return option?.label || field.value;
  }, [options]);

  const isChecked = useMemo(() => {
    if (config?.values[0].kind === 'checked') {
      return config.values[0].isChecked;
    }

    return field.isChecked;
  }, [field.isChecked, config?.values[0]]);

  const handleChange = useCallback(
    (evt: FormEvent) => {
      const isChecked = (evt.target as HTMLInputElement).checked;
      onChangeValues?.([{ kind: 'checked', isChecked }]);
    },
    [onChangeValues],
  );

  const isDisabled = !isEditable || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const { RadioButton } = useUIComponents();

  return (
    <RadioButton
      required={isRequired}
      disabled={isDisabled}
      name={name}
      aria-label={name}
      value={defaultValue}
      checked={isChecked}
      onChange={handleChange}
    />
  );
}
