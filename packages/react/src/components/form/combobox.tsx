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
        return {
          kind: 'text',
          text: option.label,
        };
      });
  }, [options]);

  const values = config?.values || defalutValues;

  const isDisabled = !isEditable || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isMultipleChoice = !!(flag & PDF_FORM_FIELD_FLAG.CHOICE_MULTL_SELECT);

  const handleChange = useCallback(
    (evt: FormEvent) => {
      const value = (evt.target as HTMLSelectElement).value;
      onChangeValues?.([{ kind: 'text', text: value }]);
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
      value={
        isMultipleChoice
          ? values.map((value) => {
              return value.kind === 'text' ? value.text : 'On';
            })
          : values[0].kind === 'text'
            ? values[0].text
            : ''
      }
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
