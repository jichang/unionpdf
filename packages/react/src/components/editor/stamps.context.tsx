import React, { useContext } from 'react';
import { Stamp } from './stamps';

/**
 * Value of PdfEditorStampsContext
 */
export interface PdfEditorStampsContextValue {
  /**
   * All stamps
   */
  stamps: Stamp[];
  /**
   * Add new stamp
   * @param stamp - new stamp
   * @returns
   */
  onAddStamp: (stamp: Stamp) => void;
  /**
   * Remove stamp
   * @param stamp - removed stamp
   * @returns
   */
  onRemoveStamp: (stamp: Stamp) => void;
}

export const PdfEditorStampsContext =
  React.createContext<PdfEditorStampsContextValue>({
    stamps: [],
    onAddStamp: (stamp: Stamp) => {},
    onRemoveStamp: (stamp: Stamp) => {},
  });

/**
 * Properties of PdfEditorStampsContextProvider
 */
export interface PdfEditorStampsContextProviderProps
  extends PdfEditorStampsContextValue {
  children: JSX.Element;
}

/**
 *
 * @param props - properties of PdfEditorStampsContextProvider
 * @returns
 */
export function PdfEditorStampsContextProvider(
  props: PdfEditorStampsContextProviderProps
) {
  const { onAddStamp, onRemoveStamp, stamps, children } = props;

  return (
    <PdfEditorStampsContext.Provider
      value={{ stamps, onAddStamp, onRemoveStamp }}
    >
      {children}
    </PdfEditorStampsContext.Provider>
  );
}

/**
 * Retrieve stamps in context
 * @returns stamps
 */
export function usePdfEditorStamps() {
  return useContext(PdfEditorStampsContext);
}
