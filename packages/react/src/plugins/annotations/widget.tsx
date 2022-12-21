import React, { FormEvent, useCallback, useState } from 'react';
import {
  PdfPageObject,
  PdfWidgetAnnoObject,
  PDF_FORM_FIELD_FLAG,
  PDF_FORM_FIELD_TYPE,
  Rotation,
} from '@unionpdf/models';
import './widget.css';
import { PdfPageAnnotationBase } from './annotation';
import { PdfApplicationMode, usePdfApplication } from '../../core';
import { useUIComponents } from '../../ui';

export interface PdfPageWidgetAnnotationProps {
  page: PdfPageObject;
  annotation: PdfWidgetAnnoObject;
  scaleFactor: number;
  rotation: Rotation;
}

export function PdfPageWidgetAnnotation(props: PdfPageWidgetAnnotationProps) {
  const { page, annotation, scaleFactor, rotation } = props;
  const { mode } = usePdfApplication();

  let content = null;
  const { type, flag, options } = annotation.field;
  const name = annotation.field.alternateName || annotation.field.name;
  const [value, setValue] = useState(() => {
    switch (type) {
      case PDF_FORM_FIELD_TYPE.COMBOBOX:
        let option = options.find((option) => {
          return option.isSelected;
        });
        return option?.label || annotation.field.value;
      default:
        return annotation.field.value;
    }
  });

  const [isChecked, setIsChecked] = useState(annotation.field.isChecked);
  const changeIsChecked = useCallback(
    (evt: FormEvent) => {
      setIsChecked((isChecked) => {
        return !isChecked;
      });
    },
    [setIsChecked]
  );

  const changeValue = useCallback(
    (evt: FormEvent) => {
      setValue((evt.target as HTMLInputElement | HTMLSelectElement).value);
    },
    [setValue]
  );

  const isDisabled =
    mode === PdfApplicationMode.Read || !!(flag & PDF_FORM_FIELD_FLAG.READONLY);
  const isRequired = !!(flag & PDF_FORM_FIELD_FLAG.READONLY);

  const {
    ButtonComponent,
    InputComponent,
    RadioButtonComponent,
    CheckboxComponent,
    SelectComponent,
  } = useUIComponents();

  switch (type) {
    case PDF_FORM_FIELD_TYPE.TEXTFIELD:
      content = (
        <InputComponent
          required={isRequired}
          disabled={isDisabled}
          type="text"
          name={name}
          aria-label={name}
          value={value}
          onChange={changeValue}
        />
      );
      break;
    case PDF_FORM_FIELD_TYPE.CHECKBOX:
      content = (
        <CheckboxComponent
          required={isRequired}
          disabled={isDisabled}
          name={name}
          aria-label={name}
          value={value === 'Yes' ? 'Off' : 'Yes'}
          checked={value === 'Yes'}
          onChange={changeValue}
        />
      );
      break;
    case PDF_FORM_FIELD_TYPE.RADIOBUTTON:
      content = (
        <RadioButtonComponent
          required={isRequired}
          disabled={isDisabled}
          name={name}
          aria-label={name}
          value={value}
          checked={isChecked}
          onChange={changeIsChecked}
        />
      );
      break;
    case PDF_FORM_FIELD_TYPE.COMBOBOX:
    case PDF_FORM_FIELD_TYPE.LISTBOX:
      content = (
        <SelectComponent
          required={isRequired}
          disabled={isDisabled}
          multiple={!!(flag & PDF_FORM_FIELD_FLAG.CHOICE_MULTL_SELECT)}
          name={name}
          aria-label={name}
          value={value}
          onChange={changeValue}
          options={options.map((opt) => {
            return {
              value: opt.label,
              label: opt.label,
            };
          })}
        />
      );
      break;
    case PDF_FORM_FIELD_TYPE.PUSHBUTTON:
      content = (
        <ButtonComponent
          disabled={isDisabled}
          aria-label={annotation.field.alternateName}
        >
          {annotation.field.alternateName}
        </ButtonComponent>
      );
      break;
    default:
      break;
  }

  return (
    <PdfPageAnnotationBase
      page={page}
      className="pdf__annotation--widget"
      annotation={annotation}
      scaleFactor={scaleFactor}
      rotation={rotation}
    >
      {content}
    </PdfPageAnnotationBase>
  );
}
