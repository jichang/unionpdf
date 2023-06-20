import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import './components.css';
import {
  IconProps,
  ToolbarProps,
  ToolbarItemGroupProps,
  SelectProps,
  InputProps,
  TextAreaProps,
  CheckboxProps,
  RadioButtonProps,
  LabelProps,
  FormProps,
  DialogProps,
  ButtonProps,
  LinkProps,
} from '../uicomponents.context';

export function Icon(props: IconProps) {
  const { name, className, ...rest } = props;

  let svg: JSX.Element | null = null;
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

export function Button(props: ButtonProps) {
  const { className, ...rest } = props;
  return (
    <button className={classNames('pdf__ui__button', className)} {...rest} />
  );
}

export function Link(props: LinkProps) {
  const { className, ...rest } = props;
  return <a className={classNames('pdf__ui__link', className)} {...rest} />;
}

export function Toolbar(props: ToolbarProps) {
  const { className, ...rest } = props;
  return (
    <div className={classNames('pdf__ui__toolbar', className)} {...rest} />
  );
}

export function ToolbarItemGroup(props: ToolbarItemGroupProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={classNames('pdf__ui__toolbar__item__group', className)}
      {...rest}
    />
  );
}

export function Select(props: SelectProps) {
  const { className, options, ...rest } = props;

  return (
    <select className={classNames('pdf__ui__select', className)} {...rest}>
      {options.map((opt, index) => {
        return (
          <option value={opt.value} key={index}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
}

export function Input(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <input className={classNames('pdf__ui__input', className)} {...rest} />
  );
}

export function TextArea(props: TextAreaProps) {
  const { className, ...rest } = props;
  return (
    <textarea className={classNames('pdf__ui__input', className)} {...rest} />
  );
}

export function Checkbox(props: CheckboxProps) {
  const { className, ...rest } = props;
  return (
    <input
      type="checkbox"
      className={classNames('pdf__ui__checkbox', className)}
      {...rest}
    />
  );
}

export function RadioButton(props: RadioButtonProps) {
  const { className, ...rest } = props;
  return (
    <input
      type="radio"
      className={classNames('pdf__ui__radiobutton', className)}
      {...rest}
    />
  );
}

export function Label(props: LabelProps) {
  const { className, ...rest } = props;

  return (
    <label className={classNames('pdf__ui__label', className)} {...rest} />
  );
}

export function Form(props: FormProps) {
  const { className, ...rest } = props;

  return <form className={classNames('pdf__ui__form', className)} {...rest} />;
}

export function Dialog(props: DialogProps) {
  const { open, className, ...rest } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal?.();
    } else {
      dialogRef.current?.close?.();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={classNames('pdf__ui__dialog', className)}
      {...rest}
    />
  );
}

export const components = {
  Dialog,
  Toolbar,
  ToolbarItemGroup,
  Button,
  Icon,
  Link,
  Form,
  Label,
  Select,
  Input,
  TextArea,
  RadioButton,
  Checkbox,
};
