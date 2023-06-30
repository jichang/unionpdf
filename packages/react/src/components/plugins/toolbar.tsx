import React, { ComponentProps, useCallback } from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import './toolbar.css';
import {
  ErrorBoundary,
  PdfApplicatinPluginKey,
  PdfPlugin,
  PdfApplicationMode,
  usePdfApplication,
} from '../../core';
import classNames from 'classnames';
import {
  PdfToolbarEditorFileItemGroup,
  PdfToolbarEditorItemGroup,
} from '../editor';
import { PdfToolbarPagesItemGroup } from './pages.toolbar';

export interface PdfToolbarProps extends ComponentProps<'div'> {}

export function PdfToolbar(props: PdfToolbarProps) {
  const { children, ...rest } = props;
  const { Toolbar } = useUIComponents();
  const { mode } = usePdfApplication();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Toolbar}>
      <Toolbar className="pdf__toolbar" {...rest}>
        {mode === PdfApplicationMode.View ? (
          <PdfToolbarPluginItemGroup className="pdf__toolbar__item__group--left" />
        ) : (
          <PdfToolbarEditorItemGroup />
        )}
        <PdfToolbarPagesItemGroup className="pdf__toolbar__item__group--center" />
        {mode === PdfApplicationMode.View ? (
          <PdfToolbarFileItemGroup className="pdf__toolbar__item__group--right" />
        ) : (
          <PdfToolbarEditorFileItemGroup className="pdf__toolbar__item__group--right" />
        )}
      </Toolbar>
    </PdfPlugin>
  );
}

export interface PdfToolbarPluginItemGroupProps extends ComponentProps<'div'> {}

export function PdfToolbarPluginItemGroup(
  props: PdfToolbarPluginItemGroupProps
) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroup } = useUIComponents();
  const strings = useUIStrings();

  return (
    <ErrorBoundary>
      <ToolbarItemGroup
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Metadata}
          text={strings.metadata}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Bookmarks}
          text={strings.bookmarks}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Thumbnails}
          text={strings.thumbnails}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Attachments}
          text={strings.attchments}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Signatures}
          text={strings.signatures}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.SearchPanel}
          text={strings.search}
        />
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}

export interface PdfToolbarPluginItemProps {
  text: string;
  pluginKey: PdfApplicatinPluginKey;
}

export function PdfToolbarPluginItem(props: PdfToolbarPluginItemProps) {
  const { text, pluginKey } = props;
  const { Button } = useUIComponents();
  const { plugins, togglePlugin } = usePdfApplication();

  const toggle = useCallback(() => {
    togglePlugin(pluginKey);
  }, [togglePlugin, pluginKey]);

  if (!plugins[pluginKey].isEnabled) {
    return null;
  }

  return <Button onClick={toggle}>{text}</Button>;
}

export interface PdfToolbarFileItemGroupProps extends ComponentProps<'div'> {}

export function PdfToolbarFileItemGroup(props: PdfToolbarFileItemGroupProps) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroup, Button, Dialog } = useUIComponents();
  const strings = useUIStrings();

  const { plugins, showPlugin } = usePdfApplication();

  const handleEdit = useCallback(() => {
    showPlugin(PdfApplicatinPluginKey.Editor);
  }, [showPlugin]);

  const enableEdit = plugins[PdfApplicatinPluginKey.Editor].isEnabled;

  return (
    <ErrorBoundary>
      <ToolbarItemGroup
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        {enableEdit ? (
          <Button onClick={handleEdit}>{strings.edit}</Button>
        ) : null}
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Downloader}
          text={strings.saveAs}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Printer}
          text={strings.print}
        />
        {children}
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}
