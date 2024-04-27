import React from 'react';
import { createContext, useContext } from 'react';

/**
 * Strings used in the application
 */
export interface UIStrings {
  unknownError: string;
  rotate0Deg: string;
  rotate90Deg: string;
  rotate180Deg: string;
  rotate270Deg: string;
  thumbnails: string;
  bookmarks: string;
  noBookmarks: string;
  saveAs: string;
  print: string;
  metadata: string;
  title: string;
  author: string;
  subject: string;
  keywords: string;
  producer: string;
  creator: string;
  creationDate: string;
  modificationDate: string;
  search: string;
  nextMatch: string;
  previousMatch: string;
  matchCase: string;
  matchWholeWord: string;
  matchConsecutive: string;
  attchments: string;
  noAttachments: string;
  fileName: string;
  fileSize: string;
  fileCreationDate: string;
  download: string;
  upload: string;
  signatures: string;
  noSignatures: string;
  extract: string;
  pencil: string;
  fillForm: string;
  stamps: string;
  addTextBox: string;
  addStamp: string;
  addImage: string;
  selection: string;
  annotation: string;
  createStamp: string;
  cancel: string;
  exit: string;
  edit: string;
  open: string;
  save: string;
  commit: string;
  discard: string;
  uncommittedWarning: string;
  printing: string;
  remove: string;
  noFiles: string;
  merge: string;
  merging: string;
  extractPages: string;
  extractText: string;
}

/**
 * Context contains all the strings
 */
export const UIStringsContext = createContext<UIStrings | null>(null);

/**
 * Properties of UIStringsContextProvider
 */
export interface UIStringsContextProviderProps {
  /**
   * customized ui strings
   */
  strings: UIStrings;
  children: React.ReactNode;
}

/**
 * Provider of ui strings, use this to customize the text in this application
 * @param props - properties of UIStringsContextProvider
 * @returns
 *
 * @public
 */
export function UIStringsContextProvider(props: UIStringsContextProviderProps) {
  const { children, strings } = props;

  return (
    <UIStringsContext.Provider value={strings}>
      {children}
    </UIStringsContext.Provider>
  );
}

/**
 * Hooks for retrieve strings
 * @returns ui strings
 *
 * @public
 */
export function useUIStrings() {
  const strings = useContext(UIStringsContext);
  if (!strings) {
    throw new Error('Can not find strings in context');
  }

  return strings;
}
