import React from 'react';
import { createContext, useContext } from 'react';
import {
  Link,
  Button,
  Checkbox,
  Dialog,
  Form,
  Icon,
  Input,
  Label,
  RadioButton,
  Select,
  TextArea,
  Toolbar,
  ToolbarItemGroup,
} from './ui';

export const DEFAULT_UI_COMPONENTS = {
  ToolbarComponent: Toolbar,
  ToolbarItemGroupComponent: ToolbarItemGroup,
  ButtonComponent: Button,
  SelectComponent: Select,
  InputComponent: Input,
  IconComponent: Icon,
  CheckboxComponent: Checkbox,
  FormComponent: Form,
  LabelComponent: Label,
  RadioButtonComponent: RadioButton,
  TextAreaComponnet: TextArea,
  DialogComponent: Dialog,
  LinkComponent: Link,
};

export type UIComponents = typeof DEFAULT_UI_COMPONENTS;

export const UIComponentsContext = createContext<UIComponents>(
  DEFAULT_UI_COMPONENTS
);

export interface UIComponentsContextProviderProps {
  components: Partial<UIComponents>;
  children: JSX.Element;
}

export function UIComponentsContextProvider(
  props: UIComponentsContextProviderProps
) {
  const { children, components } = props;

  return (
    <UIComponentsContext.Provider
      value={{ ...DEFAULT_UI_COMPONENTS, ...components }}
    >
      {children}
    </UIComponentsContext.Provider>
  );
}

export function useUIComponents() {
  return useContext(UIComponentsContext);
}

export function useUIComponent<T extends keyof UIComponents>(is: T) {
  const binding = useUIComponents();
  return binding[is];
}

export function useButtonComponent() {
  return useUIComponent('ButtonComponent');
}

export function useToolbarComponent() {
  return useUIComponent('ToolbarComponent');
}

export function useSelectComponent() {
  return useUIComponent('SelectComponent');
}

export function useInputComponent() {
  return useUIComponent('InputComponent');
}

export const DEFAULT_UI_STRINGS = {
  unknownError: 'Unknown Error',
  rotate0Deg: '0 degree',
  rotate90Deg: '90 degree',
  rotate180Deg: '180 degree',
  rotate270Deg: '270 degree',
  thumbnails: 'Thumbnails',
  bookmarks: 'Bookmarks',
  saveAs: 'Save As',
  print: 'Print',
  metadata: 'Metadata',
  title: 'Title',
  author: 'Author',
  subject: 'Subject',
  keywords: 'Keywords',
  producer: 'Producer',
  creator: 'Creator',
  creationDate: 'Creation Date',
  modificationDate: 'Modification Date',
  search: 'Search',
  nextMatch: 'Next',
  previousMatch: 'Next',
  matchCase: 'Match Case',
  matchWholeWord: 'Match Whole Word',
  matchConsecutive: 'Match Consecutive',
  attchments: 'Attachments',
  noAttachments: 'No Attachments',
  fileName: 'Name',
  fileSize: 'Size',
  fileCreationDate: 'Creation Date',
  download: 'Download',
  upload: 'Upload',
  signatures: 'Signatures',
  noSignatures: 'No Signatures',
  extract: 'Extract',
  pencil: 'Pencil',
  addTextBox: 'Add Text Box',
  addStamp: 'Add Stamp',
  addImage: 'Add Image',
  selection: 'Selection',
  annotation: 'Annotation',
  createStamp: 'Create Stamp',
  cancel: 'Cancel',
  exit: 'Exit',
  edit: 'Edit',
  open: 'Open',
  save: 'Save',
  discard: 'Discard',
  uncommittedWarning:
    'You have changes that is not committed, do you want to save those changes ?',
  printing: 'Printing',
  remove: 'Remove',
  noFiles: 'No Files',
  merge: 'Merge',
  merging: 'Merging',
};

export type UIStrings = typeof DEFAULT_UI_STRINGS;

export const UIStringsContext = createContext<UIStrings>(DEFAULT_UI_STRINGS);

export interface UIStringsContextProviderProps {
  strings: Partial<UIStrings>;
  children: JSX.Element;
}

export function UIStringsContextProvider(props: UIStringsContextProviderProps) {
  const { children, strings } = props;

  return (
    <UIStringsContext.Provider value={{ ...DEFAULT_UI_STRINGS, ...strings }}>
      {children}
    </UIStringsContext.Provider>
  );
}

export function useUIStrings() {
  return useContext(UIStringsContext);
}

export function useUIString<T extends keyof UIStrings>(key: T) {
  const strings = useContext(UIStringsContext);

  return strings[key] || key;
}
