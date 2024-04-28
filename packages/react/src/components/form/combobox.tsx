import { PdfWidgetAnnoOption, PDF_FORM_FIELD_FLAG } from '@unionpdf/models';
import React, { FormEvent, useCallback, useMemo } from 'react';
import { useUIComponents } from '../../adapters';
import { FieldCommonProps } from './common';

export interface ComboboxFieldProps extends FieldCommonProps {}

/**
 *
 * @param props - properties of Combobox field
 * @returns ComboboxField component
 */
export function ComboboxField(props: ComboboxFieldProps) {
  const { field, isEditable, config, onChangeValues } = props;

  const { flag, options } = field;
  const name = field.alternateName || field.name;
  const defalutValues = useMemo(() => {
    return options
      .filter((option: PdfWidgetAnnoOption) => {
        return option.isSelected;
      })
      .map((option) => {
        return option.label;
      });
  }, [options]);

  const values = config?.values || defalutValues;

  const isDisabled = !isEditable || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isMultipleChoice = !!(flag & PDF_FORM_FIELD_FLAG.CHOICE_MULTL_SELECT);

  const handleChange = useCallback(
    (evt: FormEvent) => {
      const value = (evt.target as HTMLInputElement | HTMLSelectElement).value;
      onChangeValues?.([value]);
    },
    [onChangeValues],
  );

  const { Select } = useUIComponents();

  return (
    <Select
      required={isRequired}
      disabled={isDisabled}
      multiple={isMultipleChoice}
      name={name}
      aria-label={name}
      value={isMultipleChoice ? values : values[0]}
      onChange={handleChange}
      options={options.map((opt: PdfWidgetAnnoOption) => {
        return {
          value: opt.label,
          label: opt.label,
        };
      })}
    />
  );
}
