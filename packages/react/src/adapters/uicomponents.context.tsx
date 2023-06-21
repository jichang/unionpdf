import React, { ComponentProps } from 'react';
import { createContext, useContext } from 'react';

export interface DialogProps extends ComponentProps<'dialog'> {}

export interface ToolbarProps extends ComponentProps<'div'> {}
export interface ToolbarItemGroupProps extends ComponentProps<'div'> {}

export interface LinkProps extends ComponentProps<'a'> {}
export interface ButtonProps extends ComponentProps<'button'> {}
export interface IconProps extends ComponentProps<'span'> {
  name: string;
}
export interface IconButtonProps extends ComponentProps<'button'> {
  iconName: string;
}

export interface FormProps extends ComponentProps<'form'> {}
export interface LabelProps extends ComponentProps<'label'> {}
export interface TextAreaProps extends ComponentProps<'textarea'> {}
export interface InputProps extends ComponentProps<'input'> {}
export interface SelectProps extends ComponentProps<'select'> {
  options: {
    label: string;
    value: string;
  }[];
}
export interface CheckboxProps extends ComponentProps<'input'> {}
export interface RadioButtonProps extends ComponentProps<'input'> {}

export type UIComponent<P> =
  | React.ComponentClass<P>
  | React.FunctionComponent<P>;

export interface UIComponents {
  Dialog: UIComponent<DialogProps>;
  Toolbar: UIComponent<ToolbarProps>;
  ToolbarItemGroup: UIComponent<ToolbarItemGroupProps>;
  Link: UIComponent<LinkProps>;
  Button: UIComponent<ButtonProps>;
  IconButton: UIComponent<IconButtonProps>;
  Icon: UIComponent<IconProps>;
  Form: UIComponent<FormProps>;
  Label: UIComponent<LabelProps>;
  TextArea: UIComponent<TextAreaProps>;
  Input: UIComponent<InputProps>;
  Select: UIComponent<SelectProps>;
  Checkbox: UIComponent<CheckboxProps>;
  RadioButton: UIComponent<RadioButtonProps>;
}

export const UIComponentsContext = createContext<UIComponents | null>(null);

export interface UIComponentsContextProviderProps {
  components: UIComponents;
  children: React.ReactNode;
}

export function UIComponentsContextProvider(
  props: UIComponentsContextProviderProps
) {
  const { children, components } = props;

  return (
    <UIComponentsContext.Provider value={components}>
      {children}
    </UIComponentsContext.Provider>
  );
}

export function useUIComponents() {
  const components = useContext(UIComponentsContext);
  if (!components) {
    throw new Error('Can not find components in context');
  }

  return components;
}
