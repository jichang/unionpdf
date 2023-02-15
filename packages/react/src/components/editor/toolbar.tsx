import classNames from 'classnames';
import React, { ComponentProps, useCallback } from 'react';
import { ErrorBoundary, useUIComponents, useUIStrings } from '../../ui';
import { PdfEditorTool, usePdfEditor } from './editor.context';

export interface PdfToolbarEditPagesItemGroupProps
  extends ComponentProps<'div'> {}

export function PdfToolbarEditPagesItemGroup(
  props: PdfToolbarEditPagesItemGroupProps
) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroupComponent, ButtonComponent } = useUIComponents();

  const strings = useUIStrings();

  const { setTool } = usePdfEditor();

  const handleAnnotation = useCallback(() => {
    setTool(PdfEditorTool.Annotation);
  }, [setTool]);

  const handleExtract = useCallback(() => {
    setTool(PdfEditorTool.Extract);
  }, [setTool]);

  const handleSignature = useCallback(() => {
    setTool(PdfEditorTool.Stamp);
  }, [setTool]);

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
