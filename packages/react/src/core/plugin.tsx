import React, { useCallback } from 'react';
import { ComponentProps } from 'react';
import { PdfApplicatinPluginKey } from './application.configuration';
import { usePdfApplication } from './application.context';
import { ErrorBoundary } from './errorboundary';
import { useUIComponents } from '../adapters';
import { useLogger } from './logger.context';

/**
 * Properties of PdfPlugin
 */
export interface PdfPluginProps extends ComponentProps<'div'> {
  /**
   * key of plugin
   */
  pluginKey: PdfApplicatinPluginKey;
}

/**
 * Pdf plugin wrapper, it will use configuration in PdfApplicationContext to
 * maintain visiblity of plugin content
 * @param props - properties of PdfPlugin
 * @returns
 *
 * @public
 */
export function PdfPlugin(props: PdfPluginProps) {
  const { pluginKey, children } = props;
  const { plugins } = usePdfApplication();
  const logger = useLogger();
  const configuration = plugins[pluginKey];

  if (!configuration.isEnabled) {
    return null;
  }

  return (
    <ErrorBoundary source={`plugin.${pluginKey}`} logger={logger}>
      {children}
    </ErrorBoundary>
  );
}

/**
 * Properties of PdfPluginDialog
 */
export interface PdfPluginDialogProps extends ComponentProps<'div'> {
  /**
   * key of plugin
   */
  pluginKey: PdfApplicatinPluginKey;
  /**
   * title of dialog
   */
  title: string;
}

/**
 * Pdf plugin dialog, it will use configuration in PdfApplicationContext to
 * maintain visiblity of plugin content
 * @param props - properties of PdfPluginDialog
 * @returns
 *
 * @public
 */
export function PdfPluginDialog(props: PdfPluginDialogProps) {
  const { title, pluginKey, children } = props;

  const { Dialog } = useUIComponents();
  const { plugins, hidePlugin } = usePdfApplication();
  const configuration = plugins[pluginKey];

  const close = useCallback(() => {
    hidePlugin(pluginKey);
  }, [pluginKey, hidePlugin]);

  return (
    <Dialog title={title} isOpened={configuration.isVisible} onClose={close}>
      {children}
    </Dialog>
  );
}
