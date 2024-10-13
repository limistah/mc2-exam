import { BadRequestException, Injectable } from '@nestjs/common';
import { MobulaService } from './components/mobula/mobula.service';
import { BaseService } from '../utils/base-service';

@Injectable()
export class AppService extends BaseService {
  constructor(private readonly mobulaService: MobulaService) {
    super();
  }

  private generateCacheKey(walletAddres: string, page: number, limit: number) {
    return `transactions:${walletAddres}:${page}:${limit}`;
  }
  async getTransactions(config: {
    walletAddress: string;
    limit: number;
    page: number;
  }) {
    try {
      let transactions = { data: [], pagination: { total: 0 } };
      const cacheKey = this.generateCacheKey(
        config.walletAddress,
        config.page,
        config.limit,
      );
      const fromCache = await this.cacheManager.get<string>(cacheKey);

      if (fromCache) {
        transactions = JSON.parse(fromCache);
      } else {
        transactions = await this.mobulaService.getTransactions(config);
        await this.cacheManager.set(
          cacheKey,
          JSON.stringify(transactions),
          330 * 60000,
        );
      }
      return {
        data: transactions.data,
        total: transactions.pagination.total,
        limit: config.limit,
        page: config.page,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  getHealth(): string {
    return 'Healthy';
  }
}
