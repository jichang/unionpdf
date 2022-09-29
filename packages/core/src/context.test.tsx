import {
  PdfDocumentContextProvider,
  PdfEngineContextProvider,
  usePdfDocument,
  usePdfEngine,
} from "./context";
import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { createMockPdfDocument, createMockPdfEngine } from "@onepdf/mocks";
import { PdfDocumentModel } from "@onepdf/models";

describe("PdfEngineContextProvider ", () => {
  function Consumer({ signal }: { signal: AbortSignal }) {
    const engine = usePdfEngine();

    if (engine) {
      engine.open("http://localhost", signal);
    }

    return <div></div>;
  }

  test("should assign context value", () => {
    const abortController = new AbortController();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <Consumer signal={abortController.signal} />
      </PdfEngineContextProvider>
    );

    act(() => {
      engine.openDefer.resolve(createMockPdfDocument());
    });

    expect(engine.open).toBeCalledTimes(1);
    expect(engine.open).toBeCalledWith(
      "http://localhost",
      abortController.signal
    );

    result?.unmount();
  });
});

describe("PdfContextProvider ", () => {
  let pdfInContext: PdfDocumentModel | null;
  function Consumer() {
    pdfInContext = usePdfDocument();

    return <div></div>;
  }

  test("should assign context value", async () => {
    const pdf = createMockPdfDocument();
    const result = render(
      <PdfDocumentContextProvider doc={pdf}>
        <Consumer />
      </PdfDocumentContextProvider>
    );

    expect(pdfInContext).toEqual(pdf);

    result.unmount();
  });
});
