import React, { ComponentProps } from 'react';
import { createContext, useContext } from 'react';
import { PdfApplicatinPluginKey } from '../core';

export interface AdaptableComponent<S> {
  scenario:
    | S
    | {
        usage: 'test';
      };
}

export type DialogScenario =
  | {
      usage: 'stamp';
    }
  | {
      usage: 'uncommitted-changes';
    }
  | {
      usage: 'plugin';
      pluginKey: PdfApplicatinPluginKey;
    };

export interface DialogProps
  extends Omit<ComponentProps<'dialog'>, 'open'>,
    AdaptableComponent<DialogScenario> {
  title: string;
  isOpened: boolean;
  onClose: () => void;
  onClosed?: () => void;
}

export type PanelScenario = {
  usage: 'plugin';
  pluginKey: PdfApplicatinPluginKey;
};

export interface PanelProps
  extends ComponentProps<'div'>,
    AdaptableComponent<PanelScenario> {
  isOpened: boolean;
  onClose: () => void;
  onClosed?: () => void;
}

export type ToolbarScenario = {
  usage: 'pdf-toolbar-plugin';
};

export interface ToolbarProps
  extends ComponentProps<'div'>,
    AdaptableComponent<ToolbarScenario> {}

export type ToolbarItemGroupScenario =
  | {
      usage: 'editor-plugin-operation-item-group';
    }
  | {
      usage: 'editor-plugin-file-item-group';
    }
  | {
      usage: 'pages-plugin-item-group';
    }
  | {
      usage: 'plugins-plugin-item-group';
    }
  | {
      usage: 'plugins-file-item-group';
    };

export interface ToolbarItemGroupProps
  extends ComponentProps<'div'>,
    AdaptableComponent<ToolbarItemGroupScenario> {}

export type LinkScenario = {
  usage: 'downloader';
};

export interface LinkProps
  extends ComponentProps<'a'>,
    AdaptableComponent<LinkScenario> {}

export type ButtonScenario =
  | {
      usage: 'annotation-resizer';
    }
  | {
      usage: 'dialog-close';
    }
  | {
      usage: 'extractor-extract-pages';
    }
  | {
      usage: 'extractor-extract-text';
    }
  | {
      usage: 'editor-panel-selection';
    }
  | {
      usage: 'editor-panel-pencil';
    }
  | {
      usage: 'start-create-stamp';
    }
  | {
      usage: 'cancel-create-stamp';
    }
  | {
      usage: 'confirm-create-stamp';
    }
  | {
      usage: 'editor-operation-annotation';
    }
  | {
      usage: 'editor-operation-stamp';
    }
  | {
      usage: 'editor-operation-extract';
    }
  | {
      usage: 'editor-operation-commit';
    }
  | {
      usage: 'editor-operation-exit';
    }
  | {
      usage: 'editor-operation-discard';
    }
  | {
      usage: 'editor-operation-extract';
    }
  | {
      usage: 'pdf-content-push-button';
    }
  | {
      usage: 'merger-start-merge';
    }
  | {
      usage: 'merger-remove-file';
    }
  | {
      usage: 'attachment-download';
    }
  | {
      usage: 'cancel-print';
    }
  | {
      usage: 'plugin-toggle';
      pluginKey: PdfApplicatinPluginKey;
    };

export interface ButtonProps
  extends ComponentProps<'button'>,
    AdaptableComponent<ButtonScenario> {}

export type FormScenario = {
  usage: 'search';
};
export interface FormProps
  extends ComponentProps<'form'>,
    AdaptableComponent<FormScenario> {}

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

export interface IconProps extends ComponentProps<'span'> {
  name: string;
}

export type UIComponent<P> =
  | React.ComponentClass<P>
  | React.FunctionComponent<P>;

/**
 * components used in the application
 */
export interface UIComponents {
  Panel: UIComponent<PanelProps>;
  Dialog: UIComponent<DialogProps>;
  Toolbar: UIComponent<ToolbarProps>;
  ToolbarItemGroup: UIComponent<ToolbarItemGroupProps>;
  Link: UIComponent<LinkProps>;
  Button: UIComponent<ButtonProps>;
  Icon: UIComponent<IconProps>;
  Form: UIComponent<FormProps>;
  Label: UIComponent<LabelProps>;
  TextArea: UIComponent<TextAreaProps>;
  Input: UIComponent<InputProps>;
  Select: UIComponent<SelectProps>;
  Checkbox: UIComponent<CheckboxProps>;
  RadioButton: UIComponent<RadioButtonProps>;
}

/**
 * Context contains all the components
 */
export const UIComponentsContext = createContext<UIComponents | null>(null);

/**
 * Properties of UIComponentsContextProvider
 */
export interface UIComponentsContextProviderProps {
  /**
   * customized ui components
   */
  components: UIComponents;
  children: React.ReactNode;
}

/**
 * Provider of ui components, use this to customize the text in this application
 * @param props - properties of UIComponentsContextProvider
 * @returns
 *
 * @beta
 */
export function UIComponentsContextProvider(
  props: UIComponentsContextProviderProps,
) {
  const { children, components } = props;

  return (
    <UIComponentsContext.Provider value={components}>
      {children}
    </UIComponentsContext.Provider>
  );
}

/**
 * Hooks for retrieve components
 * @returns ui components
 *
 * @public
 */
export function useUIComponents() {
  const components = useContext(UIComponentsContext);
  if (!components) {
    throw new Error('Can not find components in context');
  }

  return components;
}
