import React, { ComponentProps } from 'react';
import './ui.css';

export interface ButtonProps extends ComponentProps<'button'> {}

export function Button(props: ButtonProps) {
  return <button {...props} />;
}

export interface ToolbarProps extends ComponentProps<'div'> {}

export function Toolbar(props: ToolbarProps) {
  return <div {...props} />;
}

export interface SelectProps extends ComponentProps<'select'> {
  options: {
    label: string;
    value: string;
  }[];
}

export function Select(props: SelectProps) {
  const { options, ...rest } = props;

  return (
    <select {...rest}>
      {options.map((option, index) => {
        return (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}

export interface InputProps extends ComponentProps<'input'> {}

export function Input(props: InputProps) {
  return <input {...props} />;
}
