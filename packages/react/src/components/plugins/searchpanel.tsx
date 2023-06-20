import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ComponentProps } from 'react';
import './searchpanel.css';
import classNames from 'classnames';
import { ignore, MatchFlag, PdfZoomMode } from '@unionpdf/models';
import { usePdfDocument } from '../../core/document.context';
import { usePdfEngine } from '../../core/engine.context';
import { useUIComponents, useUIStrings } from '../../adapters';
import { usePdfNavigator } from '../../core';

export interface PdfSearchPanelProps extends ComponentProps<'div'> {}

export const PDF_NAVIGATOR_SOURCE_SEARCH_PANEL = 'PdfSearchPanel';

export function PdfSearchPanel(props: PdfSearchPanelProps) {
  const { className, children, ...rest } = props;

  const engine = usePdfEngine();
  const { doc } = usePdfDocument();
  const { gotoPage } = usePdfNavigator();
  const [contextId] = useState(() => {
    return Date.now();
  });

  useEffect(() => {
    if (engine && doc) {
      const task = engine.startSearch(doc, contextId);
      return () => {
        task.abort();
        engine.stopSearch(doc, contextId);
      };
    }
  }, [engine, doc, contextId]);

  const [flags, setFlags] = useState<MatchFlag[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const updateKeyword = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setKeyword(evt.target.value);
    },
    [setKeyword]
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
    [setFlags]
  );

  const searchNext = useCallback(
    (keyword: string, flags: MatchFlag[]) => {
      if (engine && doc) {
        engine.searchNext(doc, contextId, { keyword, flags }).wait((result) => {
          if (result) {
            gotoPage(
              {
                destination: {
                  pageIndex: result?.pageIndex,
                  zoom: {
                    mode: PdfZoomMode.Unknown,
                  },
                  view: [],
                },
              },
              PDF_NAVIGATOR_SOURCE_SEARCH_PANEL
            );
          }
        }, ignore);
      }
    },
    [engine, doc, contextId, gotoPage]
  );

  const searchPrev = useCallback(
    (keyword: string, flags: MatchFlag[]) => {
      if (engine && doc) {
        engine
          .searchPrev(doc, contextId, { keyword, flags })
          .wait(ignore, ignore);
      }
    },
    [engine, doc, contextId]
  );

  const search = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault();

      if (engine && doc) {
        searchNext(keyword, flags);
      }
    },
    [keyword, flags, searchNext, searchPrev]
  );

  const { Input, Checkbox, Label, Form } = useUIComponents();
  const strings = useUIStrings();

  return (
    <div className={classNames('pdf__search__panel', className)} {...rest}>
      <Form onSubmit={search}>
        <Input onChange={updateKeyword} />
        <div>
          <Checkbox
            id="pdf__searchpanel__matchcase"
            value={MatchFlag.MatchCase}
            checked={flags.includes(MatchFlag.MatchCase)}
            onChange={toggleFlag}
          />
          <Label htmlFor="pdf__searchpanel__matchcase">
            {strings.matchCase}
          </Label>
        </div>
        <div>
          <Checkbox
            id="pdf__searchpanel__matchwholeword"
            value={MatchFlag.MatchWholeWord}
            checked={flags.includes(MatchFlag.MatchWholeWord)}
            onChange={toggleFlag}
          />
          <Label htmlFor="pdf__searchpanel__matchwholeword">
            {strings.matchWholeWord}
          </Label>
        </div>
        <div>
          <Checkbox
            id="pdf__searchpanel__matchsecutive"
            value={MatchFlag.MatchConsecutive}
            checked={flags.includes(MatchFlag.MatchConsecutive)}
            onChange={toggleFlag}
          />
          <Label htmlFor="pdf__searchpanel__matchconsecutive">
            {strings.matchConsecutive}
          </Label>
        </div>
      </Form>
    </div>
  );
}
