import React, { ComponentProps, useCallback, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../ui/ui.context';
import './toolbar.css';
import { ErrorBoundary } from '../../ui/errorboundary';
import {
  PdfApplicationMode,
  usePdfApplication,
  usePdfDocument,
  usePdfEngine,
} from '../../core';
import classNames from 'classnames';
import { StackStatus, usePdfEditor } from '../editor';

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
  onSave: () => void;
  onPrint: () => void;
}

export function PdfToolbarFileItemGroup(props: PdfToolbarFileItemGroupProps) {
  const { className, onSave, onPrint, children, ...rest } = props;
  const { ToolbarItemGroupComponent, ButtonComponent, DialogComponent } =
    useUIComponents();
  const strings = useUIStrings();

  const { mode, changeMode } = usePdfApplication();

  const handleEdit = useCallback(() => {
    changeMode(PdfApplicationMode.Edit);
  }, [changeMode]);

  const [isUncommittedWarningVisible, setIsUncommittedWarningVisible] =
    useState(false);
  const { queryStatus } = usePdfEditor();
  const handleExit = useCallback(() => {
    if (queryStatus() === StackStatus.Pending) {
      setIsUncommittedWarningVisible(true);
    } else {
      changeMode(PdfApplicationMode.View);
    }
  }, [queryStatus, setIsUncommittedWarningVisible, changeMode]);

  const handleDiscard = useCallback(() => {
    setIsUncommittedWarningVisible(false);
    changeMode(PdfApplicationMode.View);
  }, [changeMode]);

  const handleSave = useCallback(() => {
    setIsUncommittedWarningVisible(false);
    changeMode(PdfApplicationMode.View);
    onSave();
  }, [changeMode, onSave]);

  return (
    <ErrorBoundary>
      <ToolbarItemGroupComponent
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        {mode === PdfApplicationMode.View ? (
          <>
            <ButtonComponent onClick={onSave}>{strings.saveAs}</ButtonComponent>
            <ButtonComponent onClick={onPrint}>{strings.print}</ButtonComponent>
            <ButtonComponent onClick={handleEdit}>
              {strings.edit}
            </ButtonComponent>
          </>
        ) : (
          <ButtonComponent onClick={handleExit}>{strings.exit}</ButtonComponent>
        )}
        {children}
      </ToolbarItemGroupComponent>
      <DialogComponent open={isUncommittedWarningVisible}>
        <div>
          <p>{strings.uncommittedWarning}</p>
        </div>
        <footer>
          <ButtonComponent onClick={handleDiscard}>
            {strings.discard}
          </ButtonComponent>
          <ButtonComponent onClick={handleSave}>{strings.save}</ButtonComponent>
        </footer>
      </DialogComponent>
    </ErrorBoundary>
  );
}
