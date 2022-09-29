import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { PdfEngineContextProvider } from "@onepdf/core";
import { createMockPdfDocument, createMockPdfEngine } from "@onepdf/mocks";
import { PdfDocument } from "@onepdf/core";
import { PdfPages, PdfPageDecoration, PdfPageProps } from "./pages";

describe("PdfPages", () => {
  function PdfPageNumber(props: PdfPageProps) {
    return <div className="pdf__page__number">{props.page.index + 1}</div>;
  }

  test("should render pdf pages", async () => {
    const pdf = createMockPdfDocument();
    const engine = createMockPdfEngine();
    const result = render(
      <PdfEngineContextProvider engine={engine}>
        <PdfDocument
          source="https://localhost"
          onOpenSuccess={jest.fn()}
          onOpenFailure={jest.fn()}
        >
          <PdfPages
            viewport={{ width: 100, height: 100 }}
            scale={1}
            rotation={0}
          >
            <PdfPageDecoration decoration={PdfPageNumber} />
          </PdfPages>
        </PdfDocument>
      </PdfEngineContextProvider>
    );

    await act(async () => {
      engine.openDefer.resolve(pdf);
      await engine.openDefer.promise;
    });

    expect(document.querySelector(".pdf__pages")).toBeDefined();
    expect(document.querySelectorAll(".pdf__page").length).toEqual(
      pdf.pageCount
    );
    expect(document.querySelectorAll(".pdf__page__number").length).toEqual(
      pdf.pageCount
    );
    expect(document.querySelectorAll(".pdf__page canvas").length).toEqual(3);

    result.unmount();
  });
});
