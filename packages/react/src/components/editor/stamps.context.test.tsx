import React from 'react';
import {
  PdfEditorStampsContextValue,
  PdfEditorStampsContextProvider,
  usePdfEditorStamps,
} from './stamps.context';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Stamp } from './stamps';

describe('PdfEditorStampsContextProvider ', () => {
  let stampsInContext: PdfEditorStampsContextValue | null;
  function Consumer() {
    stampsInContext = usePdfEditorStamps();

    return <div></div>;
  }

  test('should assign context value', () => {
    const stamps: Stamp[] = [];
    const onAddStamp = jest.fn();
    const onRemoveStamp = jest.fn();
    const result = render(
      <PdfEditorStampsContextProvider
        stamps={stamps}
        onAddStamp={onAddStamp}
        onRemoveStamp={onRemoveStamp}
      >
        <Consumer />
      </PdfEditorStampsContextProvider>
    );

    expect(stampsInContext?.stamps).toBe(stamps);
    expect(stampsInContext?.onAddStamp).toBe(onAddStamp);
    expect(stampsInContext?.onRemoveStamp).toBe(onRemoveStamp);

    result?.unmount();
  });
});
