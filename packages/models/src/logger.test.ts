import { LevelLogger, LogLevel, Logger } from './logger';

const LOG_SOURCE = 'TEST';
const LOG_CATEGORY = 'TEST';

describe('LevelLogger', () => {
  it('should call log function based on level', () => {
    const testLogger: Logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      perf: jest.fn(),
    };

    const levelLogger = new LevelLogger(testLogger, LogLevel.Error);

    levelLogger.debug(LOG_SOURCE, LOG_CATEGORY);

    expect(testLogger.debug).toHaveBeenCalledTimes(0);

    levelLogger.error(LOG_SOURCE, LOG_CATEGORY);

    expect(testLogger.error).toHaveBeenCalledTimes(1);
    expect(testLogger.error).toHaveBeenCalledWith(LOG_SOURCE, LOG_CATEGORY);
  });
});
