import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import {
  createMockPdfDocument,
  createMockPdfEngine,
  createMockPdfFile,
} from '@unionpdf/engines';
import {
  PdfTaskHelper,
  PdfDocumentObject,
  PdfEngineError,
  Task,
  PdfErrorReason,
} from '@unionpdf/models';
import { PdfEngineContextProvider } from '../../core/engine.context';
import { PdfDocument } from '../../core/document';
import { intersectionObserver } from '../../mocks/intersectionObserver';
import { PdfApplicationContextProvider } from '../../core';
import { PdfPages } from '../plugins/pages';
import { PdfPageEditorLayer } from '../pageLayers';
import { PdfPageEditorAnnotation } from './annotation';
import { PdfPageAnnotationComponentContextProvider } from '../common';
import { testingMemoryPdfApplicationConfigurationProvider } from '../../adapters/testing';

describe('PdfEditorAnnotation', () => {
  test('should render pdf editor annotation', async () => {
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
    const result = render(
      <PdfApplicationContextProvider
        provider={testingMemoryPdfApplicationConfigurationProvider}
      >
        <PdfEngineContextProvider engine={engine}>
          <PdfDocument
            file={createMockPdfFile()}
            password=""
            onOpenSuccess={jest.fn()}
            onOpenFailure={jest.fn()}
          >
            <PdfPageAnnotationComponentContextProvider
              component={PdfPageEditorAnnotation}
            >
              <PdfPages pageGap={8} pageLayers={[PdfPageEditorLayer]} />
            </PdfPageAnnotationComponentContextProvider>
          </PdfDocument>
        </PdfEngineContextProvider>
      </PdfApplicationContextProvider>,
    );

    act(() => {
      openDocumentTask.resolve(pdf);
    });

    act(() => {
      intersectionObserver.simulate([{ isIntersecting: true }]);
    });

    expect(
      document.querySelectorAll('.pdf__page__annotation--editor').length,
    ).toEqual(10);

    result.unmount();
    intersectionObserver.restore();
  });
});
