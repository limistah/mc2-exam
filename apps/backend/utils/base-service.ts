import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../src/components/logging';

export abstract class BaseService {
  @Inject(CACHE_MANAGER)
  protected readonly cacheManager: Cache;

  @Inject(ConfigService)
  protected readonly configService: ConfigService;

  @Inject(LoggerService)
  protected readonly logger: LoggerService;
}
