import { CacheTTL, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheKey } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/transactions')
  @CacheKey('wallet-trxns')
  @CacheTTL(2 * 60000)
  getTransactions(
    @Query('wallet') walletAddress: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    return this.appService.getTransactions({
      walletAddress,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  }

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
