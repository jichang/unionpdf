import classNames from 'classnames';
import React, { ComponentProps, useCallback, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import { PdfEditorTool, StackStatus, usePdfEditor } from './editor.context';
import {
  ErrorBoundary,
  PdfApplicatinPluginKey,
  PdfApplicationMode,
  usePdfApplication,
} from '../../core';

export interface PdfToolbarEditorItemGroupProps extends ComponentProps<'div'> {}

export function PdfToolbarEditorItemGroup(
  props: PdfToolbarEditorItemGroupProps
) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroup, Button } = useUIComponents();

  const strings = useUIStrings();

  const { setTool, toggleTool } = usePdfEditor();

  const handleAnnotation = useCallback(() => {
    setTool(PdfEditorTool.Annotation);
  }, [setTool]);

  const handleExtract = useCallback(() => {
    toggleTool(PdfEditorTool.Extract);
  }, [toggleTool]);

  const handleSignature = useCallback(() => {
    toggleTool(PdfEditorTool.Stamp);
  }, [toggleTool]);

  return (
    <ErrorBoundary>
      <ToolbarItemGroup
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <Button onClick={handleAnnotation}>{strings.annotation}</Button>
        <Button onClick={handleExtract}>{strings.extract}</Button>
        <Button onClick={handleSignature}>{strings.addStamp}</Button>
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}

export interface PdfToolbarEditorFileItemGroupProps
  extends ComponentProps<'div'> {}

export function PdfToolbarEditorFileItemGroup(
  props: PdfToolbarEditorFileItemGroupProps
) {
  const { className, children, ...rest } = props;

  const [isUncommittedWarningVisible, setIsUncommittedWarningVisible] =
    useState(false);

  const strings = useUIStrings();
  const { ToolbarItemGroup, Button, Dialog } = useUIComponents();

  const { discard, commit, queryStatus } = usePdfEditor();
  const { hidePlugin } = usePdfApplication();

  const handleExit = useCallback(() => {
    if (queryStatus() === StackStatus.Pending) {
      setIsUncommittedWarningVisible(true);
    } else {
      hidePlugin(PdfApplicatinPluginKey.Editor);
    }
  }, [queryStatus, setIsUncommittedWarningVisible, hidePlugin]);

  const handleDiscard = useCallback(() => {
    discard();
    setIsUncommittedWarningVisible(false);
    hidePlugin(PdfApplicatinPluginKey.Editor);
  }, [hidePlugin, discard, setIsUncommittedWarningVisible]);

  const handleCommit = useCallback(() => {
    commit();
    setIsUncommittedWarningVisible(false);
    hidePlugin(PdfApplicatinPluginKey.Editor);
  }, [hidePlugin, setIsUncommittedWarningVisible, commit]);

  return (
    <ErrorBoundary>
      <ToolbarItemGroup
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <Button onClick={handleCommit}>{strings.commit}</Button>
        <Button onClick={handleExit}>{strings.exit}</Button>
      </ToolbarItemGroup>
      <Dialog
        title={strings.uncommittedWarning}
        isOpened={isUncommittedWarningVisible}
        onClose={() => {
          setIsUncommittedWarningVisible(false);
        }}
      >
        <footer className="pdf__ui__dialog__footer">
          <Button onClick={handleDiscard}>{strings.discard}</Button>
          <Button onClick={handleCommit}>{strings.commit}</Button>
        </footer>
      </Dialog>
    </ErrorBoundary>
  );
}
