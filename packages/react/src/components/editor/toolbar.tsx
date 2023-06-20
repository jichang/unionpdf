import classNames from 'classnames';
import React, { ComponentProps, useCallback, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import { PdfEditorTool, StackStatus, usePdfEditor } from './editor.context';
import {
  ErrorBoundary,
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

  const { commit, queryStatus } = usePdfEditor();
  const { setMode } = usePdfApplication();

  const handleExit = useCallback(() => {
    if (queryStatus() === StackStatus.Pending) {
      setIsUncommittedWarningVisible(true);
    } else {
      setMode(PdfApplicationMode.View);
    }
  }, [queryStatus, setIsUncommittedWarningVisible, setMode]);

  const handleDiscard = useCallback(() => {
    setIsUncommittedWarningVisible(false);
    setMode(PdfApplicationMode.View);
  }, [setMode]);

  const handleCommit = useCallback(() => {
    commit();
    setIsUncommittedWarningVisible(false);
  }, [setIsUncommittedWarningVisible, commit]);

  return (
    <ErrorBoundary>
      <ToolbarItemGroup
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <Button onClick={handleCommit}>{strings.commit}</Button>
        <Button onClick={handleExit}>{strings.exit}</Button>
      </ToolbarItemGroup>
      <Dialog open={isUncommittedWarningVisible}>
        <div>
          <p>{strings.uncommittedWarning}</p>
        </div>
        <footer>
          <Button onClick={handleDiscard}>{strings.discard}</Button>
          <Button onClick={handleCommit}>{strings.commit}</Button>
        </footer>
      </Dialog>
    </ErrorBoundary>
  );
}
