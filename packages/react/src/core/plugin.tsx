import React from 'react';
import { ComponentProps } from 'react';
import { PdfApplicatinPluginKey } from './application.configuration';
import { usePdfApplication } from './application.context';
import { ErrorBoundary } from './errorboundary';

export interface PdfPluginProps extends ComponentProps<'div'> {
  pluginKey: PdfApplicatinPluginKey;
}

export function PdfPlugin(props: PdfPluginProps) {
  const { pluginKey, children } = props;
  const { plugins } = usePdfApplication();
  const configuration = plugins[pluginKey];

  if (!configuration.isEnabled || !configuration.isVisible) {
    return null;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
