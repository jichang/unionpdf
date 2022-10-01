import "@testing-library/jest-dom";
import React from "react";
import { act, render } from "@testing-library/react";
import { PdfDocument, PdfEngineContextProvider } from "@onepdf/core";
import { createMockPdfDocument, createMockPdfEngine } from "@onepdf/mocks";
import { PdfThumbnails } from "./thumbnails";

describe("PdfThumbnails", () => {
  test("should render pdf thumbnails", async () => {
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source="https://localhost"
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfThumbnails
            layout={{ colsCount: 2, rowsCount: 2 }}
            size={{ width: 100, height: 100 }}
          ></PdfThumbnails>
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelector(".pdf__thumbnails")).toBeDefined();
    expect(document.querySelectorAll(".pdf__thumbnail").length).toEqual(
      pdf.pageCount
    );

    result.unmount();
  });
});
