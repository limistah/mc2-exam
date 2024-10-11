import type { Request, RequestHandler, Response } from "express";

import { transactionService } from "@/api/transaction/transactionService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class TransactionController {
	public getTransactions: RequestHandler = async (
		_req: Request,
		res: Response,
	) => {
		const serviceResponse = await transactionService.findAll();
		return handleServiceResponse(serviceResponse, res);
	};
}

export const transactionController = new TransactionController();
