import classNames from 'classnames';
import React, { ComponentProps, useCallback, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../ui';
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
  const { ToolbarItemGroupComponent, ButtonComponent } = useUIComponents();

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
      <ToolbarItemGroupComponent
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <ButtonComponent onClick={handleAnnotation}>
          {strings.annotation}
        </ButtonComponent>
        <ButtonComponent onClick={handleExtract}>
          {strings.extract}
        </ButtonComponent>
        <ButtonComponent onClick={handleSignature}>
          {strings.addStamp}
        </ButtonComponent>
      </ToolbarItemGroupComponent>
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
  const { ToolbarItemGroupComponent, ButtonComponent, DialogComponent } =
    useUIComponents();

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
      <ToolbarItemGroupComponent
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <ButtonComponent onClick={handleCommit}>
          {strings.commit}
        </ButtonComponent>
        <ButtonComponent onClick={handleExit}>{strings.exit}</ButtonComponent>
      </ToolbarItemGroupComponent>
      <DialogComponent open={isUncommittedWarningVisible}>
        <div>
          <p>{strings.uncommittedWarning}</p>
        </div>
        <footer>
          <ButtonComponent onClick={handleDiscard}>
            {strings.discard}
          </ButtonComponent>
          <ButtonComponent onClick={handleCommit}>
            {strings.commit}
          </ButtonComponent>
        </footer>
      </DialogComponent>
    </ErrorBoundary>
  );
}
