import classNames from 'classnames';
import React, { ComponentProps, useCallback, useState } from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import { PdfEditorTool, StackStatus, usePdfEditor } from './editor.context';
import {
  ErrorBoundary,
  PdfApplicatinPluginKey,
  useLogger,
  usePdfApplication,
} from '../../core';

/**
 * Properties of PdfToolbarEditorOperationItemGroup
 */
export interface PdfToolbarEditorOperationItemGroupProps
  extends ComponentProps<'div'> {}

/**
 * Toolbar items for pdf editor, for edit operations
 * @param props - properties of PdfToolbarEditorOperationItemGroup
 * @returns
 */
export function PdfToolbarEditorOperationItemGroup(
  props: PdfToolbarEditorOperationItemGroupProps,
) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroup, Button } = useUIComponents();

  const logger = useLogger();
  const strings = useUIStrings();

  const { setTool, toggleTool } = usePdfEditor();

  const handleAnnotation = useCallback(() => {
    setTool(PdfEditorTool.Annotation);
  }, [setTool]);

  const handleExtract = useCallback(() => {
    toggleTool(PdfEditorTool.Extract);
  }, [toggleTool]);

  const handleFillForm = useCallback(() => {
    toggleTool(PdfEditorTool.FillForm);
  }, [toggleTool]);

  const handleStamp = useCallback(() => {
    toggleTool(PdfEditorTool.Stamp);
  }, [toggleTool]);

  return (
    <ErrorBoundary source="PdfToolbarEditorItemGroup" logger={logger}>
      <ToolbarItemGroup
        scenario={{ usage: 'editor-plugin-operation-item-group' }}
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <Button
          scenario={{ usage: 'editor-operation-annotation' }}
          data-testid="pdf__toolbar__item__annotation"
          onClick={handleAnnotation}
        >
          {strings.annotation}
        </Button>
        <Button
          scenario={{ usage: 'editor-operation-fill-form' }}
          data-testid="pdf__toolbar__item__fill__form"
          onClick={handleFillForm}
        >
          {strings.fillForm}
        </Button>
        <Button
          scenario={{ usage: 'editor-operation-extract' }}
          data-testid="pdf__toolbar__item__extract"
          onClick={handleExtract}
        >
          {strings.extract}
        </Button>
        <Button
          scenario={{ usage: 'editor-operation-stamp' }}
          data-testid="pdf__toolbar__item__stamp"
          onClick={handleStamp}
        >
          {strings.addStamp}
        </Button>
        {children}
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}

/**
 * Properties of PdfToolbarEditorFileItemGroup
 */
export interface PdfToolbarEditorFileItemGroupProps
  extends ComponentProps<'div'> {}

/**
 * Toolbar items for pdf editor, for file operations
 * @param props - properties of PdfToolbarEditorFileItemGroup
 * @returns
 */
export function PdfToolbarEditorFileItemGroup(
  props: PdfToolbarEditorFileItemGroupProps,
) {
  const { className, children, ...rest } = props;

  const [isUncommittedWarningVisible, setIsUncommittedWarningVisible] =
    useState(false);

  const logger = useLogger();
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
    <ErrorBoundary source="PdfToolbarEditorFileItemGroup" logger={logger}>
      <ToolbarItemGroup
        scenario={{ usage: 'editor-plugin-file-item-group' }}
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <Button
          scenario={{ usage: 'editor-operation-commit' }}
          data-testid="pdf__toolbar__item__commit"
          onClick={handleCommit}
        >
          {strings.commit}
        </Button>
        <Button
          scenario={{ usage: 'editor-operation-exit' }}
          data-testid="pdf__toolbar__item__exit"
          onClick={handleExit}
        >
          {strings.exit}
        </Button>
        {children}
      </ToolbarItemGroup>
      <Dialog
        scenario={{ usage: 'uncommitted-changes' }}
        title={strings.uncommittedWarning}
        isOpened={isUncommittedWarningVisible}
        onClose={() => {
          setIsUncommittedWarningVisible(false);
        }}
      >
        <footer className="pdf__ui__dialog__footer">
          <Button
            scenario={{ usage: 'editor-operation-discard' }}
            data-testid="pdf__toolbar__item__discard"
            onClick={handleDiscard}
          >
            {strings.discard}
          </Button>
          <Button
            scenario={{ usage: 'editor-operation-commit' }}
            data-testid="pdf__toolbar__item__commit"
            onClick={handleCommit}
          >
            {strings.commit}
          </Button>
        </footer>
      </Dialog>
    </ErrorBoundary>
  );
}
