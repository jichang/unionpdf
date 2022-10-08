import { useContext, useEffect } from 'react';
import {
  PdfPageLayerComponent,
  PdfPageLayerComponentsContext,
} from '../pages.context';

export interface PdfPageLayerProps {
  layer: PdfPageLayerComponent;
}

export function PdfPageLayer(props: PdfPageLayerProps) {
  const { layer } = props;
  const { addLayerComponent, removeLayerComponent } = useContext(
    PdfPageLayerComponentsContext
  );

  useEffect(() => {
    addLayerComponent?.(layer);

    return () => {
      removeLayerComponent?.(layer);
    };
  }, [layer, addLayerComponent, removeLayerComponent]);

  return null;
}
