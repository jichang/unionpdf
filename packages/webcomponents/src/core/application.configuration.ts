import { Rotation } from '@unionpdf/models';

/**
 * Application mode
 */
export enum PdfApplicationMode {
  View,
  Edit,
}

/**
 * Plugin configuration
 */
export interface PdfApplicatinPluginConfiguration {
  isEnabled: boolean;
  isVisible: boolean;
}

/**
 * Key for application plugin
 */
export enum PdfApplicatinPluginKey {
  Attachments,
  Bookmarks,
  Downloader,
  Editor,
  Metadata,
  Pages,
  Printer,
  Search,
  Signatures,
  Thumbnails,
  Toolbar,
  Uploader,
}

export const ALL_PDF_APPLICATION_PLUGIN_KEYS: PdfApplicatinPluginKey[] = [
  PdfApplicatinPluginKey.Attachments,
  PdfApplicatinPluginKey.Bookmarks,
  PdfApplicatinPluginKey.Downloader,
  PdfApplicatinPluginKey.Editor,
  PdfApplicatinPluginKey.Metadata,
  PdfApplicatinPluginKey.Pages,
  PdfApplicatinPluginKey.Printer,
  PdfApplicatinPluginKey.Search,
  PdfApplicatinPluginKey.Signatures,
  PdfApplicatinPluginKey.Thumbnails,
  PdfApplicatinPluginKey.Toolbar,
  PdfApplicatinPluginKey.Uploader,
];

/**
 * Default configuration for plugins
 */
export const DEFAULT_PLUGIN_CONFIGURATIONS: Record<
  PdfApplicatinPluginKey,
  PdfApplicatinPluginConfiguration
> = {
  [PdfApplicatinPluginKey.Attachments]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Bookmarks]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Downloader]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Editor]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Metadata]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Pages]: { isEnabled: true, isVisible: true },
  [PdfApplicatinPluginKey.Printer]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Search]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Signatures]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Thumbnails]: { isEnabled: true, isVisible: false },
  [PdfApplicatinPluginKey.Toolbar]: { isEnabled: true, isVisible: true },
  [PdfApplicatinPluginKey.Uploader]: { isEnabled: true, isVisible: false },
};

/**
 * Configuration of pdf application
 */
export interface PdfApplicationConfiguration {
  rotation: Rotation;
  scaleFactor: number;
  plugins: Record<PdfApplicatinPluginKey, PdfApplicatinPluginConfiguration>;
}

/**
 * Configuration provider interface
 */
export interface PdfApplicationConfigurationProvider {
  get: () => PdfApplicationConfiguration;
  setRotation: (rotation: Rotation) => void;
  setScaleFactor: (scaleFactor: number) => void;
  showPlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  hidePlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  togglePlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  subscribe: (
    callback: (configuration: PdfApplicationConfiguration) => void,
  ) => void;
  unsubscribe: (
    callback: (configuration: PdfApplicationConfiguration) => void,
  ) => void;
}

/**
 * Base class for configuration provider
 */
export class PdfApplicationConfigurationProviderBase
  implements PdfApplicationConfigurationProvider
{
  callbacks: Array<(configuration: PdfApplicationConfiguration) => void> = [];

  constructor(
    protected rotation = Rotation.Degree0,
    protected scaleFactor: number = 1.0,
    protected plugins: Record<
      PdfApplicatinPluginKey,
      PdfApplicatinPluginConfiguration
    > = JSON.parse(JSON.stringify(DEFAULT_PLUGIN_CONFIGURATIONS)),
  ) {}

  broadcast() {
    for (const callback of this.callbacks) {
      callback({
        scaleFactor: this.scaleFactor,
        rotation: this.rotation,
        plugins: this.plugins,
      });
    }
  }

  subscribe(callback: (configuration: PdfApplicationConfiguration) => void) {
    const index = this.callbacks.findIndex((c) => c === callback);
    if (index === -1) {
      this.callbacks.push(callback);
    }
  }

  unsubscribe(callback: (configuration: PdfApplicationConfiguration) => void) {
    const index = this.callbacks.findIndex((c) => c === callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
  }

  get(): PdfApplicationConfiguration {
    return {
      rotation: this.rotation,
      scaleFactor: this.scaleFactor,
      plugins: this.plugins,
    };
  }

  setRotation(rotation: Rotation) {
    this.rotation = rotation;
    this.broadcast();
  }

  setScaleFactor(scaleFactor: number) {
    this.scaleFactor = scaleFactor;
    this.broadcast();
  }

  showPlugin(pluginKey: PdfApplicatinPluginKey) {
    for (const key of ALL_PDF_APPLICATION_PLUGIN_KEYS) {
      this.plugins[key].isVisible = key === pluginKey;
    }
    this.broadcast();
  }

  hidePlugin(pluginKey: PdfApplicatinPluginKey) {
    for (const key of ALL_PDF_APPLICATION_PLUGIN_KEYS) {
      if (pluginKey === key) {
        this.plugins[key].isVisible = false;
      }
    }
    this.broadcast();
  }

  togglePlugin(pluginKey: PdfApplicatinPluginKey) {
    const pluginConfiguration = this.plugins[pluginKey];
    if (pluginConfiguration.isVisible) {
      this.hidePlugin(pluginKey);
    } else {
      this.showPlugin(pluginKey);
    }
  }
}

/**
 * In-memory configuration provider
 */
export class MemoryPdfApplicationConfigurationProvider
  extends PdfApplicationConfigurationProviderBase
  implements PdfApplicationConfigurationProvider {}
