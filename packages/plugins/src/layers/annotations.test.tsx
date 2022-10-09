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
import { PdfPageAnnotations } from './annotations';
import { PdfPageAnnotation } from '../annotations/annotation';

describe('PdfPageAnnotations', () => {
  test('should render pdf annotations', async () => {
    const components = {
      link: PdfPageLinkAnnotation,
    };

    function PdfPageContent(props: PdfPageContentProps) {
      return (
        <>
          <PdfPageAnnotations {...props} components={components} />
        </>
      );
    }
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source="https://localhost"
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfPages
            pageGap={8}
            viewport={{ width: 100, height: 100 }}
            content={PdfPageContent}
          />
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
    function PdfPageLinkAnnotationCustomize(props: PdfPageLinkAnnotationProps) {
      const { annotation, scaleFactor, rotation } = props;

      return (
        <PdfPageAnnotation
          annotation={annotation}
          scaleFactor={scaleFactor}
          rotation={rotation}
        >
          <a
            style={{
              opacity: 0,
              userSelect: 'none',
              position: 'absolute',
              top: annotation.rect.origin.y,
              left: annotation.rect.origin.x,
              width: annotation.rect.size.width,
              height: annotation.rect.size.height,
            }}
            className="pdf__annotation--customize"
          >
            {annotation.text}
          </a>
        </PdfPageAnnotation>
      );
    }

    const components = {
      link: PdfPageLinkAnnotationCustomize,
    };

    function PdfPageContent(props: PdfPageContentProps) {
      return (
        <>
          <PdfPageAnnotations {...props} components={components} />
        </>
      );
    }

    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source="https://localhost"
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfPages
            pageGap={8}
            viewport={{ width: 100, height: 100 }}
            content={PdfPageContent}
          />
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
    expect(
      document.querySelectorAll('.pdf__annotation--customize').length
    ).toEqual(pdf.pageCount);

    result.unmount();
  });
});
