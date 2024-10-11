import { StatusCodes } from "http-status-codes";
import type { Mock } from "vitest";

import type { Transaction } from "@/api/transaction/transactionModel";
import { TransactionRepository } from "@/api/transaction/transactionRepository";
import { TransactionService } from "@/api/transaction/transactionService";

vi.mock("@/api/transaction/transactionRepository");

describe("transactionService", () => {
	let transactionServiceInstance: TransactionService;
	let transactionRepositoryInstance: TransactionRepository;

	const mockTransactions: Transaction[] = [
		{
			id: 1,
			name: "Alice",
			email: "alice@example.com",
			age: 42,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: 2,
			name: "Bob",
			email: "bob@example.com",
			age: 21,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	beforeEach(() => {
		transactionRepositoryInstance = new TransactionRepository();
		transactionServiceInstance = new TransactionService(
			transactionRepositoryInstance,
		);
	});

	describe("findAll", () => {
		it("return all transactions", async () => {
			// Arrange
			(transactionRepositoryInstance.findAllAsync as Mock).mockReturnValue(
				mockTransactions,
			);

			// Act
			const result = await transactionServiceInstance.findAll({ wallet: "" });

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.message).equals("Transactions found");
			expect(result.responseObject).toEqual(mockTransactions);
		});
	});
});
