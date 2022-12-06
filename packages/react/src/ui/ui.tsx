import React, { ComponentProps } from 'react';
import './ui.css';
import classNames from 'classnames';

export interface IconProps extends ComponentProps<'span'> {
  name: string;
}

export function Icon(props: IconProps) {
  const { name, className, ...rest } = props;

  let svg = null;
  switch (name) {
    case 'ArrowRight':
      svg = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
          focusable="false"
        >
          <path d="M512 0l1024 1024L512 2048V0z"></path>
        </svg>
      );
      break;
    case 'ArrowDown':
      svg = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
          focusable="false"
        >
          <path d="M0 640h2048L1024 1664 0 640z"></path>
        </svg>
      );
      break;
  }

  return (
    <span
      role="img"
      className={classNames('pdf__ui__icon', className)}
      data-name={name}
      {...rest}
    >
      {svg}
    </span>
  );
}

export interface ButtonProps extends ComponentProps<'button'> {}

export function Button(props: ButtonProps) {
  const { className, ...rest } = props;
  return (
    <button className={classNames('pdf__ui__button', className)} {...rest} />
  );
}

export interface ToolbarProps extends ComponentProps<'div'> {}

export function Toolbar(props: ToolbarProps) {
  const { className, ...rest } = props;
  return (
    <div className={classNames('pdf__ui__toolbar', className)} {...rest} />
  );
}

export interface ToolbarItemGroupProps extends ComponentProps<'div'> {}

export function ToolbarItemGroup(props: ToolbarItemGroupProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={classNames('pdf__ui__toolbar__item__group', className)}
      {...rest}
    />
  );
}

export interface SelectProps extends ComponentProps<'select'> {
  options: {
    label: string;
    value: string;
  }[];
}

export function Select(props: SelectProps) {
  const { className, options, ...rest } = props;

  return (
    <select className={classNames('pdf__ui__select', className)} {...rest}>
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
  const { className, ...rest } = props;
  return (
    <input className={classNames('pdf__ui__input', className)} {...rest} />
  );
}
