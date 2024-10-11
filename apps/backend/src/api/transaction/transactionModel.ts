import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { transactionValidations } from "@/common/utils/transactionValidation";

extendZodWithOpenApi(z);

export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.string().email(),
	age: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// Input Validation for 'GET transactions' endpoint
export const GetTransactionsValidationSchema = z.object({
	query: z.object({ wallet: transactionValidations.walletAddress }),
});
