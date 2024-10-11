import { BaseRepository } from "@/common/respository/baseRepository";
import type { Transaction } from "@prisma/client";

export class TransactionRepository extends BaseRepository {
	async findAllAsync(params: {
		limit: number;
		page: number;
		wallet: number;
	}): Promise<Transaction[]> {
		const { wallet, limit, page } = params;
		return this.client.transaction.findMany({
			where: { walletId: wallet },
			take: limit,
			skip: page * limit,
		});
	}
}
