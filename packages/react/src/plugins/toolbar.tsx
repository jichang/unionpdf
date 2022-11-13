import React, { ComponentProps } from 'react';
import { useUIComponents, useUIStrings } from '../ui/ui.context';
import './toolbar.css';
import { ErrorBoundary } from '../ui/errorboundary';

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

export interface PdfToolbarNavigationItemGroupProps
  extends ComponentProps<'div'> {
  onToggleThumbnails: () => void;
  onToggleOutlines: () => void;
}

export function PdfToolbarNavigationtemGroup(
  props: PdfToolbarNavigationItemGroupProps
) {
  const { children, onToggleOutlines, onToggleThumbnails } = props;
  const { ToolbarItemGroupComponent, ButtonComponent } = useUIComponents();
  const strings = useUIStrings();

  return (
    <ToolbarItemGroupComponent>
      <ButtonComponent onClick={onToggleThumbnails}>
        {strings.thumbnails}
      </ButtonComponent>
      <ButtonComponent onClick={onToggleOutlines}>
        {strings.outlines}
      </ButtonComponent>
      {children}
    </ToolbarItemGroupComponent>
  );
}

export interface PdfToolbarDocItemGroupProps extends ComponentProps<'div'> {}

export function PdfToolbarDocItemGroup(props: PdfToolbarDocItemGroupProps) {
  const { children } = props;
  const { ToolbarItemGroupComponent, ButtonComponent } = useUIComponents();
  const strings = useUIStrings();

  return (
    <ToolbarItemGroupComponent>
      <ButtonComponent>{strings.save}</ButtonComponent>
      <ButtonComponent>{strings.print}</ButtonComponent>
      {children}
    </ToolbarItemGroupComponent>
  );
}
