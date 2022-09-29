import { usePdfEngine } from "@onepdf/core";
import { PdfLinkModel } from "@onepdf/models";
import { useState, useEffect, createContext } from "react";
import { PdfPageProps } from "./pages";

export interface LinksContextValue {
  onClick?: (link: PdfLinkModel) => void;
}

export const LinksContext = createContext<LinksContextValue>({});

export interface PdfPageLinksProps extends PdfPageProps {}

export function PdfPageLinks(props: PdfPageLinksProps) {
  const { page } = props;
  const engine = usePdfEngine();
  const [links, setLinks] = useState<PdfLinkModel[]>([]);

  useEffect(() => {
    if (engine && page) {
      const load = async () => {
        const result = engine.getPageLinks(page);
        if (result instanceof Promise) {
          result.then(setLinks);
        } else {
          setLinks(result);
        }
      };

      load();
    }
  }, [engine, page]);

  return (
    <>
      {links.map((link, index) => {
        return (
          <a
            key={index}
            style={{
              opacity: 0,
              userSelect: "none",
              position: "absolute",
              top: link.bound.y,
              left: link.bound.x,
              width: link.bound.width,
              height: link.bound.height,
            }}
            className="pdf__link"
            href={link.url}
          >
            {link.text}
          </a>
        );
      })}
    </>
  );
}
