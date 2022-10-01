import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  PdfPageAnnotationComponents,
  PdfPageAnnotationComponentsContextProvider,
  usePdfPageAnnotationComponents,
} from "./annotations.contex";
import { PdfPageLinkAnnotationProps } from "./annotations/link";
import { PdfPageTextAnnotation } from "./annotations/text";

describe("PdfPageAnnotationComponentsProvider", () => {
  test("should inject customized component", async () => {
    let annotationComponents: PdfPageAnnotationComponents | undefined;

    function PdfPageAnnotationComponentsConsumer() {
      const context = usePdfPageAnnotationComponents();
      annotationComponents = context.annotationComponents;

      return <div></div>;
    }

    function PdfPageLinkAnnoCustomize(props: PdfPageLinkAnnotationProps) {
      const { anno } = props;

      return (
        <a className="pdf__annotation--customize" href={anno.url}>
          {anno.text}
        </a>
      );
    }

    const result = render(
      <PdfPageAnnotationComponentsContextProvider
        annotationComponents={{
          link: PdfPageLinkAnnoCustomize,
        }}
      >
        <PdfPageAnnotationComponentsConsumer />
      </PdfPageAnnotationComponentsContextProvider>
    );

    expect(annotationComponents?.link).toBe(PdfPageLinkAnnoCustomize);
    expect(annotationComponents?.text).toBe(PdfPageTextAnnotation);

    result.unmount();
  });
});
