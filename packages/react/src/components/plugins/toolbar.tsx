import React, { ComponentProps, useCallback } from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import './toolbar.css';
import {
  ErrorBoundary,
  PdfApplicatinPluginKey,
  PdfPlugin,
  PdfApplicationMode,
  usePdfApplication,
  useLogger,
} from '../../core';
import classNames from 'classnames';
import {
  PdfToolbarEditorFileItemGroup,
  PdfToolbarEditorOperationItemGroup,
} from '../editor';
import { PdfToolbarPagesItemGroup } from './pages.toolbar';

/**
 * Properties of PdfToolbar
 */
export interface PdfToolbarProps extends ComponentProps<'div'> {
  /**
   * Toolbar items for plugins
   */
  pluginItems?: React.ReactNode;
  /**
   * Toolbar items for pdf files
   */
  fileItems?: React.ReactNode;
}

/**
 * Plugin to display toolbar
 * @param props - properties of PdfToolbar
 * @returns
 */
export function PdfToolbar(props: PdfToolbarProps) {
  const { pluginItems, fileItems, ...rest } = props;
  const { Toolbar } = useUIComponents();
  const { mode } = usePdfApplication();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Toolbar}>
      <Toolbar date-testid="pdf__toolbar" className="pdf__toolbar" {...rest}>
        {mode === PdfApplicationMode.View ? (
          <PdfToolbarPluginItemGroup className="pdf__toolbar__item__group--left">
            {pluginItems}
          </PdfToolbarPluginItemGroup>
        ) : (
          <PdfToolbarEditorOperationItemGroup>
            {pluginItems}
          </PdfToolbarEditorOperationItemGroup>
        )}
        <PdfToolbarPagesItemGroup className="pdf__toolbar__item__group--center" />
        {mode === PdfApplicationMode.View ? (
          <PdfToolbarFileItemGroup className="pdf__toolbar__item__group--right">
            {fileItems}
          </PdfToolbarFileItemGroup>
        ) : (
          <PdfToolbarEditorFileItemGroup className="pdf__toolbar__item__group--right">
            {fileItems}
          </PdfToolbarEditorFileItemGroup>
        )}
      </Toolbar>
    </PdfPlugin>
  );
}
/**
 * Properties of PdfToolbarPluginItemGroup
 */
export interface PdfToolbarPluginItemGroupProps extends ComponentProps<'div'> {}

/**
 * Component for showing toolbar item for plugins
 * @param props - properties of PdfToolbarPluginItemGroup
 * @returns
 */
export function PdfToolbarPluginItemGroup(
  props: PdfToolbarPluginItemGroupProps,
) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroup } = useUIComponents();
  const strings = useUIStrings();
  const logger = useLogger();

  return (
    <ErrorBoundary source="PdfToolbarPluginItemGroup" logger={logger}>
      <ToolbarItemGroup
        date-testid="pdf__toolbar__plugin__item__group"
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
          pluginKey={PdfApplicatinPluginKey.Search}
          text={strings.search}
        />
        {children}
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}

/**
 * Properties of PdfToolbarPluginItem
 */
export interface PdfToolbarPluginItemProps {
  /**
   * Text of toolbar item
   */
  text: string;
  /**
   * Key for relevant plugin
   */
  pluginKey: PdfApplicatinPluginKey;
}

/**
 * Component for showing toolbar item for plugin
 * @param props - properties of PdfToolbarFileItem
 * @returns
 */
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

  return (
    <Button
      data-testid={`pdf__toolbar__item__plugin__${pluginKey}`}
      onClick={toggle}
    >
      {text}
    </Button>
  );
}

/**
 * Properties of PdfToolbarFileItemGroup
 */
export interface PdfToolbarFileItemGroupProps extends ComponentProps<'div'> {}

/**
 * Component for showing toolbar item for plugins
 * @param props - properties of PdfToolbarFileItemGroup
 * @returns
 */
export function PdfToolbarFileItemGroup(props: PdfToolbarFileItemGroupProps) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroup, Button, Dialog } = useUIComponents();
  const strings = useUIStrings();
  const logger = useLogger();

  return (
    <ErrorBoundary source="PdfToolbarFileItemGroup" logger={logger}>
      <ToolbarItemGroup
        date-testid="pdf__toolbar__plugin__file__group"
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Editor}
          text={strings.edit}
        />
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
