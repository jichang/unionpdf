import { usePdfDocument, usePdfEngine } from "@onepdf/core";
import { PdfOutlineModel, PdfOutlineItemModel } from "@onepdf/models";
import { useCallback, useEffect, useState } from "react";

export interface PdfOutlineProps {}

export function PdfOutline(props: PdfOutlineProps) {
  const engine = usePdfEngine();
  const doc = usePdfDocument();
  const [outline, setOutline] = useState<PdfOutlineModel>({ items: [] });

  useEffect(() => {
    if (engine) {
      const load = async () => {
        const result = engine.getOutline();
        if (result instanceof Promise) {
          result.then(setOutline);
        } else {
          setOutline(result);
        }
      };

      load();
    }
  }, [engine, doc]);

  return (
    <div className="pdf__outline">
      <ol style={{ listStyle: "none", paddingLeft: "1rem" }}>
        {outline.items.map((item, index) => {
          return <PdfOutlineItem key={index} item={item} />;
        })}
      </ol>
    </div>
  );
}

export interface PdfOutlineItemProps {
  item: PdfOutlineItemModel;
}

export function PdfOutlineItem(props: PdfOutlineItemProps) {
  const { item } = props;

  const [isUnfold, setIsUnfold] = useState(false);

  const toggleUnfold = useCallback(() => {
    setIsUnfold((isUnfold) => {
      return !isUnfold;
    });
  }, [setIsUnfold]);

  return (
    <li className="pdf__outline__item" style={{ padding: "0.5rem 0" }}>
      <span onClick={toggleUnfold}>{item.text}</span>
      {item.children && isUnfold ? (
        <ol style={{ listStyle: "none", paddingLeft: "1rem" }}>
          {item.children.map((item, index) => {
            return <PdfOutlineItem key={index} item={item} />;
          })}
        </ol>
      ) : null}
    </li>
  );
}
