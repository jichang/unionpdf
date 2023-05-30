import React, { ComponentProps, useCallback, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../ui/ui.context';
import './toolbar.css';
import { ErrorBoundary } from '../../ui/errorboundary';
import { PdfApplicationMode, usePdfApplication } from '../../core';
import classNames from 'classnames';

export interface PdfToolbarProps extends ComponentProps<'div'> {}

export function PdfToolbar(props: PdfToolbarProps) {
  const { children, ...rest } = props;
  const { ToolbarComponent } = useUIComponents();

  return (
    <ErrorBoundary>
      <ToolbarComponent className="pdf__toolbar" {...rest}>
        {children}
      </ToolbarComponent>
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
  const { ToolbarItemGroupComponent, ButtonComponent } = useUIComponents();
  const strings = useUIStrings();

  return (
    <ErrorBoundary>
      <ToolbarItemGroupComponent
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <ButtonComponent onClick={onToggleMetadata}>
          {strings.metadata}
        </ButtonComponent>
        <ButtonComponent onClick={onToggleOutlines}>
          {strings.bookmarks}
        </ButtonComponent>
        <ButtonComponent onClick={onToggleThumbnails}>
          {strings.thumbnails}
        </ButtonComponent>
        <ButtonComponent onClick={onToggleAttachments}>
          {strings.attchments}
        </ButtonComponent>
        <ButtonComponent onClick={onToggleSignatures}>
          {strings.signatures}
        </ButtonComponent>
      </ToolbarItemGroupComponent>
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
  const { ToolbarItemGroupComponent, ButtonComponent, DialogComponent } =
    useUIComponents();
  const strings = useUIStrings();

  const { setMode } = usePdfApplication();

  const handleEdit = useCallback(() => {
    setMode(PdfApplicationMode.Edit);
  }, [setMode]);

  return (
    <ErrorBoundary>
      <ToolbarItemGroupComponent
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        {enableEdit ? (
          <ButtonComponent onClick={handleEdit}>{strings.edit}</ButtonComponent>
        ) : null}
        <ButtonComponent onClick={onSave}>{strings.saveAs}</ButtonComponent>
        <ButtonComponent onClick={onPrint}>{strings.print}</ButtonComponent>
        {children}
      </ToolbarItemGroupComponent>
    </ErrorBoundary>
  );
}
