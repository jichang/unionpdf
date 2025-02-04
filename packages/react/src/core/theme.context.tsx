import React, { JSX } from 'react';
import { createContext, useContext } from 'react';

/**
 * Theme, you can put anything in it
 */
export interface Theme extends Record<string, string> {}

/**
 * default theme
 */
export const defaultTheme: Theme = {};

export const ThemeContext = createContext(defaultTheme);

/**
 * Properties of ThemeContextProvider
 */
export interface ThemeContextProviderProps {
  /**
   * Application theme
   */
  theme: Theme;
  children: JSX.Element;
}

/**
 * Provider component for providing theme
 * @param props - properties of ThemeContextProvider
 * @returns
 */
export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const { theme, children } = props;
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hooks for retrieve theme
 * @returns theme in context
 */
export function useTheme() {
  return useContext(ThemeContext);
}
