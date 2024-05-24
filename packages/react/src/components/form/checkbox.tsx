import { PDF_FORM_FIELD_FLAG } from '@unionpdf/models';
import React, { FormEvent, useCallback, useMemo } from 'react';
import { useUIComponents } from '../../adapters';
import { FieldCommonProps } from './common';

/**
 * Properties of form checkbox field
 */
export interface CheckboxFieldProps extends FieldCommonProps { }

/**
 *
 * @param props - properties of Checkbox field
 * @returns CheckboxField component
 */
export function CheckboxField(props: CheckboxFieldProps) {
  const { field, isEditable, config, onChangeValues } = props;

  const { flag } = field;
  const name = field.alternateName || field.name;

  const handleChange = useCallback(
    (evt: FormEvent) => {
      const isChecked = (evt.target as HTMLInputElement).checked;
      onChangeValues?.([{ kind: 'checked', isChecked }]);
    },
    [onChangeValues],
  );

  const isChecked = useMemo(() => {
    if (config?.values[0].kind === 'checked') {
      return config.values[0].isChecked;
    }

    return field.isChecked;
  }, [field.isChecked, config?.values[0]]);

  const isDisabled = !isEditable || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const { Checkbox } = useUIComponents();

  return (
    <Checkbox
      required={isRequired}
      disabled={isDisabled}
      name={name}
      aria-label={name}
      value={field.value}
      checked={isChecked}
      onChange={handleChange}
    />
  );
}
