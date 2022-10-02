import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { PdfPageProps } from './pages';

export interface PdfPageDecorationComponentProps extends PdfPageProps {}

export type PdfPageDecorationComponent = (
  props: PdfPageDecorationComponentProps
) => JSX.Element;

export type PdfPageDecorationsContextValue = {
  decorationComponents: PdfPageDecorationComponent[];
  addDecorationComponent: (
    decorationComponent: PdfPageDecorationComponent
  ) => void;
  removeDecorationComponent: (
    decorationComponent: PdfPageDecorationComponent
  ) => void;
};

export const PdfPageDecorationsContext =
  createContext<PdfPageDecorationsContextValue>({
    decorationComponents: [],
    addDecorationComponent: (
      decorationComponent: PdfPageDecorationComponent
    ) => {},
    removeDecorationComponent: (
      decorationComponent: PdfPageDecorationComponent
    ) => {},
  });

export function usePdfPageDecorationComponents() {
  return useContext(PdfPageDecorationsContext);
}

export interface PdfPageDecorationsContextProviderProps {
  decorationComponents?: PdfPageDecorationComponent[];
  children: ReactNode;
}

export function PdfPageDecorationsContextProvider(
  props: PdfPageDecorationsContextProviderProps
) {
  const { children } = props;

  const [decorationComponents, setDecorationComponents] = useState<
    PdfPageDecorationComponent[]
  >(props.decorationComponents || []);
  const addDecorationComponent = useCallback(
    (decorationComponent: PdfPageDecorationComponent) => {
      setDecorationComponents((decorationComponents) => {
        return [...decorationComponents, decorationComponent];
      });
    },
    []
  );
  const removeDecorationComponent = useCallback(
    (decorationComponent: PdfPageDecorationComponent) => {
      setDecorationComponents((decorationComponents) => {
        return decorationComponents.filter(
          (_decorationComponent) => _decorationComponent !== decorationComponent
        );
      });
    },
    []
  );

  return (
    <PdfPageDecorationsContext.Provider
      value={{
        decorationComponents,
        addDecorationComponent,
        removeDecorationComponent,
      }}
    >
      {children}
    </PdfPageDecorationsContext.Provider>
  );
}
