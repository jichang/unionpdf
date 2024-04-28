import React from 'react';
import { PdfWidgetAnnoObject } from '@unionpdf/models';
import './widget.css';
import { Field } from '../form';
import { PdfPageAnnotationProps } from '../common';

/**
 * Pdf form fied
 */
export interface PdfFormFieldConfig {
  values: string[];
}

/**
 * Properties of PdfPageWidgetAnnotation
 */
export interface PdfPageWidgetAnnotationProps extends PdfPageAnnotationProps {
  /**
   * Pdf widget annotation object
   */
  annotation: PdfWidgetAnnoObject;
  /**
   * Whether this field is editable
   */
  isEditable?: boolean;
  /**
   * Field settings
   */
  config?: PdfFormFieldConfig;
  /**
   * callback for value change
   */
  onChangeValues?: (values: string[]) => void;
}

/**
 * Pdf widget annotation component
 * @param props - properties of PdfPageWidgetAnnotation
 * @returns
 *
 * @public
 */
export function PdfPageWidgetAnnotation(props: PdfPageWidgetAnnotationProps) {
  const {
    page,
    annotation,
    isEditable = false,
    config,
    onChangeValues,
  } = props;

  return (
    <Field
      page={page}
      annotation={annotation}
      field={annotation.field}
      isEditable={isEditable}
      config={config}
      onChangeValues={onChangeValues}
    />
  );
}
