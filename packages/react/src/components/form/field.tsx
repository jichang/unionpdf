import { PDF_FORM_FIELD_TYPE, PdfWidgetAnnoField } from '@unionpdf/models';
import React from 'react';
import './field.css';
import { CheckboxField } from './checkbox';
import { ComboboxField } from './combobox';
import { PushButtonField } from './pushbutton';
import { RadioButtonField } from './radiobutton';
import { TextField } from './textfield';
import { FieldCommonProps } from './common';

export interface FieldProps extends FieldCommonProps {}

/**
 *
 * @param props - properties of Field
 * @returns Field component
 */
export function Field(props: FieldProps) {
  const { field } = props;

  let content = null;
  const { type } = field;

  switch (type) {
    case PDF_FORM_FIELD_TYPE.TEXTFIELD:
      content = <TextField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.CHECKBOX:
      content = <CheckboxField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.RADIOBUTTON:
      content = <RadioButtonField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.COMBOBOX:
      content = <ComboboxField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.LISTBOX:
      content = <ComboboxField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.PUSHBUTTON:
      content = <PushButtonField {...props} />;
      break;
    default:
      break;
  }

  return <div className="pdf__form__field">{content}</div>;
}
