import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { Transaction } from "@/api/transaction/transactionModel";
import { transactions } from "@/api/transaction/transactionRepository";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("Transaction API Endpoints", () => {
	describe("GET /transaction", () => {
		it("should return a list of transactions", async () => {
			// Act
			const response = await request(app).get("/transactions?wallet=xxxx");
			const responseBody: ServiceResponse<Transaction[]> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("Transactions found");
			expect(responseBody.responseObject.length).toEqual(transactions.length);
			responseBody.responseObject.forEach((user, index) =>
				compareTransactions(transactions[index] as Transaction, user),
			);
		});
	});

	// describe("GET /users/:id", () => {
	//   it("should return a user for a valid ID", async () => {
	//     // Arrange
	//     const testId = 1;
	//     const expectedTransaction = transactions.find((user) => user.id === testId) as Transaction;

	//     // Act
	//     const response = await request(app).get(`/users/${testId}`);
	//     const responseBody: ServiceResponse<Transaction> = response.body;

	//     // Assert
	//     expect(response.statusCode).toEqual(StatusCodes.OK);
	//     expect(responseBody.success).toBeTruthy();
	//     expect(responseBody.message).toContain("Transaction found");
	//     if (!expectedTransaction) throw new Error("Invalid test data: expectedTransaction is undefined");
	//     compareTransactions(expectedTransaction, responseBody.responseObject);
	//   });

	//   it("should return a not found error for non-existent ID", async () => {
	//     // Arrange
	//     const testId = Number.MAX_SAFE_INTEGER;

	//     // Act
	//     const response = await request(app).get(`/users/${testId}`);
	//     const responseBody: ServiceResponse = response.body;

	//     // Assert
	//     expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
	//     expect(responseBody.success).toBeFalsy();
	//     expect(responseBody.message).toContain("Transaction not found");
	//     expect(responseBody.responseObject).toBeNull();
	//   });

	//   it("should return a bad request for invalid ID format", async () => {
	//     // Act
	//     const invalidInput = "abc";
	//     const response = await request(app).get(`/users/${invalidInput}`);
	//     const responseBody: ServiceResponse = response.body;

	//     // Assert
	//     expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
	//     expect(responseBody.success).toBeFalsy();
	//     expect(responseBody.message).toContain("Invalid input");
	//     expect(responseBody.responseObject).toBeNull();
	//   });
	// });
});

function compareTransactions(
	mockTransaction: Transaction,
	responseTransaction: Transaction,
) {
	if (!mockTransaction || !responseTransaction) {
		throw new Error(
			"Invalid test data: mockTransaction or responseTransaction is undefined",
		);
	}

	expect(responseTransaction.id).toEqual(mockTransaction.id);
	expect(responseTransaction.name).toEqual(mockTransaction.name);
	expect(responseTransaction.email).toEqual(mockTransaction.email);
	expect(responseTransaction.age).toEqual(mockTransaction.age);
	expect(new Date(responseTransaction.createdAt)).toEqual(
		mockTransaction.createdAt,
	);
	expect(new Date(responseTransaction.updatedAt)).toEqual(
		mockTransaction.updatedAt,
	);
}
