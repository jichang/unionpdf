import { ReactNode } from 'react';
import { UIStringsContextProvider } from '../uistrings.context';
import React from 'react';
import { strings, components } from '../native';
import {
  DialogProps,
  UIComponentsContextProvider,
} from '../uicomponents.context';
import {
  MemoryPdfApplicationConfigurationProvider,
  PdfApplicatinPluginKey,
  PdfApplicationMode,
} from '../../core';
import { Rotation } from '@unionpdf/models';

export interface PdfNativeAdapterProviderProps {
  children: ReactNode;
}

export function Dialog(props: DialogProps) {
  const { children } = props;

  return <>{children}</>;
}

export function PdfTestingAdapterProvider(
  props: PdfNativeAdapterProviderProps,
) {
  const { children } = props;

  return (
    <UIStringsContextProvider strings={strings}>
      <UIComponentsContextProvider components={{ ...components, Dialog }}>
        {children}
      </UIComponentsContextProvider>
    </UIStringsContextProvider>
  );
}

export const testingMemoryPdfApplicationConfigurationProvider =
  new MemoryPdfApplicationConfigurationProvider(Rotation.Degree0, 1.0, {
    [PdfApplicatinPluginKey.Attachments]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Bookmarks]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Downloader]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Editor]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Metadata]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Pages]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Printer]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.SearchPanel]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Signatures]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Thumbnails]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Toolbar]: {
      isEnabled: true,
      isVisible: true,
    },
    [PdfApplicatinPluginKey.Uploader]: {
      isEnabled: true,
      isVisible: true,
    },
  });
