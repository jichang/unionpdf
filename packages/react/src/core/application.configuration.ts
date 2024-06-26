import { Rotation } from '@unionpdf/models';

/**
 * Application mode
 *
 * @public
 */
export enum PdfApplicationMode {
  /**
   * Used for viewing pdf files
   */
  View,
  /**
   * Used for editing pdf files
   */
  Edit,
}

/**
 * Plugin configuration
 *
 * @public
 */
export interface PdfApplicatinPluginConfiguration {
  /**
   * Whether plugin is enabled
   */
  isEnabled: boolean;
  /**
   * Whether plugin is visible
   */
  isVisible: boolean;
}

/**
 * Key for application plugin
 *
 * @public
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
 *
 * @public
 */
export const DEFAULT_PLUGIN_CONFIGURATIONS: Record<
  PdfApplicatinPluginKey,
  PdfApplicatinPluginConfiguration
> = {
  [PdfApplicatinPluginKey.Attachments]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Bookmarks]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Downloader]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Editor]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Metadata]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Pages]: {
    isEnabled: true,
    isVisible: true,
  },
  [PdfApplicatinPluginKey.Printer]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Search]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Signatures]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Thumbnails]: {
    isEnabled: true,
    isVisible: false,
  },
  [PdfApplicatinPluginKey.Toolbar]: {
    isEnabled: true,
    isVisible: true,
  },
  [PdfApplicatinPluginKey.Uploader]: {
    isEnabled: true,
    isVisible: false,
  },
};

/**
 * Configuration of pdf application
 *
 * @public
 */
export interface PdfApplicationConfiguration {
  /**
   * Rotation angle of pdf pages
   */
  rotation: Rotation;
  /**
   * Scaling factor of pdf pages
   */
  scaleFactor: number;
  /**
   * Configuration of plugins
   */
  plugins: Record<PdfApplicatinPluginKey, PdfApplicatinPluginConfiguration>;
}

/**
 * Configuration provider is used to read/save application configuration
 *
 * @public
 */
export interface PdfApplicationConfigurationProvider {
  /**
   * Get application configuration
   * @returns applicaton configuration
   */
  get: () => PdfApplicationConfiguration;

  /**
   * Set rotation angle
   * @param rotation - rotation angle
   * @returns
   */
  setRotation: (rotation: Rotation) => void;
  /**
   * Set scaling factor
   * @param scaleFactor
   * @returns
   */
  setScaleFactor: (scaleFactor: number) => void;

  /**
   * show plugin specificed by pluginKey
   * @param pluginKey
   * @returns
   */
  showPlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  /**
   * hide plugin specificed by pluginKey
   * @param pluginKey
   * @returns
   */
  hidePlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  /**
   * toggle plugin specificed by pluginKey
   * @param pluginKey
   * @returns
   */
  togglePlugin: (pluginKey: PdfApplicatinPluginKey) => void;

  /**
   * Subscribe to the configuration changes
   * @param callback
   * @returns
   */
  subscribe: (
    callback: (configuration: PdfApplicationConfiguration) => void,
  ) => void;
  /**
   * Unsubscribe from the configuration changes
   * @param callback
   * @returns
   */
  unsubscribe: (
    callback: (configuration: PdfApplicationConfiguration) => void,
  ) => void;
}

/**
 * Base class for configuration provider
 *
 * @public
 */
