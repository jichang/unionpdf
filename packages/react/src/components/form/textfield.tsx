import { PDF_FORM_FIELD_FLAG } from '@unionpdf/models';
import React, { FormEvent, useCallback, useMemo } from 'react';
import { useUIComponents } from '../../adapters';
import { FieldCommonProps } from './common';

export interface TextFieldProps extends FieldCommonProps {}

/**
 *
 * @param props - properties of Text field
 * @returns TextField component
 */
export function TextField(props: TextFieldProps) {
  const { field, isEditable, config, onChangeValues } = props;

  const { flag } = field;
  const name = field.alternateName || field.name;
  const value = useMemo(() => {
    if (config?.values[0].kind === 'text') {
      return config?.values[0].text;
    }
    return field.value;
  }, [config?.values[0], field.value]);

  const changeValue = useCallback(
    (evt: FormEvent) => {
      const value = (evt.target as HTMLInputElement).value;
      onChangeValues?.([
        {
          kind: 'text',
          text: value,
        },
      ]);
    },
    [onChangeValues],
  );

  const isDisabled = !isEditable || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.REQUIRED);
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
