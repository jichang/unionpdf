import React from 'react';
import {
  PdfEditorContextVale,
  PdfEditorContextProvider,
  usePdfEditor,
  EditorTool,
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

    expect(editorInContext?.tool).toBe(EditorTool.Selection);
    expect(editorInContext?.stacks).toStrictEqual({
      undo: [],
      redo: [],
      committed: [],
    });

    result?.unmount();
  });
});
