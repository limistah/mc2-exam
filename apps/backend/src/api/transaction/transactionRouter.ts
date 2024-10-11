import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
	GetTransactionsValidationSchema,
	TransactionSchema,
} from "@/api/transaction/transactionModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { transactionController } from "./transactionController";

export const transactionRegistry = new OpenAPIRegistry();
export const transactionsRouter: Router = express.Router();

transactionRegistry.register("Transaction", TransactionSchema);

transactionRegistry.registerPath({
	method: "get",
	path: "/transactions",
	tags: ["Transaction"],
	request: { query: GetTransactionsValidationSchema.shape.query },
	responses: createApiResponse(z.array(TransactionSchema), "Success"),
});

transactionsRouter.get(
	"/",
	validateRequest(GetTransactionsValidationSchema),
	transactionController.getTransactions,
);
