import { TransactionRepository } from "@/api/transaction/transactionRepository";
import { APP_MESSAGES } from "@/common/appMessages";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import type { Transaction } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { WalletRepository } from "../wallet/walletRepository";

export class TransactionService {
	constructor(
		private readonly transactionRepository: TransactionRepository = new TransactionRepository(),
		private readonly walletRepository: WalletRepository = new WalletRepository(),
	) {}

	// Retrieves all transactions from the database
	async findAll(params: {
		limit: number;
		page: number;
		wallet: string;
	}): Promise<ServiceResponse<Transaction[] | null>> {
		try {
			const wallet = await this._getWalletByAddressOrThrow(params);

			const transactions = await this.transactionRepository.findAllAsync({
				...params,
				wallet: wallet.id,
			});

			return ServiceResponse.success<Transaction[]>(
				"Transactions found",
				transactions,
			);
		} catch (ex) {
			const errorMessage = `Error finding all transactions: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while retrieving transactions.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	private async _getWalletByAddressOrThrow(params: {
		limit: number;
		page: number;
		wallet: string;
	}) {
		const wallet = await this.walletRepository.findByAddressAsync(
			params.wallet,
		);

		if (!wallet) {
			throw new Error(APP_MESSAGES.FAILURE.WALLET_NOT_FOUND);
		}
		return wallet;
	}
}

export const transactionService = new TransactionService();
