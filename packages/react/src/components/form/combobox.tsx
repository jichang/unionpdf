import {
  PdfWidgetAnnoObject,
  PdfWidgetAnnoOption,
  PDF_FORM_FIELD_FLAG,
} from '@unionpdf/models';
import React, { FormEvent, useCallback, useState } from 'react';
import { usePdfApplication, PdfApplicationMode } from '../../core';
import { useUIComponents } from '../../adapters';

export interface ComboboxFieldProps {
  field: PdfWidgetAnnoObject['field'];
}

export function ComboboxField(props: ComboboxFieldProps) {
  const { field } = props;
  const { mode } = usePdfApplication();

  const { flag, options } = field;
  const name = field.alternateName || field.name;
  const [values, setValues] = useState(() => {
    return options
      .filter((option: PdfWidgetAnnoOption) => {
        return option.isSelected;
      })
      .map((option) => {
        return option.label;
      });
  });

  const isDisabled =
    mode === PdfApplicationMode.View || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isMultipleChoice = !!(flag & PDF_FORM_FIELD_FLAG.CHOICE_MULTL_SELECT);

  const changeValue = useCallback(
    (evt: FormEvent) => {
      const target = evt.target as HTMLSelectElement;
      if (isMultipleChoice) {
        const values: string[] = [];
        for (let option of target.selectedOptions) {
          values.push(option.value);
        }
        setValues(values);
      } else {
        setValues([target.value]);
      }
    },
    [isMultipleChoice, setValues]
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
      onChange={changeValue}
      options={options.map((opt: PdfWidgetAnnoOption) => {
        return {
          value: opt.label,
          label: opt.label,
        };
      })}
    />
  );
}
