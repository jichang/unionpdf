import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfDocument, PdfEngineContextProvider } from '@unionpdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@unionpdf/mocks';
import { PdfPageContentProps, PdfPages } from '../pages';
import {
  PdfPageLinkAnnotation,
  PdfPageLinkAnnotationProps,
} from '../annotations/link';
import {
  PdfPageAnnotationsContext,
  PdfPageAnnotationsContextProvider,
  PdfPageAnnotationsContextValue,
  usePdfPageAnnotationsContext,
} from './annotations.context';

describe('PdfPageAnnotationsContext', () => {
  test('should inject data into context', async () => {
    let context: PdfPageAnnotationsContextValue | undefined;
    function ContextConsumer() {
      context = usePdfPageAnnotationsContext();
      return null;
    }

    const Popup = jest.fn();

    const result = render(
      <PdfPageAnnotationsContextProvider Popup={Popup}>
        <ContextConsumer />
      </PdfPageAnnotationsContextProvider>
    );

    expect(context?.Popup).toEqual(Popup);

    result.unmount();
  });
});
