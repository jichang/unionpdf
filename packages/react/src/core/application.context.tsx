import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DEFAULT_PLUGIN_CONFIGURATIONS,
  PdfApplicatinPluginKey,
  PdfApplicationConfiguration,
  PdfApplicationConfigurationProvider,
  PdfApplicationMode,
} from './application.configuration';
import { Rotation } from '@unionpdf/models';

/**
 * Type of value in pdf application context
 */
export interface PdfApplicationContextValue
  extends PdfApplicationConfiguration {
  /**
   * Application mode
   */
  mode: PdfApplicationMode;
  /**
   * Set scaling factor
   * @param scaleFactor - scaling factor
   * @returns
   */
  setScaleFactor: (scaleFactor: number) => void;
  /**
   * Set rotation
   * @param rotation - rotation angle
   * @returns
   */
  setRotation: (rotation: Rotation) => void;
  /**
   * Show application plugin
   * @param pluginKey - key of plugin
   * @returns
   */
  showPlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  /**
   * Hide application plugin
   * @param pluginKey - key of plugin
   * @returns
   */
  hidePlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  /**
   * Toggle application plugin
   * @param pluginKey - key of plugin
   * @returns
   */
  togglePlugin: (pluginKey: PdfApplicatinPluginKey) => void;
}

/**
 * Pdf application context
 */
export const PdfApplicationContext =
  React.createContext<PdfApplicationContextValue>({
    mode: PdfApplicationMode.View,
    plugins: DEFAULT_PLUGIN_CONFIGURATIONS,
    rotation: Rotation.Degree0,
    scaleFactor: 1.0,
    setScaleFactor: () => {},
    setRotation: () => {},
    showPlugin: () => {},
    hidePlugin: () => {},
    togglePlugin: () => {},
  });

/**
 * Property of application context provider
 */
export interface PdfApplicationContextProviderProps {
  children: ReactNode;
  /**
   *  application configuration provider
   */
  provider: PdfApplicationConfigurationProvider;
}

/**
 * Application context provider
 * @param props - properties
 * @returns new application context provider component
 */
export function PdfApplicationContextProvider(
  props: PdfApplicationContextProviderProps
) {
  const { children, provider } = props;

  const [configuration, setConfiguration] = useState(provider.get());

  useEffect(() => {
    provider.subscribe(setConfiguration);

    return () => {
      provider.unsubscribe(setConfiguration);
    };
  }, [provider, setConfiguration]);

  const setScaleFactor = useCallback(
    (scaleFactor: number) => {
      provider.setScaleFactor(scaleFactor);
    },
    [provider]
  );

  const setRotation = useCallback(
    (rotation: Rotation) => {
      provider.setRotation(rotation);
    },
    [provider]
  );

  const showPlugin = useCallback(
    (pluginKey: PdfApplicatinPluginKey) => {
      provider.showPlugin(pluginKey);
    },
    [provider]
  );

  const hidePlugin = useCallback(
    (pluginKey: PdfApplicatinPluginKey) => {
      provider.hidePlugin(pluginKey);
    },
    [provider]
  );

  const togglePlugin = useCallback(
    (pluginKey: PdfApplicatinPluginKey) => {
      provider.togglePlugin(pluginKey);
    },
    [provider]
  );

  const contextValue = useMemo(() => {
    const mode =
      configuration.plugins[PdfApplicatinPluginKey.Editor].isEnabled &&
      configuration.plugins[PdfApplicatinPluginKey.Editor].isVisible
        ? PdfApplicationMode.Edit
        : PdfApplicationMode.View;

    return {
      ...configuration,
      mode,
      setScaleFactor,
      setRotation,
      showPlugin,
      hidePlugin,
      togglePlugin,
    };
  }, [configuration, setScaleFactor, setRotation, showPlugin, hidePlugin]);

  return (
    <PdfApplicationContext.Provider value={contextValue}>
      {children}
    </PdfApplicationContext.Provider>
  );
}

/**
 * Retrieve application configuration
 * @returns application configuration in context
 *
 * @public
 */
export function usePdfApplication() {
  return useContext(PdfApplicationContext);
}
