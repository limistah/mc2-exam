import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MobulaClient } from './client';
import { CustomProviderTokensEnum } from 'utils/custom-provider.tokens';
import { MobulaService } from './mobula.service';
import { LoggerService } from '../logging';

@Module({
  imports: [],
  providers: [
    MobulaService,
    {
      provide: CustomProviderTokensEnum.MOBULA_CLIENT,
      useFactory: (configService: ConfigService) => {
        return new MobulaClient({
          apiKey: configService.getOrThrow<string>('services.mobula.apiKey'),
        });
      },
      inject: [ConfigService],
    },
    LoggerService,
  ],
  exports: [MobulaService],
})
export class MobulaModule {}
