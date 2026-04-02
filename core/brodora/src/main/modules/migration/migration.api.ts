import { z } from "zod";
import { InternalApiHandler } from "../../system/types/api";

export const MigrationApi = {
	isMigrated: new InternalApiHandler({
		key: "migration:isMigrated",
		inputValidator: z.void(),
		outputValidator: z.boolean(),
	}),
	isMigrationApplied: new InternalApiHandler({
		key: "migration:isMigrationApplied",
		inputValidator: z.object({
			name: z.string(),
		}),
		outputValidator: z.boolean(),
	}),
};
