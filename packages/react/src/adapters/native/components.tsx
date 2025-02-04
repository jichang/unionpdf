import React, { JSX, useContext, useEffect, useMemo, useRef } from 'react';
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
  UIComponents,
  PanelProps,
  FormFieldProps,
} from '../uicomponents.context';
import ReactDOM from 'react-dom';

export function Icon(props: IconProps) {
  const { name, className, ...rest } = props;

  let svg: JSX.Element | null = null;
  switch (name) {
    case 'Drag':
      svg = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          focusable="false"
        >
          <path d="M406.4 246.4L480 176V384c0 19.2 12.8 32 32 32s32-12.8 32-32V176l73.6 73.6c6.4 3.2 12.8 6.4 22.4 6.4s16-3.2 22.4-9.6c12.8-12.8 12.8-32 0-44.8l-128-128c-3.2-3.2-6.4-6.4-9.6-6.4-6.4-3.2-16-3.2-25.6 0-3.2 3.2-6.4 3.2-9.6 6.4l-128 128c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0zM617.6 777.6L544 851.2V640c0-19.2-12.8-32-32-32s-32 12.8-32 32v211.2l-73.6-73.6c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l128 128c3.2 3.2 6.4 6.4 9.6 6.4 3.2 3.2 9.6 3.2 12.8 3.2s9.6 0 12.8-3.2c3.2-3.2 6.4-3.2 9.6-6.4l128-128c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0zM956.8 524.8c3.2-6.4 3.2-16 0-25.6-3.2-3.2-3.2-6.4-6.4-9.6l-128-128c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l73.6 73.6H640c-19.2 0-32 12.8-32 32s12.8 32 32 32h211.2l-73.6 73.6c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 16 9.6 22.4 9.6s16-3.2 22.4-9.6l128-128c3.2 0 6.4-6.4 6.4-9.6zM172.8 544H384c19.2 0 32-12.8 32-32s-12.8-32-32-32H172.8l73.6-73.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0l-128 128c-3.2 3.2-6.4 6.4-6.4 9.6-3.2 6.4-3.2 16 0 25.6 3.2 3.2 3.2 6.4 6.4 9.6l128 128c6.4 6.4 12.8 9.6 22.4 9.6s16-3.2 22.4-9.6c12.8-12.8 12.8-32 0-44.8L172.8 544z" />
        </svg>
      );
      break;
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
    case 'Close':
      svg = (
        <svg
          height="512px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
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

export function FormField(props: FormFieldProps) {
  const { className, ...rest } = props;

  return (
    <div className={classNames('pdf__ui__form__field', className)} {...rest} />
  );
}

export function Dialog(props: DialogProps) {
  const { isOpened, title, onClose, className, children, ...rest } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpened) {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      }
    }
  }, [isOpened]);

  return (
    <dialog
      ref={dialogRef}
      className={classNames('pdf__ui__dialog', className)}
      onClose={onClose}
      {...rest}
    >
      {isOpened ? (
        <>
          <header className="pdf__ui__dialog__header">
            <h2 className="pdf__ui__dialog__header__title">{title}</h2>
            <Button
              scenario={{ usage: 'dialog-close' }}
              onClick={onClose}
              data-testid="pdf__ui__dialog__close__btn"
            >
              <Icon name="Close" />
            </Button>
          </header>
          <section className="pdf__ui__dialog__content">{children}</section>
        </>
      ) : null}
    </dialog>
  );
}

export interface PanelMountPointContextValue {
  domElem: HTMLElement | null;
}

export const PanelMountPointContext =
  React.createContext<PanelMountPointContextValue>({ domElem: null });

export interface PanelMountPointContextProviderProps {
  domElem: HTMLElement | null;
  children: React.ReactNode;
}

export function PanelMountPointContextProvider(
  props: PanelMountPointContextProviderProps,
) {
  const { domElem, children } = props;

  const value = useMemo(() => {
    return {
      domElem,
    };
  }, [domElem]);

  return (
    <PanelMountPointContext.Provider value={value}>
      {children}
    </PanelMountPointContext.Provider>
  );
}

export function Panel(props: PanelProps) {
  const { isOpened, title, onClose, className, children, ...rest } = props;

  const { domElem } = useContext(PanelMountPointContext);

  return domElem
    ? ReactDOM.createPortal(
        <div className={classNames('pdf__ui__panel', className)} {...rest}>
          {isOpened ? (
            <section className="pdf__ui__panel__content">{children}</section>
          ) : null}
        </div>,
        domElem,
      )
    : null;
}

export const components: UIComponents = {
  Panel,
  Dialog,
  Toolbar,
  ToolbarItemGroup,
  Button,
  Icon,
  Link,
  Form,
  FormField,
  Label,
  Select,
  Input,
  TextArea,
  RadioButton,
  Checkbox,
};
