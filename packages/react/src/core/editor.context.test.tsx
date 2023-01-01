import React from 'react';
import {
  PdfEditorContextVale,
  PdfEditorContextProvider,
  usePdfEditor,
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
    const editor = {
      decorations: {},
    };

    const result = render(
      <PdfEditorContextProvider
        decorations={editor.decorations}
        addDecoration={jest.fn()}
        removeDecoration={jest.fn()}
      >
        <Consumer />
      </PdfEditorContextProvider>
    );

    expect(editorInContext?.decorations).toBe(editor.decorations);

    result?.unmount();
  });
});
