import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import './toolbar.css';
import {
  ErrorBoundary,
  PdfApplicatinPluginKey,
  PdfPlugin,
  PdfApplicationMode,
  usePdfApplication,
  useLogger,
} from '../../core';
import classNames from 'classnames';
import {
  PdfToolbarEditorFileItemGroup,
  PdfToolbarEditorOperationItemGroup,
} from '../editor';
import { PdfToolbarPagesItemGroup } from './pages.toolbar';

/**
 * Properties of PdfToolbar
 */
export interface PdfToolbarProps extends ComponentProps<'div'> {
  /**
   * Toolbar items for plugins
   */
  pluginItems?: React.ReactNode;
  /**
   * Toolbar items for pdf files
   */
  fileItems?: React.ReactNode;
}

/**
 * Plugin to display toolbar
 * @param props - properties of PdfToolbar
 * @returns
 */
export function PdfToolbar(props: PdfToolbarProps) {
  const { pluginItems, fileItems, ...rest } = props;
  const { Toolbar } = useUIComponents();
  const { mode } = usePdfApplication();
  const strings = useUIStrings();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Toolbar}>
      <Toolbar
        scenario={{ usage: 'pdf-toolbar-plugin' }}
        date-testid="pdf__toolbar"
        className="pdf__toolbar"
        {...rest}
      >
        <PdfToolbarSide
          key={`left-${mode}`}
          side="left"
          label={strings.toolbarTools ?? 'Tools'}
        >
          {mode === PdfApplicationMode.View ? (
            <PdfToolbarPluginItemGroup className="pdf__toolbar__item__group--left">
              {pluginItems}
            </PdfToolbarPluginItemGroup>
          ) : (
            <PdfToolbarEditorOperationItemGroup>
              {pluginItems}
            </PdfToolbarEditorOperationItemGroup>
          )}
        </PdfToolbarSide>
        <PdfToolbarPagesItemGroup className="pdf__toolbar__item__group--center" />
        <PdfToolbarSide
          key={`right-${mode}`}
          side="right"
          label={strings.toolbarActions ?? 'Actions'}
        >
          {mode === PdfApplicationMode.View ? (
            <PdfToolbarFileItemGroup className="pdf__toolbar__item__group--right">
              {fileItems}
            </PdfToolbarFileItemGroup>
          ) : (
            <PdfToolbarEditorFileItemGroup className="pdf__toolbar__item__group--right">
              {fileItems}
            </PdfToolbarEditorFileItemGroup>
          )}
        </PdfToolbarSide>
      </Toolbar>
    </PdfPlugin>
  );
}

function PdfToolbarSide({
  side,
  label,
  children,
}: {
  side: 'left' | 'right';
  label: string;
  children: React.ReactNode;
}) {
  const { Button } = useUIComponents();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!isOpen) return;

    const dismiss = (event: PointerEvent) => {
      if (rootRef.current && !event.composedPath().includes(rootRef.current)) {
        setIsOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        rootRef.current
          ?.querySelector<HTMLButtonElement>('.pdf__toolbar__menu__toggle')
          ?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`pdf__toolbar__side pdf__toolbar__side--${side}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <Button
        type="button"
        scenario={{ usage: 'toolbar-menu-toggle', side }}
        className="pdf__toolbar__menu__toggle"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen((open) => !open)}
      >
        {label}
      </Button>
      <div
        id={id}
        className="pdf__toolbar__menu__items"
        data-open={isOpen}
        onClick={(event) => {
          if (
            event.target instanceof Element &&
            event.target.closest('button, a')
          ) {
            setIsOpen(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
/**
 * Properties of PdfToolbarPluginItemGroup
 */
export interface PdfToolbarPluginItemGroupProps extends ComponentProps<'div'> {}

/**
 * Component for showing toolbar item for plugins
 * @param props - properties of PdfToolbarPluginItemGroup
 * @returns
 */
export function PdfToolbarPluginItemGroup(
  props: PdfToolbarPluginItemGroupProps,
) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroup } = useUIComponents();
  const strings = useUIStrings();
  const logger = useLogger();

  return (
    <ErrorBoundary source="PdfToolbarPluginItemGroup" logger={logger}>
      <ToolbarItemGroup
        scenario={{ usage: 'plugins-plugin-item-group' }}
        date-testid="pdf__toolbar__plugin__item__group"
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Metadata}
          text={strings.metadata}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Bookmarks}
          text={strings.bookmarks}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Thumbnails}
          text={strings.thumbnails}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Attachments}
          text={strings.attchments}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Signatures}
          text={strings.signatures}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Search}
          text={strings.search}
        />
        {children}
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}

/**
 * Properties of PdfToolbarPluginItem
 */
export interface PdfToolbarPluginItemProps {
  /**
   * Text of toolbar item
   */
  text: string;
  /**
   * Key for relevant plugin
   */
  pluginKey: PdfApplicatinPluginKey;
}

/**
 * Component for showing toolbar item for plugin
 * @param props - properties of PdfToolbarFileItem
 * @returns
 */
export function PdfToolbarPluginItem(props: PdfToolbarPluginItemProps) {
  const { text, pluginKey } = props;
  const { Button } = useUIComponents();
  const { plugins, togglePlugin } = usePdfApplication();

  const toggle = useCallback(() => {
    togglePlugin(pluginKey);
  }, [togglePlugin, pluginKey]);

  if (!plugins[pluginKey].isEnabled) {
    return null;
  }

  return (
    <Button
      scenario={{ usage: 'plugin-toggle', pluginKey }}
      data-testid={`pdf__toolbar__item__plugin__${pluginKey}`}
      onClick={toggle}
    >
      {text}
    </Button>
  );
}

/**
 * Properties of PdfToolbarFileItemGroup
 */
export interface PdfToolbarFileItemGroupProps extends ComponentProps<'div'> {}

/**
 * Component for showing toolbar item for plugins
 * @param props - properties of PdfToolbarFileItemGroup
 * @returns
 */
export function PdfToolbarFileItemGroup(props: PdfToolbarFileItemGroupProps) {
  const { className, children, ...rest } = props;
  const { ToolbarItemGroup } = useUIComponents();
  const strings = useUIStrings();
  const logger = useLogger();

  return (
    <ErrorBoundary source="PdfToolbarFileItemGroup" logger={logger}>
      <ToolbarItemGroup
        scenario={{ usage: 'plugins-file-item-group' }}
        date-testid="pdf__toolbar__plugin__file__group"
        className={classNames('pdf__toolbar__item__group', className)}
        {...rest}
      >
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Editor}
          text={strings.edit}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Downloader}
          text={strings.saveAs}
        />
        <PdfToolbarPluginItem
          pluginKey={PdfApplicatinPluginKey.Printer}
          text={strings.print}
        />
        {children}
      </ToolbarItemGroup>
    </ErrorBoundary>
  );
}
