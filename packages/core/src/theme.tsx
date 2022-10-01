import React from "react";
import { createContext, useContext } from "react";

export interface Theme extends Record<string, string> {}

export const defaultTheme: Theme = {};

export const ThemeContext = createContext(defaultTheme);

export interface ThemeContextProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const { theme, children } = props;
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
