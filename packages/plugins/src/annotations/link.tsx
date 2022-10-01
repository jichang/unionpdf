import { PdfLinkAnnoObject } from "@onepdf/models";

export interface PdfPageLinkAnnotationProps {
  anno: PdfLinkAnnoObject;
}

export function PdfPageLinkAnnotation(props: PdfPageLinkAnnotationProps) {
  const { anno } = props;

  return (
    <a
      style={{
        opacity: 0,
        userSelect: "none",
        position: "absolute",
        top: anno.rect.y,
        left: anno.rect.x,
        width: anno.rect.width,
        height: anno.rect.height,
      }}
      className="pdf__annotation--link"
      href={anno.url}
    >
      {anno.text}
    </a>
  );
}
