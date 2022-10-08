import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { PdfPageProps } from '../pages';
import {
  PdfPageLayerComponent,
  usePdfPageLayerComponents,
  PdfPageLayersContextProvider,
} from '../pages.context';
import { PdfPageLayer } from './layer';

describe('PdfPageLayerComponentsProvider', () => {
  test('should inject customized component', async () => {
    function PdfLayerComponent() {
      return <div></div>;
    }

    const layerComponents: PdfPageLayerComponent[] = [];
    const addLayerComponent = jest.fn();
    const removeLayerComponent = jest.fn();

    const result = render(
      <PdfPageLayersContextProvider
        layerComponents={layerComponents}
        addLayerComponent={addLayerComponent}
        removeLayerComponent={removeLayerComponent}
      >
        <PdfPageLayer layer={PdfLayerComponent} />
      </PdfPageLayersContextProvider>
    );
    expect(addLayerComponent).toBeCalledTimes(1);
    expect(addLayerComponent).toBeCalledWith(PdfLayerComponent);

    result.unmount();

    expect(removeLayerComponent).toBeCalledTimes(1);
    expect(removeLayerComponent).toBeCalledWith(PdfLayerComponent);
  });
});
