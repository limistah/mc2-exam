import { transactionService } from "@/api/transaction/transactionService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";

class TransactionController {
	public getTransactions: RequestHandler = async (
		_req: Request,
		res: Response,
	) => {
		const { page = 1, limit = 10, wallet = "" } = _req.query;
		const serviceResponse = await transactionService.findAll({
			page: Number(page),
			limit: Number(limit),
			wallet: String(wallet),
		});
		return handleServiceResponse(serviceResponse, res);
	};
}

export const transactionController = new TransactionController();
