import React, { ComponentProps, useCallback } from 'react';
import { useUIComponents, useUIStrings } from '../../ui/ui.context';
import './toolbar.css';
import { ErrorBoundary } from '../../ui/errorboundary';
import { usePdfDocument, usePdfEngine } from '../../core';
import { ignore } from '@unionpdf/models';
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

export interface PdfToolbarBrowseItemGroupProps extends ComponentProps<'div'> {
  onToggleMetadata: () => void;
  onToggleThumbnails: () => void;
  onToggleOutlines: () => void;
  onToggleAttachments: () => void;
  onToggleSignatures: () => void;
}

export function PdfToolbarBrowseItemGroup(
  props: PdfToolbarBrowseItemGroupProps
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
      {children}
    </ToolbarItemGroupComponent>
  );
}

export interface PdfToolbarManageItemGroupProps extends ComponentProps<'div'> {}

export function PdfToolbarManageItemGroup(
  props: PdfToolbarManageItemGroupProps
) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroupComponent, ButtonComponent } = useUIComponents();
  const strings = useUIStrings();
  const doc = usePdfDocument();
  const engine = usePdfEngine();

  const saveAs = useCallback(() => {
    if (engine && doc) {
      engine.saveAsCopy(doc).wait((buffer) => {
        const url = URL.createObjectURL(new Blob([buffer]));
        const linkElem = document.createElement('a');
        linkElem.download = `${doc.id}`;
        linkElem.href = url;
        linkElem.click();
      }, ignore);
    }
  }, [engine, doc]);

  const print = useCallback(() => {}, [engine, doc]);

  return (
    <ToolbarItemGroupComponent
      className={classNames('pdf__toolbar__item__group', className)}
      {...rest}
    >
      <ButtonComponent onClick={saveAs}>{strings.saveAs}</ButtonComponent>
      <ButtonComponent onClick={print}>{strings.print}</ButtonComponent>
      {children}
    </ToolbarItemGroupComponent>
  );
}
