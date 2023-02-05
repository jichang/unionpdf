import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  PdfPageAnnotationComponent,
  PdfPageAnnotationComponentContextProvider,
  usePdfPageAnnotationComponent,
} from './annotations.context';

describe('PdfApplicationContextProvider ', () => {
  let appInContext: PdfPageAnnotationComponent | null;
  function Consumer() {
    appInContext = usePdfPageAnnotationComponent();

    return <div></div>;
  }

  function AnnotationComponent() {
    return null;
  }

  test('should assign context value', async () => {
    const result = render(
      <PdfPageAnnotationComponentContextProvider
        component={AnnotationComponent}
      >
        <Consumer />
      </PdfPageAnnotationComponentContextProvider>
    );

    expect(appInContext).toEqual(AnnotationComponent);

    result.unmount();
  });
});
