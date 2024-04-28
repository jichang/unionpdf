import { PDF_FORM_FIELD_FLAG } from '@unionpdf/models';
import React, { FormEvent, useCallback } from 'react';
import { useUIComponents } from '../../adapters';
import { FieldCommonProps } from './common';

/**
 * Properties of form checkbox field
 */
export interface CheckboxFieldProps extends FieldCommonProps {}

/**
 *
 * @param props - properties of Checkbox field
 * @returns CheckboxField component
 */
export function CheckboxField(props: CheckboxFieldProps) {
  const { field, isEditable, config, onChangeValues } = props;

  const { flag } = field;
  const name = field.alternateName || field.name;
  const value = config?.values[0] || field.value;

  const handleChange = useCallback(
    (evt: FormEvent) => {
      const value = (evt.target as HTMLInputElement | HTMLSelectElement).value;
      onChangeValues?.([value]);
    },
    [onChangeValues],
  );

  const isDisabled = !isEditable || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const { Checkbox } = useUIComponents();

  return (
    <Checkbox
      required={isRequired}
      disabled={isDisabled}
      name={name}
      aria-label={name}
      value={value === 'Yes' ? 'Off' : 'Yes'}
      checked={value === 'Yes'}
      onChange={handleChange}
    />
  );
}
