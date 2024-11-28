import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ComponentProps } from 'react';
import './search.css';
import classNames from 'classnames';
import {
  ignore,
  MatchFlag,
  PdfErrorCode,
  PdfZoomMode,
  SearchResult,
} from '@unionpdf/models';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { useUIComponents, useUIStrings } from '../../adapters';
import {
  PdfApplicatinPluginKey,
  PdfPlugin,
  PdfPluginPanel,
  usePdfNavigator,
} from '../../core';
import { usePdfDocumentDecorations } from '../../core/decorations.context';

/**
 * Properties of PdfSearch
 */
export interface PdfSearchProps extends ComponentProps<'div'> {}

export const PDF_NAVIGATOR_SOURCE_SEARCH = 'PdfSearch';

export const PDF_PAGE_DECORATION_TYPE_SEARCH = 'highlight';

/**
 * Plugin used to searching in pdf
 * @param props - properties of PdfSearch
 * @returns
 */
export function PdfSearch(props: PdfSearchProps) {
  const strings = useUIStrings();

  return (
    <PdfPlugin pluginKey={PdfApplicatinPluginKey.Search}>
      <PdfPluginPanel
        pluginKey={PdfApplicatinPluginKey.Search}
        title={strings.search}
      >
        <PdfSearchContent {...props} />
      </PdfPluginPanel>
    </PdfPlugin>
  );
}

/**
 * Content of PdfSearch
 * @param props - properties of PdfSearchContent
 * @returns
 *
 * @public
 */
