import React, { ComponentProps, useCallback } from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import './toolbar.css';
import { ErrorBoundary } from '../../core';
import { PdfApplicationMode, usePdfApplication } from '../../core';
import classNames from 'classnames';

export interface PdfToolbarProps extends ComponentProps<'div'> {}

export function PdfToolbar(props: PdfToolbarProps) {
  const { children, ...rest } = props;
  const { Toolbar } = useUIComponents();

  return (
    <ErrorBoundary>
      <Toolbar className="pdf__toolbar" {...rest}>
        {children}
      </Toolbar>
    </ErrorBoundary>
  );
}

export interface PdfToolbarPluginItemGroupProps extends ComponentProps<'div'> {
  onToggleMetadata: () => void;
  onToggleThumbnails: () => void;
  onToggleOutlines: () => void;
  onToggleAttachments: () => void;
  onToggleSignatures: () => void;
}

export function PdfToolbarPluginItemGroup(
  props: PdfToolbarPluginItemGroupProps
) {
  const {
    className,
    children,
    onToggleMetadata,
    onToggleOutlines,
    onToggleThumbnails,
    onToggleAttachments,
    onToggleSignatures,
    ...rest
  } = props;
  const { ToolbarItemGroup, Button } = useUIComponents();
  const strings = useUIStrings();

  return (
    <ErrorBoundary>
      <ToolbarItemGroup
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <Button onClick={onToggleMetadata}>{strings.metadata}</Button>
        <Button onClick={onToggleOutlines}>{strings.bookmarks}</Button>
        <Button onClick={onToggleThumbnails}>{strings.thumbnails}</Button>
        <Button onClick={onToggleAttachments}>{strings.attchments}</Button>
        <Button onClick={onToggleSignatures}>{strings.signatures}</Button>
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}

export interface PdfToolbarFileItemGroupProps extends ComponentProps<'div'> {
  enableEdit?: boolean;
  onSave: () => void;
  onPrint: () => void;
}

export function PdfToolbarFileItemGroup(props: PdfToolbarFileItemGroupProps) {
  const {
    className,
    enableEdit = true,
    onSave,
    onPrint,
    children,
    ...rest
  } = props;
  const { ToolbarItemGroup, Button, Dialog } = useUIComponents();
  const strings = useUIStrings();

  const { setMode } = usePdfApplication();

  const handleEdit = useCallback(() => {
    setMode(PdfApplicationMode.Edit);
  }, [setMode]);

  return (
    <ErrorBoundary>
      <ToolbarItemGroup
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        {enableEdit ? (
          <Button onClick={handleEdit}>{strings.edit}</Button>
        ) : null}
        <Button onClick={onSave}>{strings.saveAs}</Button>
        <Button onClick={onPrint}>{strings.print}</Button>
        {children}
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}
