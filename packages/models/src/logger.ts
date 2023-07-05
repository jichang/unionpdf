/**
 * logger for logging
 *
 * @public
 */
export interface Logger {
  /**
   * Log debug message
   * @param source - source of log
   * @param category - category of log
   * @param args - parameters of log
   * @returns
   *
   * @public
   */
  debug: (source: string, category: string, ...args: any) => void;

  /**
   * Log infor message
   * @param source - source of log
   * @param category - category of log
   * @param args - parameters of log
   * @returns
   *
   * @public
   */
  info: (source: string, category: string, ...args: any) => void;

  /**
   * Log warning message
   * @param source - source of log
   * @param category - category of log
   * @param args - parameters of log
   * @returns
   *
   * @public
   */
  warn: (source: string, category: string, ...args: any) => void;
  /**
   * Log error message
   * @param source - source of log
   * @param category - category of log
   * @param args - parameters of log
   * @returns
   *
   * @public
   */
  error: (source: string, category: string, ...args: any) => void;
}

/**
 * Logger that log nothing, it will ignore all the logs
 *
 * @public
 */
export class NoopLogger implements Logger {
  /** {@inheritDoc Logger.debug} */
  debug() {}
  /** {@inheritDoc Logger.info} */
  info() {}
  /** {@inheritDoc Logger.warn} */
  warn() {}
  /** {@inheritDoc Logger.error} */
  error() {}
}

/**
 * Logger that use console as the output
 *
 * @public
 */
export class ConsoleLogger implements Logger {
  /** {@inheritDoc Logger.debug} */
  debug(source: string, category: string, ...args: any) {
    console.debug(`${source}.${category}`, ...args);
  }

  /** {@inheritDoc Logger.info} */
  info(source: string, category: string, ...args: any) {
    console.info(`${source}.${category}`, ...args);
  }

  /** {@inheritDoc Logger.warn} */
  warn(source: string, category: string, ...args: any) {
    console.warn(`${source}.${category}`, ...args);
  }

  /** {@inheritDoc Logger.error} */
  error(source: string, category: string, ...args: any) {
    console.error(`${source}.${category}`, ...args);
  }
}

/**
 * Level of log
 *
 * @public
 */
export enum LogLevel {
  Debug = 0,
  Info,
  Warn,
  Error,
}

/**
 * Logger that support filtering by log level
 *
 * @public
 */
export class LevelLogger implements Logger {
  /**
   * create new LevelLogger
   * @param logger - the original logger
   * @param level - log level that used for filtering, all logs lower than this level will be filtered out
   */
  constructor(private logger: Logger, private level: LogLevel) {}

  /** {@inheritDoc Logger.debug} */
  debug(source: string, category: string, ...args: any) {
    if (this.level >= LogLevel.Debug) {
      this.logger.debug(source, category, ...args);
    }
  }

  /** {@inheritDoc Logger.info} */
  info(source: string, category: string, ...args: any) {
    if (this.level >= LogLevel.Info) {
      this.logger.debug(source, category, ...args);
    }
  }

  /** {@inheritDoc Logger.warn} */
  warn(source: string, category: string, ...args: any) {
    if (this.level >= LogLevel.Warn) {
      this.logger.debug(source, category, ...args);
    }
  }

  /** {@inheritDoc Logger.error} */
  error(source: string, category: string, ...args: any) {
    if (this.level >= LogLevel.Error) {
      this.logger.debug(source, category, ...args);
    }
  }
}
