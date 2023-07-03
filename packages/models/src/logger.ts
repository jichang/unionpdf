/**
 * logger for logging
 */
export interface Logger {
  /**
   * Log debug message
   * @param source source of log
   * @param category category of log
   * @param args parameters of log
   * @returns
   */
  debug: (source: string, category: string, ...args: any) => void;

  /**
   * Log infor message
   * @param source source of log
   * @param category category of log
   * @param args parameters of log
   * @returns
   */
  info: (source: string, category: string, ...args: any) => void;

  /**
   * Log warning message
   * @param source source of log
   * @param category category of log
   * @param args parameters of log
   * @returns
   */
  warn: (source: string, category: string, ...args: any) => void;
  /**
   * Log error message
   * @param source source of log
   * @param category category of log
   * @param args parameters of log
   * @returns
   */
  error: (source: string, category: string, ...args: any) => void;
}

/**
 * Logger that log nothing, it will ignore all the logs
 */
export class NoopLogger implements Logger {
  debug() {}
  info() {}
  warn() {}
  error() {}
}

/**
 * Logger that use console as the output
 */
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

/**
 * Level of log
 */
export enum LogLevel {
  Debug = 0,
  Info,
  Warn,
  Error,
}

/**
 * Logger that support filtering by log level
 */
export class LevelLogger implements Logger {
  /**
   * create new LevelLogger
   * @param logger the original logger
   * @param level log level that used for filtering, all logs lower than this level will be filtered out
   */
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
