import React from 'react';
import {
  PdfEditorContextVale,
  PdfEditorContextProvider,
  usePdfEditor,
  PdfEditorTool,
} from './editor.context';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('PdfEditorContextProvider ', () => {
  let editorInContext: PdfEditorContextVale | null;
  function Consumer() {
    editorInContext = usePdfEditor();

    return <div></div>;
  }

  test('should assign context value', () => {
    const result = render(
      <PdfEditorContextProvider>
        <Consumer />
      </PdfEditorContextProvider>
    );

    expect(editorInContext?.tool).toBe(PdfEditorTool.Annotation);

    result?.unmount();
  });
});
