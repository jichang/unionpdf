import { PdfPageObject, Rotation, Size } from '@unionpdf/models';
import { ComponentType } from 'react';

export interface PdfPageLayerComponentProps {
  isCurrent: boolean;
  isVisible: boolean;
  inVisibleRange: boolean;
  inCacheRange: boolean;
  page: PdfPageObject;
  scaleFactor: number;
  rotation: Rotation;
  visualSize: Size;
  pageGap: number;
}

export type PdfPageLayerComponent = ComponentType<PdfPageLayerComponentProps>;
