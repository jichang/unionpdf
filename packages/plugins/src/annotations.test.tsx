import React from 'react';
import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { PdfDocument, PdfEngineContextProvider } from '@onepdf/core';
import { createMockPdfDocument, createMockPdfEngine } from '@onepdf/mocks';
import { PdfPageDecoration, PdfPages } from './pages';
import { PdfPageAnnotations } from './annotations';
import { PdfPageLinkAnnotationProps } from './annotations/link';
import { PdfPageAnnotationComponentsContextProvider } from './annotations.contex';

describe('PdfPageAnnotations', () => {
  test('should render pdf annotations', async () => {
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source="https://localhost"
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfPages pageGap={8} viewport={{ width: 100, height: 100 }}>
            <PdfPageDecoration decoration={PdfPageAnnotations} />
          </PdfPages>
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelectorAll('.pdf__annotation').length).toEqual(
      pdf.pageCount
    );
    expect(document.querySelectorAll('.pdf__annotation--link').length).toEqual(
      pdf.pageCount
    );

    result.unmount();
  });

  test('should render pdf annotations with customized component', async () => {
    function PdfPageLinkAnnoCustomize(props: PdfPageLinkAnnotationProps) {
      const { anno } = props;

      return (
        <a
          style={{
            opacity: 0,
            userSelect: 'none',
            position: 'absolute',
            top: anno.rect.origin.y,
            left: anno.rect.origin.x,
            width: anno.rect.size.width,
            height: anno.rect.size.height,
          }}
          className="pdf__annotation--customize"
          href={anno.url}
        >
          {anno.text}
        </a>
      );
    }
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfPageAnnotationComponentsContextProvider
          annotationComponents={{
            link: PdfPageLinkAnnoCustomize,
          }}
        >
          <PdfDocument
            source="https://localhost"
            onOpenSuccess={jest.fn()}
            onOpenFailure={jest.fn()}
          >
            <PdfPages pageGap={8} viewport={{ width: 100, height: 100 }}>
              <PdfPageDecoration decoration={PdfPageAnnotations} />
            </PdfPages>
          </PdfDocument>
        </PdfPageAnnotationComponentsContextProvider>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelectorAll('.pdf__annotation').length).toEqual(
      pdf.pageCount
    );
    expect(
      document.querySelectorAll('.pdf__annotation--customize').length
    ).toEqual(pdf.pageCount);

    result.unmount();
  });
});
