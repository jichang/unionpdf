import classNames from 'classnames';
import React, { ComponentProps, useCallback } from 'react';
import { ErrorBoundary, useUIComponents, useUIStrings } from '../../ui';
import { PdfEditorTool, usePdfEditor } from './editor.context';

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

  const { commit } = usePdfEditor();

  const handleSave = useCallback(() => {
    commit();
  }, [commit]);

  return (
    <ErrorBoundary>
      <ToolbarItemGroupComponent
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <ButtonComponent onClick={handleSave}>{strings.save}</ButtonComponent>
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
