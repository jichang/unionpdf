import React, { useCallback } from 'react';
import { ComponentProps } from 'react';
import { PdfApplicatinPluginKey } from './application.configuration';
import { usePdfApplication } from './application.context';
import { ErrorBoundary } from './errorboundary';
import { useUIComponents } from '../adapters';

export interface PdfPluginProps extends ComponentProps<'div'> {
  pluginKey: PdfApplicatinPluginKey;
}

export function PdfPlugin(props: PdfPluginProps) {
  const { pluginKey, children } = props;
  const { plugins } = usePdfApplication();
  const configuration = plugins[pluginKey];

  if (!configuration.isEnabled) {
    return null;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export interface PdfPluginDialogProps extends ComponentProps<'div'> {
  pluginKey: PdfApplicatinPluginKey;
  title: string;
}

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
