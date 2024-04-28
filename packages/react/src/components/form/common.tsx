import { ComponentProps } from 'react';
import {
  PdfAnnotationObject,
  PdfPageObject,
  PdfWidgetAnnoField,
} from '@unionpdf/models';
import './field.css';
import { PdfFormFieldConfig } from '../annotations';

export interface FieldCommonProps extends ComponentProps<'div'> {
  /**
   * page object that annotation is belonged to
   */
  page: PdfPageObject;
  /**
   * pdf annotation object
   */
  annotation: PdfAnnotationObject;
  /**
   * Field info
   */
  field: PdfWidgetAnnoField;
  /**
   * Whether this field is editable
   */
  isEditable: boolean;
  /**
   * config
   */
  config?: PdfFormFieldConfig;
  /**
   * callback for value change
   */
  onChangeValues?: (values: string[]) => void;
}
