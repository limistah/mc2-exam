import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'utils/interceptors/logger.interceptor';
import {
  LoggerService,
  winstonLogFormat,
  winstonLogLevel,
  winstonTransports,
} from './components/logging';
import { WinstonModule } from 'nest-winston';
import { WINSTON } from 'utils/logging.constants';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { getEnvFileName } from 'config/get-env';
import { validationSchema } from 'config';
import configuration from 'config/configuration';
import { MobulaModule } from './components/mobula/mobula.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5000, // Cache expiration time in milliseconds
      max: 10, // Maximum number of items in cache
    }),
    ConfigModule.forRoot({
      envFilePath: getEnvFileName(),
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    WinstonModule.forRoot({
      level: winstonLogLevel(),
      levels: WINSTON.logLevels,
      format: winstonLogFormat(),
      transports: winstonTransports(),
      defaultMeta: { service: '#### SERVICE-NAME ####' },
      exceptionHandlers: [
        new winston.transports.Console({
          format: winston.format.json(),
        }),
        new winston.transports.File({ filename: 'exceptions.log' }),
      ],
      rejectionHandlers: [
        new winston.transports.Console({
          format: winston.format.json(),
        }),
        new winston.transports.File({ filename: 'rejections.log' }),
      ],
    }),
    MobulaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    LoggerService,
  ],
})
export class AppModule {}
