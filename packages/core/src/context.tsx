import React, { ReactNode, useContext } from "react";
import { PdfDocumentModel, PdfEngine } from "@onepdf/models";
import { PdfNavigator } from "./navigator";

export const PdfEngineContext = React.createContext<PdfEngine | null>(null);

export interface PdfEngineContextProviderProps {
  engine: PdfEngine;
  children: ReactNode;
}

export function PdfEngineContextProvider(props: PdfEngineContextProviderProps) {
  const { children, engine } = props;

  return (
    <PdfEngineContext.Provider value={engine}>
      {children}
    </PdfEngineContext.Provider>
  );
}

export function usePdfEngine() {
  return useContext(PdfEngineContext);
}

export const PdfDocumentContext = React.createContext<PdfDocumentModel | null>(
  null
);

export interface PdfDocumentContextProviderProps {
  doc: PdfDocumentModel;
  children: ReactNode;
}

export function PdfDocumentContextProvider(
  props: PdfDocumentContextProviderProps
) {
  const { children, doc } = props;

  return (
    <PdfDocumentContext.Provider value={doc}>
      {children}
    </PdfDocumentContext.Provider>
  );
}

export function usePdfDocument() {
  return useContext(PdfDocumentContext);
}

export const PdfNavigatorContext = React.createContext<PdfNavigator | null>(
  null
);

export interface PdfNavigatorContextProviderProps {
  navigator: PdfNavigator;
  children: ReactNode;
}

export function PdfNavigatorContextProvider(
  props: PdfNavigatorContextProviderProps
) {
  const { children, navigator } = props;

  return (
    <PdfNavigatorContext.Provider value={navigator}>
      {children}
    </PdfNavigatorContext.Provider>
  );
}

export function usePdfNavigator() {
  return useContext(PdfNavigatorContext);
}
