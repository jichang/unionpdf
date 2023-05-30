import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export enum PdfApplicationMode {
  View,
  Edit,
}

export interface PdfApplicationContextValue {
  mode: PdfApplicationMode;
  setMode: (mode: PdfApplicationMode) => void;
  toggleMode: () => void;
}

export const PdfApplicationContext =
  React.createContext<PdfApplicationContextValue>({
    mode: PdfApplicationMode.View,
    setMode: () => {},
    toggleMode: () => {},
  });

export interface PdfApplicationContextProviderProps {
  children: ReactNode;
  initialMode?: PdfApplicationMode;
  onChangeMode?: (mode: PdfApplicationMode) => void;
}

export function PdfApplicationContextProvider(
  props: PdfApplicationContextProviderProps
) {
  const {
    children,
    initialMode = PdfApplicationMode.View,
    onChangeMode,
  } = props;

  const [mode, setMode] = useState(initialMode);

  const toggleMode = useCallback(() => {
    setMode((mode) => {
      if (mode === PdfApplicationMode.Edit) {
        return PdfApplicationMode.View;
      } else {
        return PdfApplicationMode.Edit;
      }
    });
  }, [setMode]);

  useEffect(() => {
    onChangeMode?.(mode);
  }, [mode, onChangeMode]);

  return (
    <PdfApplicationContext.Provider value={{ toggleMode, mode, setMode }}>
      {children}
    </PdfApplicationContext.Provider>
  );
}

export function usePdfApplication() {
  return useContext(PdfApplicationContext);
}
