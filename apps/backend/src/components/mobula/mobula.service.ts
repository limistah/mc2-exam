import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../../utils/base-service';
import { CustomProviderTokensEnum } from '../../../utils/custom-provider.tokens';
import { MobulaClient } from './client';

@Injectable()
export class MobulaService extends BaseService {
  constructor(
    @Inject(CustomProviderTokensEnum.MOBULA_CLIENT)
    private readonly mobulaClient: MobulaClient,
  ) {
    super();
  }

  async getTransactions(params: {
    walletAddress: string;
    page: number;
    limit: number;
  }) {
    try {
      const resp = await this.mobulaClient.getTransactions(
        params.walletAddress,
        params.limit,
        params.page,
      );
      const res = JSON.parse(resp.data);
      if (res.error) {
        throw new Error(res.error);
      }
      return res;
    } catch (error) {
      this.logger.error({
        name: 'ERROR fetching from remote source',
        error,
        code: error?.response?.status || HttpStatus.BAD_REQUEST,
      });
      throw new Error(error);
    }
  }
}
