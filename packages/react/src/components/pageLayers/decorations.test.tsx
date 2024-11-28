import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import { PdfPages } from '../plugins/pages';
import { PdfPageDecorationsLayer } from './decorations';
import {
  PdfTaskHelper,
  PdfDocumentObject,
  PdfErrorReason,
  Task,
} from '@unionpdf/models';
import { PdfDocument } from '../../core/document';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { intersectionObserver } from '../../mocks/intersectionObserver';
import { PdfDocumentContextValue } from '../../core';
import {
  PdfDecorationsContextValue,
  usePdfDocumentDecorations,
} from '../../core/decorations.context';

describe('PdfPageDecorationLayer', () => {
  test('should render pdf text', async () => {
    intersectionObserver.mock();
    const pdf = createMockPdfDocument();
    const openDocumentTask = new Task<PdfDocumentObject, PdfErrorReason>();
    const closeDocumentTask = PdfTaskHelper.resolve<boolean>(true);
    const engine = createMockPdfEngine({
      openDocument: jest.fn(() => {
        return openDocumentTask;
      }),
      closeDocument: jest.fn(() => {
        return closeDocumentTask;
      }),
    });

    let fakeDecorations: PdfDecorationsContextValue | undefined;

    function DecorationProducer(): JSX.Element {
      fakeDecorations = usePdfDocumentDecorations();

      return <></>;
    }

    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          file={createMockPdfFile()}
          password=""
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <DecorationProducer />
          <PdfPages pageGap={8} pageLayers={[PdfPageDecorationsLayer]} />
        </PdfDocument>
      </PdfEngineContextProvider>,
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    act(() => {
      intersectionObserver.simulate([{ isIntersecting: true }]);
    });

    expect(document.querySelectorAll('.pdf__decoration__rect').length).toEqual(
      0,
    );

    const decoration = {
      pageIndex: 0,
      index: 0,
      type: 'test',
      source: 'test',
      payload: {
        start: {
          origin: {
            x: 0,
            y: 0,
          },
          size: {
            width: 0,
            height: 0,
          },
        },
        end: {
          origin: {
            x: 0,
            y: 0,
          },
          size: {
            width: 0,
            height: 0,
          },
        },
      },
    };

    act(() => {
      fakeDecorations?.addDecoration(decoration);
    });

    expect(document.querySelectorAll('.pdf__decoration__rect').length).toEqual(
      1,
    );

    act(() => {
      fakeDecorations?.removeDecoration(decoration);
    });

    expect(document.querySelectorAll('.pdf__decoration__rect').length).toEqual(
      0,
    );

    result.unmount();
    intersectionObserver.restore();
  });
});
