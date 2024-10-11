import { BaseRepository } from "@/common/respository/baseRepository";
import { PrismaClient, type Wallet } from "@prisma/client";

export class WalletRepository extends BaseRepository {
	async findByAddressAsync(address: string): Promise<Wallet | null> {
		return this.client.wallet.findFirst({ where: { address } });
	}
}
