import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { PdfDocument, PdfEngineContextProvider } from "@onepdf/core";
import { createMockPdfDocument, createMockPdfEngine } from "@onepdf/mocks";
import { PdfPageDecoration, PdfPages } from "./pages";
import { PdfPageLinks } from "./links";

describe("PdfPageLinks", () => {
  test("should render pdf links", async () => {
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source="https://localhost"
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfPages viewport={{ width: 100, height: 100 }}>
            <PdfPageDecoration decoration={PdfPageLinks} />
          </PdfPages>
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelectorAll(".pdf__link").length).toEqual(
      pdf.pageCount
    );

    result.unmount();
  });
});
