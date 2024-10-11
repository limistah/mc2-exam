import { z } from "zod";

export const paginationValidations = {
	page: z.number({ coerce: true }).min(1).default(1),
	limit: z.number({ coerce: true }).min(10).default(10),
};
