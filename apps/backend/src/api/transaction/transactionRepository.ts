import type { Transaction } from "@/api/transaction/transactionModel";

export const transactions: Transaction[] = [
	{
		id: 1,
		name: "Alice",
		email: "alice@example.com",
		age: 42,
		createdAt: new Date(),
		updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
	},
	{
		id: 2,
		name: "Robert",
		email: "Robert@example.com",
		age: 21,
		createdAt: new Date(),
		updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
	},
];

export class TransactionRepository {
	async findAllAsync(): Promise<Transaction[]> {
		return transactions;
	}

	async findByIdAsync(id: number): Promise<Transaction | null> {
		return transactions.find((user) => user.id === id) || null;
	}
}
