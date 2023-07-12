import { PdfPageObject, Rotation, Size } from '@unionpdf/models';
import { ComponentType } from 'react';

/**
 * Properties of page layer component
 */
export interface PdfPageLayerComponentProps {
  /**
   * Whether page is current page
   */
  isCurrent: boolean;
  /**
   * Whether page is visible
   */
  isVisible: boolean;
  /**
   * Whether page is in visible range
   */
  inVisibleRange: boolean;
  /**
   * Whether page is in cache range
   */
  inCacheRange: boolean;
  /**
   * Pdf page object
   */
  page: PdfPageObject;
  /**
   * Current scaling factor
   */
  scaleFactor: number;
  /**
   * Current rotation angle
   */
  rotation: Rotation;
  /**
   * Gap between pages
   */
  pageGap: number;
}

/**
 * Type of pdf page layer component
 */
export type PdfPageLayerComponent = ComponentType<PdfPageLayerComponentProps>;