export class PdfApplicationConfigurationProviderBase
  implements PdfApplicationConfigurationProvider
{
  /**
   * Callbacks that subscribed to the configuration change event
   *
   * @private
   */
  callbacks: Array<(configuratin: PdfApplicationConfiguration) => void> = [];

  /**
   * Create an instance of PdfApplicationConfigurationProviderBase
   * @param rotation - rotation angle
   * @param scaleFactor - scale factor
   * @param plugins - plugins configurations
   */
  constructor(
    protected rotation = Rotation.Degree0,
    protected scaleFactor: number = 1.0,
    protected plugins: Record<
      PdfApplicatinPluginKey,
      PdfApplicatinPluginConfiguration
    > = DEFAULT_PLUGIN_CONFIGURATIONS,
  ) {}

  /**
   * broadcast configuration changes event to subscribers
   *
   * @protected
   */
  broadcast() {
    for (const callback of this.callbacks) {
      callback({
        scaleFactor: this.scaleFactor,
        rotation: this.rotation,
        plugins: this.plugins,
      });
    }
  }

  /** @inheritDoc PdfApplicationConfigurationProvider.subscribe  */
  subscribe(callback: (configuration: PdfApplicationConfiguration) => void) {
    const index = this.callbacks.findIndex((_callback) => {
      return _callback === callback;
    });
    if (index === -1) {
      this.callbacks.push(callback);
    }
  }

  /** @inheritDoc PdfApplicationConfigurationProvider.unsubscribe  */
  unsubscribe(callback: (configuration: PdfApplicationConfiguration) => void) {
    const index = this.callbacks.findIndex((_callback) => {
      return _callback === callback;
    });
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
  }

  /** @inheritDoc PdfApplicationConfigurationProvider.get  */
  get(): PdfApplicationConfiguration {
    return {
      rotation: this.rotation,
      scaleFactor: this.scaleFactor,
      plugins: this.plugins,
    };
  }

  /** @inheritDoc PdfApplicationConfigurationProvider.setRotation  */
  setRotation(rotation: Rotation) {
    this.rotation = rotation;
    this.broadcast();
  }

  /** @inheritDoc PdfApplicationConfigurationProvider.setScaleFactor  */
  setScaleFactor(scaleFactor: number) {
    this.scaleFactor = scaleFactor;
    this.broadcast();
  }

  /** @inheritDoc PdfApplicationConfigurationProvider.showPlugin */
  showPlugin(pluginKey: PdfApplicatinPluginKey) {
    for (const key of ALL_PDF_APPLICATION_PLUGIN_KEYS) {
      this.plugins[key].isVisible = key === pluginKey;
    }

    this.broadcast();
  }

  /** @inheritDoc PdfApplicationConfigurationProvider.hidePlugin  */
  hidePlugin(pluginKey: PdfApplicatinPluginKey) {
    for (const key of ALL_PDF_APPLICATION_PLUGIN_KEYS) {
      if (pluginKey === key) {
        this.plugins[key].isVisible = false;
      }
    }

    this.broadcast();
  }

  /** @inheritDoc PdfApplicationConfigurationProvider.togglePlugin  */
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
 * Configuration provider that maintains configuration with variables in memory
 */
export class MemoryPdfApplicationConfigurationProvider
  extends PdfApplicationConfigurationProviderBase
  implements PdfApplicationConfigurationProvider {}

/**
 * Configuration provider that maintains configuration with variables in storage
 */
export class StoragePdfApplicationConfigurationProvider
  extends PdfApplicationConfigurationProviderBase
  implements PdfApplicationConfigurationProvider
{
  /**
   * Create an instance of StoragePdfApplicationConfigurationProvider
   * @param storage - storaged used for saving configuration
   * @param key - key for searching configuration in storage
   * @param rotation - rotation angle
   * @param scaleFactor - scaling factor
   * @param plugins - plugins configurations
   */
  constructor(
    private storage: Storage,
    private key: string,
    protected rotation = Rotation.Degree0,
    protected scaleFactor: number = 1.0,
    protected plugins: Record<
      PdfApplicatinPluginKey,
      PdfApplicatinPluginConfiguration
    > = DEFAULT_PLUGIN_CONFIGURATIONS,
  ) {
    super(rotation, scaleFactor, plugins);

    this.init();
  }

  /**
   * init provider
   *
   * @private
   */
  init() {
    try {
      const value = this.storage.getItem(this.key);
      if (value) {
        const configruation = JSON.parse(value) as PdfApplicationConfiguration;
        this.rotation = configruation.rotation;
        this.scaleFactor = configruation.scaleFactor;
        this.plugins = configruation.plugins;
      }
    } catch (e) {
      /* ignore it */
    }
  }

  /**
   * save configuration
   *
   * @private
   */
  save() {
    try {
      const configruation = this.get();
      this.storage.setItem(this.key, JSON.stringify(configruation));
    } catch (e) {
      /* ignore it */
    }
  }

  /**
   * @inheritdoc PdfApplicationConfigurationProviderBase.broadcast
   */
  broadcast(): void {
    try {
      super.broadcast();
    } finally {
      this.save();
    }
  }
}
