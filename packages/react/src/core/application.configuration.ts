import { Rotation } from '@unionpdf/models';

export enum PdfApplicationMode {
  View,
  Edit,
}

export interface PdfApplicatinPluginConfiguration {
  isEnabled: boolean;
  isVisible: boolean;
}

export enum PdfApplicatinPluginKey {
  Attachments,
  Bookmarks,
  Downloader,
  Editor,
  Metadata,
  Pages,
  Printer,
  SearchPanel,
  Signatures,
  Thumbnails,
  Toolbar,
  Uploader,
}

export const DEFAULT_PLUGIN_CONFIGURATIONS = {
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
  [PdfApplicatinPluginKey.SearchPanel]: {
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

export interface PdfApplicationConfiguration {
  rotation: Rotation;
  scaleFactor: number;
  plugins: Record<PdfApplicatinPluginKey, PdfApplicatinPluginConfiguration>;
}

export interface PdfApplicationConfigurationProvider {
  get: () => PdfApplicationConfiguration;

  setRotation: (rotation: Rotation) => void;
  setScaleFactor: (scaleFactor: number) => void;

  showPlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  hidePlugin: (pluginKey: PdfApplicatinPluginKey) => void;
  togglePlugin: (pluginKey: PdfApplicatinPluginKey) => void;

  subscribe: (
    callback: (configuration: PdfApplicationConfiguration) => void
  ) => void;
  unsubscribe: (
    callback: (configuration: PdfApplicationConfiguration) => void
  ) => void;
}

export class PdfApplicationConfigurationProviderBase {
  callbacks: Array<(configuratin: PdfApplicationConfiguration) => void> = [];

  constructor(
    protected rotation = Rotation.Degree0,
    protected scaleFactor: number = 1.0,
    protected plugins: Record<
      PdfApplicatinPluginKey,
      PdfApplicatinPluginConfiguration
    > = DEFAULT_PLUGIN_CONFIGURATIONS
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
    const index = this.callbacks.findIndex((_callback) => {
      return _callback === callback;
    });
    if (index === -1) {
      this.callbacks.push(callback);
    }
  }

  unsubscribe(callback: (configuration: PdfApplicationConfiguration) => void) {
    const index = this.callbacks.findIndex((_callback) => {
      return _callback === callback;
    });
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
  }
}

export class MemoryPdfApplicationConfigurationProvider
  extends PdfApplicationConfigurationProviderBase
  implements PdfApplicationConfigurationProvider
{
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
    const pluginConfiguration = this.plugins[pluginKey];

    this.plugins = {
      ...this.plugins,
      [pluginKey]: {
        ...pluginConfiguration,
        isVisible: true,
      },
    };

    this.broadcast();
  }

  hidePlugin(pluginKey: PdfApplicatinPluginKey) {
    const pluginConfiguration = this.plugins[pluginKey];

    this.plugins = {
      ...this.plugins,
      [pluginKey]: {
        ...pluginConfiguration,
        isVisible: false,
      },
    };

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

export class StoragePdfApplicationConfigurationProvider
  extends PdfApplicationConfigurationProviderBase
  implements PdfApplicationConfigurationProvider
{
  constructor(
    private storage: Storage,
    private key: string,
    protected rotation = Rotation.Degree0,
    protected scaleFactor: number = 1.0,
    protected plugins: Record<
      PdfApplicatinPluginKey,
      PdfApplicatinPluginConfiguration
    > = DEFAULT_PLUGIN_CONFIGURATIONS
  ) {
    super(rotation, scaleFactor, plugins);

    this.init();
  }

  init() {
    try {
      const value = this.storage.getItem(this.key);
      if (value) {
        const configruation = JSON.parse(value) as PdfApplicationConfiguration;
        this.rotation = configruation.rotation;
        this.scaleFactor = configruation.scaleFactor;
        this.plugins = configruation.plugins;
      }
    } catch (e) {}
  }

  save() {
    try {
      const configruation = this.get();
      this.storage.setItem(this.key, JSON.stringify(configruation));
    } catch (e) {}
  }

  broadcast(): void {
    try {
      super.broadcast();
    } finally {
      this.save();
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
    const pluginConfiguration = this.plugins[pluginKey];

    this.plugins = {
      ...this.plugins,
      [pluginKey]: {
        ...pluginConfiguration,
        isVisible: true,
      },
    };

    this.broadcast();
  }

  hidePlugin(pluginKey: PdfApplicatinPluginKey) {
    const pluginConfiguration = this.plugins[pluginKey];

    this.plugins = {
      ...this.plugins,
      [pluginKey]: {
        ...pluginConfiguration,
        isVisible: false,
      },
    };

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
