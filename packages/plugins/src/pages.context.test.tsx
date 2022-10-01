import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { PdfPageProps } from "./pages";
import {
  PdfPageDecorationComponent,
  PdfPageDecorationsContextProvider,
  usePdfPageDecorationComponents,
} from "./pages.context";

describe("PdfPageAnnotationComponentsProvider", () => {
  test("should inject customized component", async () => {
    function PdfPageNumber(props: PdfPageProps) {
      return <div className="pdf__page__number">{props.page.index + 1}</div>;
    }

    let decorationComponents: PdfPageDecorationComponent[] = [];

    function PdfDecorationComponentsConsumer() {
      const context = usePdfPageDecorationComponents();
      decorationComponents = context.decorationComponents;

      return <div></div>;
    }

    const result = render(
      <PdfPageDecorationsContextProvider decorationComponents={[PdfPageNumber]}>
        <PdfDecorationComponentsConsumer />
      </PdfPageDecorationsContextProvider>
    );
    expect(decorationComponents?.[0]).toBe(PdfPageNumber);

    result.unmount();
  });
});
