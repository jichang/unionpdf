import { PdfWidgetAnnoObject, PDF_FORM_FIELD_TYPE } from '@unionpdf/models';
import React from 'react';
import './field.css';
import { CheckboxField } from './checkbox';
import { ComboboxField } from './combobox';
import { PushButtonField } from './pushbutton';
import { RadioButtonField } from './radiobutton';
import { TextField } from './textfield';

export interface FieldProps {
  field: PdfWidgetAnnoObject['field'];
}

export function Field(props: FieldProps) {
  const { field } = props;

  let content = null;
  const { type } = field;

  switch (type) {
    case PDF_FORM_FIELD_TYPE.TEXTFIELD:
      content = <TextField field={field} />;
      break;
    case PDF_FORM_FIELD_TYPE.CHECKBOX:
      content = <CheckboxField field={field} />;
      break;
    case PDF_FORM_FIELD_TYPE.RADIOBUTTON:
      content = <RadioButtonField field={field} />;
      break;
    case PDF_FORM_FIELD_TYPE.COMBOBOX:
      content = <ComboboxField field={field} />;
      break;
    case PDF_FORM_FIELD_TYPE.LISTBOX:
      content = <ComboboxField field={field} />;
      break;
    case PDF_FORM_FIELD_TYPE.PUSHBUTTON:
      content = <PushButtonField field={field} />;
      break;
    default:
      break;
  }

  return <div className="pdf__form__field">{content}</div>;
}
