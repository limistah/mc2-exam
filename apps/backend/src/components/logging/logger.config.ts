import { WINSTON } from '../../../utils/logging.constants';
import * as c from 'winston';

export const winstonLogLevel = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

export const winstonLogFormat = () =>
  c.format.combine(
    c.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    c.format.colorize({ all: true }),
    c.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  );

c.addColors(WINSTON.logColors);

export const winstonTransports = () => [
  new c.transports.Console(),
  new c.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new c.transports.File({ filename: 'logs/all.log' }),
  new c.transports.File({
    filename: 'logs/events.log',
    level: 'events',
  }),
];

export const Logger = c.createLogger({
  level: winstonLogLevel(),
  levels: WINSTON.logLevels,
  format: winstonLogFormat(),
  transports: winstonTransports(),
  defaultMeta: { service: 'Mono' },
  exceptionHandlers: [
    new c.transports.Console({
      format: c.format.simple(),
    }),
    new c.transports.File({ filename: 'exceptions.log' }),
  ],
  rejectionHandlers: [
    new c.transports.Console({
      format: c.format.simple(),
    }),
    new c.transports.File({ filename: 'rejections.log' }),
  ],
});
