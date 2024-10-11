import { Prisma, PrismaClient } from "@prisma/client";

export abstract class BaseRepository {
	protected client: PrismaClient;
	constructor() {
		this.client = new PrismaClient();
	}
}
