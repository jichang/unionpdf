export interface Logger {
  debug: (source: string, category: string, ...args: any) => void;
  info: (source: string, category: string, ...args: any) => void;
  warn: (source: string, category: string, ...args: any) => void;
  error: (source: string, category: string, ...args: any) => void;
}

export class NoopLogger implements Logger {
  debug() {}
  info() {}
  warn() {}
  error() {}
}

export class ConsoleLogger implements Logger {
  debug(source: string, category: string, ...args: any) {
    console.debug(`${source}.${category}`, ...args);
  }

  info(source: string, category: string, ...args: any) {
    console.info(`${source}.${category}`, ...args);
  }

  warn(source: string, category: string, ...args: any) {
    console.warn(`${source}.${category}`, ...args);
  }

  error(source: string, category: string, ...args: any) {
    console.error(`${source}.${category}`, ...args);
  }
}

export enum LogLevel {
  Debug = 0,
  Info,
  Warn,
  Error,
}

export class LevelLogger {
  constructor(private logger: Logger, private level: LogLevel) {}

  debug(source: string, category: string, ...args: any) {
    if (this.level >= LogLevel.Debug) {
      this.logger.debug(source, category, ...args);
    }
  }

  info(source: string, category: string, ...args: any) {
    if (this.level >= LogLevel.Info) {
      this.logger.debug(source, category, ...args);
    }
  }

  warn(source: string, category: string, ...args: any) {
    if (this.level >= LogLevel.Warn) {
      this.logger.debug(source, category, ...args);
    }
  }

  error(source: string, category: string, ...args: any) {
    if (this.level >= LogLevel.Error) {
      this.logger.debug(source, category, ...args);
    }
  }
}
