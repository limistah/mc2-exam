import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { MobulaService } from './components/mobula/mobula.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';

import mockData from '../test/mock-data';

const moduleMocker = new ModuleMocker(global);
const validWalletAddress = '0x9c34729f5a5fc1d499f669379f9b7ea1de1cf31e';

const getMobulaTransactions = ({
  walletAddress,
  page,
  limit,
}: {
  walletAddress: string;
  page: number;
  limit: number;
}) => {
  const start = page * limit;

  const filtered = mockData.filter(
    (v) => v.to === walletAddress || v.from === walletAddress,
  );

  return {
    pagination: { total: filtered.length, page, limit, offset: start },
    data: [...filtered].splice(start, limit),
  };
};

describe('AppController', () => {
  let appController: AppController;

  let cache = {};

  let getFromCacheFn;

  let setToCacheFn;

  const getTransactionResponse = {
    data: getMobulaTransactions({
      walletAddress: validWalletAddress,
      page: 1,
      limit: 10,
    }).data,
    total: 50,
    limit: 10,
    page: 1,
  };

  beforeEach(async () => {
    getFromCacheFn = jest.fn((key) => {
      return cache[key] || null;
    });

    setToCacheFn = jest.fn((key, val) => {
      cache[key] = val;
    });

    cache = {};

    const app: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({})],
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(CACHE_MANAGER)
      .useValue({
        get: getFromCacheFn,
        set: setToCacheFn,
      })
      .useMocker((token) => {
        if (token === MobulaService) {
          return {
            getTransactions: jest.fn(getMobulaTransactions),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Healthy"', () => {
      expect(appController.getHealth()).toBe('Healthy');
    });

    it('should return transaction records for a wallet', async () => {
      const walletAddress = validWalletAddress;
      const res = await appController.getTransactions(walletAddress, '10', '1');
      expect(res.data.length).toBe(getTransactionResponse.data.length);
      expect(res.limit).toBe(getTransactionResponse.limit);
      expect(res.page).toBe(getTransactionResponse.page);
      expect(res.total).toBe(getTransactionResponse.total);
    });

    it('should return transaction records from cache on subsequent hits for a wallet', async () => {
      const walletAddress = validWalletAddress;
      const res = await appController.getTransactions(walletAddress, '10', '1');
      expect(res.data).toMatchObject(getTransactionResponse.data);
      expect(res.limit).toBe(getTransactionResponse.limit);
      expect(res.page).toBe(getTransactionResponse.page);
      expect(res.total).toBe(getTransactionResponse.total);

      expect(setToCacheFn).toHaveBeenCalledTimes(1);
      expect(getFromCacheFn).toHaveBeenCalledTimes(1);

      await appController.getTransactions(walletAddress, '10', '1');
      expect(getFromCacheFn).toHaveBeenCalledTimes(2);
      expect(setToCacheFn).toHaveBeenCalledTimes(1);
    });

    it('should return paginated transaction records for a wallet', async () => {
      const walletAddress = validWalletAddress;
      const res = await appController.getTransactions(walletAddress, '10', '2');
      getTransactionResponse.data = getMobulaTransactions({
        page: 2,
        walletAddress: validWalletAddress,
        limit: getTransactionResponse.limit,
      }).data;
      expect(res.data).toMatchObject(getTransactionResponse.data);
    });

    it('should return empty for invalid wallet', async () => {
      const walletAddress = 'asd';
      const res = await appController.getTransactions(walletAddress, '10', '2');
      getTransactionResponse.data = getMobulaTransactions({
        walletAddress,
        page: getTransactionResponse.page,
        limit: getTransactionResponse.limit,
      }).data;
      expect(res.data).toMatchObject(getTransactionResponse.data);
    });
  });
});
