import {
  PdfDocumentContextProvider,
  PdfEngineContextProvider,
  usePdfDocument,
  usePdfEngine,
} from "./context";
import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { createMockPdfDocument } from "@onepdf/mocks";
import { Theme, ThemeContextProvider, useTheme } from "./theme";

describe("ThemeContextProvider ", () => {
  let themeInContext: Theme | null;
  function Consumer() {
    themeInContext = useTheme();

    return <div></div>;
  }

  test("should assign context value", async () => {
    const theme = {};
    const result = render(
      <ThemeContextProvider theme={theme}>
        <Consumer />
      </ThemeContextProvider>
    );

    expect(themeInContext).toEqual(theme);

    result.unmount();
  });
});
