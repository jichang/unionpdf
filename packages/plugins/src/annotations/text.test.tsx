import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { PdfPageLinkAnnotation } from "./link";
import { PdfLinkAnnoObject } from "@onepdf/models";

describe("PdfPageLink", () => {
  test("should render pdf link", async () => {
    const link: PdfLinkAnnoObject = {
      type: "link",
      url: "https://localhost",
      text: "Link",
      rect: {
        x: 0,
        y: 0,
        height: 100,
        width: 100,
      },
    };
    const result = render(<PdfPageLinkAnnotation anno={link} />);

    const linkElem = document.querySelector(".pdf__annotation--text");
    expect(linkElem).toBeDefined();

    result.unmount();
  });
});
