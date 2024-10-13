export enum LOG_OPERATION_STATUS {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DATA_FETCHED = 'DATA_FETCHED',
  DATA_FETCHED_FAILED = 'DATA_FETCHED_FAILED',
  WARNING = 'WARNING_LOG',
  DEBUG = 'DEBUG_LOG',
  HTTP = 'HTTP_LOG',
}

export const WINSTON = {
  logColors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  },
  logLevels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
};