export function PdfSearchContent(props: PdfSearchProps) {
  const { className, children, ...rest } = props;

  const engine = usePdfEngine();
  const { doc } = usePdfDocument();
  const { addDecoration, removeDecoration } = usePdfDocumentDecorations();
  const { gotoPage } = usePdfNavigator();
  const [contextId] = useState(() => {
    return Date.now();
  });
  const currentResultRef = useRef<SearchResult | undefined>(undefined);

  useEffect(() => {
    if (engine && doc) {
      const task = engine.startSearch(doc, contextId);
      return () => {
        task.abort({
          code: PdfErrorCode.Cancelled,
          message: '',
        });
        engine.stopSearch(doc, contextId);

        if (currentResultRef.current) {
          removeDecoration({
            index: 0,
            pageIndex: currentResultRef.current.pageIndex,
            type: PDF_PAGE_DECORATION_TYPE_SEARCH,
            source: PDF_NAVIGATOR_SOURCE_SEARCH,
            payload: currentResultRef.current.region,
          });
          currentResultRef.current = undefined;
        }
      };
    }
  }, [engine, doc, contextId]);

  const [flags, setFlags] = useState<MatchFlag[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const updateKeyword = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setKeyword(evt.target.value);
    },
    [setKeyword],
  );

  const toggleFlag = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setFlags((flags) => {
        const flag = parseInt(evt.target.value, 10) as MatchFlag;
        if (flags.includes(flag)) {
          return flags.filter((_flag) => {
            return _flag !== flag;
          });
        } else {
          return [...flags, flag];
        }
      });
    },
    [setFlags],
  );

  const searchNext = useCallback(
    (keyword: string, flags: MatchFlag[]) => {
      if (engine && doc) {
        engine.searchNext(doc, contextId, { keyword, flags }).wait((result) => {
          if (result) {
            if (currentResultRef.current) {
              removeDecoration({
                index: 0,
                pageIndex: currentResultRef.current.pageIndex,
                type: PDF_PAGE_DECORATION_TYPE_SEARCH,
                source: PDF_NAVIGATOR_SOURCE_SEARCH,
                payload: currentResultRef.current.region,
              });
            }

            currentResultRef.current = result;
            addDecoration({
              index: 0,
              pageIndex: currentResultRef.current.pageIndex,
              type: PDF_PAGE_DECORATION_TYPE_SEARCH,
              source: PDF_NAVIGATOR_SOURCE_SEARCH,
              payload: currentResultRef.current.region,
            });

            gotoPage(
              {
                destination: {
                  pageIndex: result.pageIndex,
                  zoom: {
                    mode: PdfZoomMode.Unknown,
                  },
                  view: [],
                },
              },
              PDF_NAVIGATOR_SOURCE_SEARCH,
            );
          }
        }, ignore);
      }
    },
    [engine, doc, contextId, gotoPage, addDecoration, removeDecoration],
  );

  const searchPrev = useCallback(
    (keyword: string, flags: MatchFlag[]) => {
      if (engine && doc) {
        engine.searchPrev(doc, contextId, { keyword, flags }).wait((result) => {
          if (result) {
            if (currentResultRef.current) {
              removeDecoration({
                index: 0,
                pageIndex: currentResultRef.current.pageIndex,
                type: PDF_PAGE_DECORATION_TYPE_SEARCH,
                source: PDF_NAVIGATOR_SOURCE_SEARCH,
                payload: currentResultRef.current.region,
              });
            }

            currentResultRef.current = result;
            addDecoration({
              index: 0,
              pageIndex: currentResultRef.current.pageIndex,
              type: PDF_PAGE_DECORATION_TYPE_SEARCH,
              source: PDF_NAVIGATOR_SOURCE_SEARCH,
              payload: currentResultRef.current.region,
            });

            gotoPage(
              {
                destination: {
                  pageIndex: result.pageIndex,
                  zoom: {
                    mode: PdfZoomMode.Unknown,
                  },
                  view: [],
                },
              },
              PDF_NAVIGATOR_SOURCE_SEARCH,
            );
          }
        }, ignore);
      }
    },
    [engine, doc, contextId, gotoPage, addDecoration, removeDecoration],
  );

  const startSearchPrevious = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();

      if (engine && doc) {
        searchPrev(keyword, flags);
      }
    },
    [keyword, flags, searchPrev],
  );

  const search = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();

      if (engine && doc) {
        searchNext(keyword, flags);
      }
    },
    [keyword, flags, searchNext],
  );

  const { Input, Checkbox, Button, Label, Form, FormField } = useUIComponents();
  const strings = useUIStrings();

  return (
    <div className={classNames('pdf__search', className)} {...rest}>
      <Form scenario={{ usage: 'search' }} onSubmit={search}>
        <FormField scenario={{ usage: 'search' }}>
          <Input onChange={updateKeyword} />
        </FormField>
        <FormField scenario={{ usage: 'search' }}>
          <Checkbox
            id="pdf__search__matchcase"
            value={MatchFlag.MatchCase}
            checked={flags.includes(MatchFlag.MatchCase)}
            onChange={toggleFlag}
          />
          <Label htmlFor="pdf__search__matchcase">{strings.matchCase}</Label>
        </FormField>
        <FormField scenario={{ usage: 'search' }}>
          <Checkbox
            id="pdf__search__matchwholeword"
            value={MatchFlag.MatchWholeWord}
            checked={flags.includes(MatchFlag.MatchWholeWord)}
            onChange={toggleFlag}
          />
          <Label htmlFor="pdf__search__matchwholeword">
            {strings.matchWholeWord}
          </Label>
        </FormField>
        <FormField scenario={{ usage: 'search' }}>
          <Checkbox
            id="pdf__search__matchsecutive"
            value={MatchFlag.MatchConsecutive}
            checked={flags.includes(MatchFlag.MatchConsecutive)}
            onChange={toggleFlag}
          />
          <Label htmlFor="pdf__search__matchconsecutive">
            {strings.matchConsecutive}
          </Label>
        </FormField>
        <FormField scenario={{ usage: 'search' }}>
          <Button
            type="button"
            scenario={{ usage: 'search-previous-match' }}
            onClick={startSearchPrevious}
          >
            {strings.previousMatch}
          </Button>
          <Button scenario={{ usage: 'search-next-match' }}>
            {strings.nextMatch}
          </Button>
        </FormField>
      </Form>
    </div>
  );
}
