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

export interface PdfApplicationContextValue
  extends PdfApplicationConfiguration {
  mode: PdfApplicationMode;
  setScaleFactor: (scaleFactor: number) => void;
  setRotation: (rotation: Rotation) => void;
  showPlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  hidePlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  togglePlugin: (pluginKey: PdfApplicatinPluginKey) => void;
}

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

export interface PdfApplicationContextProviderProps {
  children: ReactNode;
  provider: PdfApplicationConfigurationProvider;
}

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
      provider.showPlugin(pluginKey);
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

export function usePdfApplication() {
  return useContext(PdfApplicationContext);
}
