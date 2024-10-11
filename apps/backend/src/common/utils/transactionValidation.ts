import { z } from "zod";

export const transactionValidations = {
	walletAddress: z.string(),
};
