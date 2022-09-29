import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { PdfDocument, PdfEngineContextProvider } from "@onepdf/core";
import { createMockPdfDocument, createMockPdfEngine } from "@onepdf/mocks";
import { PdfOutline } from "./outline";

describe("PdfOutline", () => {
  test("should render pdf outline", async () => {
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source="https://localhost"
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfOutline />
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelector(".pdf__outline")).toBeDefined();
    expect(document.querySelectorAll(".pdf__outline__item").length).toEqual(2);

    result.unmount();
  });
});
