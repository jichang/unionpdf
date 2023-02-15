import React, { Children, ComponentProps, useContext } from 'react';

export interface Stamp {
  source: ImageData | ImageBitmap | HTMLImageElement;
}

export interface PdfEditorStampsContextValue {
  stamps: Stamp[];
  onAddStamp: (stamp: Stamp) => void;
  onRemoveStamp: (stamp: Stamp) => void;
}

export const PdfEditorStampsContext =
  React.createContext<PdfEditorStampsContextValue>({
    stamps: [],
    onAddStamp: (stamp: Stamp) => {},
    onRemoveStamp: (stamp: Stamp) => {},
  });

export interface PdfEditorStampsContextProviderProps
  extends PdfEditorStampsContextValue {
  children: JSX.Element;
}

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

export function usePdfEditorStamps() {
  return useContext(PdfEditorStampsContext);
}
