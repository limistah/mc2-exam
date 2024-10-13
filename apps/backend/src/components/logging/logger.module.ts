import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from './logger.service';
// import { format, level, transports } from 'src/components/logging';
import * as c from 'winston';
import { WINSTON } from 'utils/logging.constants';

@Module({
  imports: [
    WinstonModule.forRoot({
      // level: level(),
      levels: WINSTON.logLevels,
      // format,
      // transports,
      defaultMeta: { service: '#### SERVICE-NAME ####' },
      exceptionHandlers: [
        new c.transports.Console({
          format: c.format.json(),
        }),
        new c.transports.File({ filename: 'exceptions.log' }),
      ],
      rejectionHandlers: [
        new c.transports.Console({
          format: c.format.json(),
        }),
        new c.transports.File({ filename: 'rejections.log' }),
      ],
    }),

    //TODO: Implement Sentry or alternative provider and send logging details to them
  ],
  controllers: [],
  providers: [LoggerService],
})
export class LoggerModule {}
