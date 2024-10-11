import { StatusCodes } from "http-status-codes";

import type { Transaction } from "@/api/transaction/transactionModel";
import { TransactionRepository } from "@/api/transaction/transactionRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class TransactionService {
	private transactionRepository: TransactionRepository;

	constructor(repository: TransactionRepository = new TransactionRepository()) {
		this.transactionRepository = repository;
	}

	// Retrieves all users from the database
	async findAll(): Promise<ServiceResponse<Transaction[] | null>> {
		try {
			const users = await this.transactionRepository.findAllAsync();
			if (!users || users.length === 0) {
				return ServiceResponse.failure(
					"No Transactions found",
					null,
					StatusCodes.NOT_FOUND,
				);
			}
			return ServiceResponse.success<Transaction[]>(
				"Transactions found",
				users,
			);
		} catch (ex) {
			const errorMessage = `Error finding all users: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while retrieving users.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}
}

export const transactionService = new TransactionService();
