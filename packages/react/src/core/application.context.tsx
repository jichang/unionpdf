import React, { ReactNode, useCallback, useContext, useState } from 'react';

export enum PdfApplicationMode {
  View,
  Edit,
}

export interface PdfApplicationContextValue {
  supportsEdit: boolean;
  mode: PdfApplicationMode;
  changeMode: (mode: PdfApplicationMode) => void;
}

export const PdfApplicationContext =
  React.createContext<PdfApplicationContextValue>({
    supportsEdit: false,
    mode: PdfApplicationMode.View,
    changeMode: () => {},
  });

export interface PdfApplicationContextProviderProps {
  children: ReactNode;
  supportsEdit?: boolean;
  initialMode?: PdfApplicationMode;
  onChangeMode?: (mode: PdfApplicationMode) => void;
}

export function PdfApplicationContextProvider(
  props: PdfApplicationContextProviderProps
) {
  const { children, initialMode, supportsEdit = false, onChangeMode } = props;

  const [mode, setMode] = useState(initialMode || PdfApplicationMode.View);

  const changeMode = useCallback(
    (mode: PdfApplicationMode) => {
      if (supportsEdit) {
        setMode(mode);
        onChangeMode?.(mode);
      }
    },
    [setMode, supportsEdit, onChangeMode]
  );

  return (
    <PdfApplicationContext.Provider value={{ supportsEdit, mode, changeMode }}>
      {children}
    </PdfApplicationContext.Provider>
  );
}

export function usePdfApplication() {
  return useContext(PdfApplicationContext);
}
