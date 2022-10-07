import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { PdfPageProps } from './pages';
import {
  PdfPageLayerComponent,
  PdfPageLayersContextProvider,
  usePdfPageLayerComponents,
} from './pages.context';

describe('PdfPageLayerComponentsProvider', () => {
  test('should inject customized component', async () => {
    function PdfPageNumber(props: PdfPageProps) {
      return <div className="pdf__page__number">{props.page.index + 1}</div>;
    }

    let layerComponents: PdfPageLayerComponent[] = [];

    function PdfLayerComponentsConsumer() {
      const context = usePdfPageLayerComponents();
      layerComponents = context.layerComponents;

      return <div></div>;
    }

    const result = render(
      <PdfPageLayersContextProvider layerComponents={[PdfPageNumber]}>
        <PdfLayerComponentsConsumer />
      </PdfPageLayersContextProvider>
    );
    expect(layerComponents?.[0]).toBe(PdfPageNumber);

    result.unmount();
  });
});
