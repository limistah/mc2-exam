import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';
import { MobulaURLS } from './constants';

@Injectable()
export class MobulaClient {
  private httpClient: Axios;
  constructor(config: { apiKey: string }) {
    this.httpClient = new Axios({ headers: this.getHeaders(config.apiKey) });
  }

  private getHeaders(apiKey: string) {
    return {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    };
  }

  public async getTransactions(
    walletAddress: string,
    limit: number,
    page: number,
  ) {
    try {
      const url = `${
        MobulaURLS.GET_TRANSACTIONS
      }?wallet=${walletAddress}&limit=${limit}&offset=${
        page === 1 ? 0 : page * limit
      }&order=desc`;
      console.log(url);
      return this.httpClient.get(url);
    } catch (error: any) {
      console.error(error);
      throw new Error(error?.response?.data);
    }
  }
}
