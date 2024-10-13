import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston/dist/winston.constants';
import { Logger } from 'winston';
import {
  DebugLogObject,
  ErrorLogObject,
  HttpLogObject,
  InfoLogObject,
  WarnLogObject,
} from './interface/logger.interfaces';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly ApplicationLogger: Logger,
  ) {}

  info(data: InfoLogObject) {
    this.ApplicationLogger.info(data);
  }

  error(data: ErrorLogObject) {
    //Implement a counter for error logs
    this.ApplicationLogger.error(data);
  }

  warn(data: WarnLogObject) {
    this.ApplicationLogger.warn(data);
  }

  http(data: HttpLogObject) {
    this.ApplicationLogger.http(data);
  }

  logDebug(data: DebugLogObject) {
    this.ApplicationLogger.debug(data);
  }

  logEvents(data: any) {
    this.ApplicationLogger.debug(`LOGGING EVENT:::${data}`);
  }
}
